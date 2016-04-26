import random
import time
import enchant
from random import shuffle
import json
import models

'''
Created on Mar 21, 2016

@author: Evan Wang

This algorith uses the pyenchant spell check library.
https://pythonhosted.org/pyenchant/download.html

This is an algorithm to generate a pseudo-randomly mispelled word. 

Words are not completely random and are generated i order to appear like possible english words.
For example: the word 'cat' will not return a mispelled like 'xat'.
Rather, it will return a word such as 'cit', but not 'cot' or 'cut' because those are also correctly spelled words.

To do still:
    Implement a feature so that it will smartly replace vowels. For example: it would make more sense for the word 'calendar' to be mispelled as 'calender' instead of 'colendar
    

'''
vowels = []
consonants = []
vowelMapping = {}

vList = []
    
'''The indexes of consonants in the word'''
cList = []
    
doubleConsLoc = 0;
doubleVList = []
    
doubleCons = False
containVowel = False
doubleVowel = False

'''The dictionary used to spellcheck words. An instance of enchant.Dict must be created in order to use this method. Enchant must also be installed and imported.'''
d = enchant.Dict("en_US")

def isVowel(vowel):
    return vowel.lower() == 'a' or vowel.lower() == 'e' or vowel.lower() == 'i' or vowel.lower() == 'o' or vowel.lower() == 'u'

def scrambleSingleVowel(word):
    global vList
    
    if(len(vList)==0):
        return -1;
#     print "scramble"
    pos = random.randrange(len(vList))
    index = vList[pos][0]
        
    newVowel = ""
    newWord = word
        
    while(True):
            
        if(len(vList[pos][1]) > 0):
                
            newVowel = vList[pos][1][random.randrange(len(vList[pos][1]))]

#            print str(newWord) + " |",
            
            newWord = str(word[:index]) + str(newVowel) + str(word[index + 1:])
            
                
            if(newVowel != word[index] and not d.check(newWord)):
                return newWord
            else:
                vList[pos][1].remove(newVowel)
        else:
            vList.pop(pos)
            if(len(vList) == 0):
                return -1

def scrambleDoubleVowel(word):
    global doubleVList
    
    if(len(doubleVList) == 0):
        return -1;
#     print "double vowel scramble"
    pos = random.randrange(len(doubleVList))
    index = doubleVList[pos][0]
        
    newVowel = ""
    newWord = word
        
    while(True):
            
        if(len(doubleVList[pos][1]) > 0):
                
            newVowel = doubleVList[pos][1][random.randrange(len(doubleVList[pos][1]))]

  #          print str(newWord) + " |",
            
            newWord = str(word[:index]) + str(newVowel) + str(word[index + 2:])
            
                
            if(newVowel != word[index] and not d.check(newWord)):
                return newWord
            else:
                doubleVList[pos][1].remove(newVowel)
        else:
            doubleVList.pop(pos)
            if(len(doubleVList) == 0):
                return -1

def scrambleSingleCons(word):
#     print "single cons scramble"
    global cList
    while(True):
        pos = random.randrange(len(cList))
        index = cList[pos]
        newWord = word[:index]+word[index]+word[index:]
        if(not d.check(newWord)):
            return newWord
        else:
            cList.remove(index)
            if(len(cList)==0):
                return -1
            
def scrambleDoubleCons(word):
#     print "double cons scramble"
    global doubleConsLoc
    global doubleCons
    while(True):
        newWord = str(word[:doubleConsLoc]) + str(word[doubleConsLoc + 1:])
        if(not d.check(newWord)):
            return newWord
        else:
            return -1

'''
Generates a mispelled word based off the word passed to this function and returns it.
 
    
Returns -1 if a mispelling could not be generated for a word.
'''
def generateMisspelledWord(word):
    global vowels
    global vowelPairMapping
    global consonants
    global vList
    global cList
    global doubleConsLoc
    global doubleVList
    global doubleCons
    global containVowel
    global doubleVowel
    
    word = word.lower()
 #   print "_______________________"
    
    '''Various datastructures required for method'''
    
    '''
    scramblers is a list of all functions used to scramble a word that are applicable to that word.
    The scramblers for single consonants, double consonants, single vowels and double vowels are added to the list as we search the word.
    For example, the word 'feeling' has a vowel, a vowel pair and a consonant, so scramblers would look like: [scrambleSingleVowel, scrambleDoubleVowel, scrambleSingleCons]
    '''
    scramblers = []
    
    vowels = ['a', 'e', 'i', 'o', 'u']
    consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', ]
    vowelPairMapping = {'aa':['ah', 'a'], 'ae':['ea'], 'ai':['ay', 'ea', 'ee'], 'ao':['oa'], 'au':['ua'], 'ay':['ey', 'ai'], 'ea':['ee', 'ei'], 'ee':['eee', 'e', 'i'], 'ei':['ie'], 'eo':['oe'], 'eu':['ue'], 'ey':['ay', 'i'], 'ia':[], 'ie':['i', 'ia'], 'ii':['ee', 'i'], 'io':['oi'], 'iu':['ui'], 'iy':['i'], 'oa':['ao'], 'ou':['ow', 'ao'], 'oe':['oo', 'ow'], 'oi':['io'], 'oo':['oe', 'ue', 'ow'], 'oy':['oi'], 'ue':['oo', 'ow'], 'ua':['au'], 'ui':['iu'], 'uo':['ou'], 'uu':['oo'], 'uy':['ie']}
    
    '''
    vList is a 2d list that stores 1) the index of a vowel and 2) which vowels could possibly be placed their.
    If our word was cane, it would look something like:
    vList = [(1, ['e', 'i', 'o', 'u']),(3, ['a','i', 'o', 'u'])]
    (Notice it does not store the vowel at that position [ position 1 is a, so we don't store a in the tuple with 1], because it would be pointless to swap out one letter for the same one.
    Whenever the algorithm generates a word that is not mispelled, it will remove the vowel it just tried to add from the proper index.
    For example, if we generated 'cone', then it would remove 'o' from the 1 tuple, as 'cone' is a correctly spelled word.
    
    '''
    vList = []
    
    '''The indexes of consonants in the word'''
    cList = []
    
    '''Position of last double consonant. To be changed so it keeps track of position of all the double consonants'''
    doubleConsLoc = 0;
    
    '''Location of all double vowels'''
    doubleVList = []
    
    containCons = False
    doubleCons = False
    containVowel = False
    doubleVowel = False
    
    
    '''
    We now scan the word for vowels, consonants and any double letters as well as vowel pairs.
    These are all recorded in our datastructures for use later
    '''
 #   print word
    for i in xrange(0, len(word) - 1):
           
        #Check for vowel
        if(isVowel(word[i])):
            containVowel = True
            vList.append((i, list(vowels)))
            scramblers.append(scrambleSingleVowel)
            
            #remove the vowel that we are currently on from the list
            vList[len(vList) - 1][1].remove(word[i].lower())        
            
            #Check for vowel pair (includes double vowels)
            if(isVowel(word[i + 1])):
                doubleVowel = True
                scramblers.append(scrambleDoubleVowel)
                doubleVList.append((i, list(vowelPairMapping[str(word[i] + word[i + 1]).lower()])))
             
               
        else: #Otherwise, this is a consonant
            containCons = True
            scramblers.append(scrambleSingleCons)
            cList.append(i)
            
            #Check for double consonats
            if(word[i] == word[i + 1]):
                doubleCons = True
                scramblers.append(scrambleDoubleCons)
                doubleConsLoc = i
    
    '''Check the last index in the word, since we stopped at the second to last so that the double letter check did not go out of bounds.'''
    v = word[len(word) - 1]
    if(isVowel(v)):
        vList.append((len(word) - 1, list(vowels)))
        vList[len(vList) - 1][1].remove(v.lower())
        if(not containVowel):
            scramblers.append(scrambleSingleVowel)
            containVowel = True
    else:
        cList.append(len(word) - 1)
        if(not containCons):
            scramblers.append(scrambleSingleCons)
            containCons =True
    
    '''Letter substitution begins'''
    while(True):
        
        #If there are no scramble functions in the list, then the word has no possible misspelling so -1 is returned
        if(len(scramblers) == 0):
            return -1
        
        #Choose one of the scramble functions at random and then call it
        i = random.randrange(len(scramblers))
        newWord = scramblers[i](word)
        
        '''If the new word is -1, a misspelling could not be generated with that particular scramble function
        In this case, we take out that function from the list and try again.'''
        if(newWord != -1):
            return newWord
        del scramblers[i]
    
    
'''Open word list and read it to list'''
'''
wordFile = open("words1.txt",'r')
wList = [line.split() for line in wordFile.readlines()]

millis = int(time.time() * 1000)
for i in xrange(0,100000):
    

#     print generateMisspelledWord(wList[random.randrange(len(wList))][0])
    print generateMisspelledWord("bulldog")

print (time.time()*1000-millis)
'''

def correct(word):
	return d.check(word)


def generateRandomWords(grade):
    if(grade == 1):
	    l = list(models.Words1.objects.all().values_list("word",flat=True))
	    print(5)
	    print(grade)
    elif(grade == 2):
	    l = list(models.Words2.objects.all().values_list("word",flat=True))
	    print(2)
	    print(grade)
    elif(grade == 3):
	    l = list(models.Words3.objects.all().values_list("word",flat=True))
	    print(3)
	    print(grade)

    elif(grade == 4):
	    l = list(models.Words4.objects.all().values_list("word",flat=True))
	    print(4)
	    print(grade)
    elif(grade == 5):
	    l = list(models.Words5.objects.all().values_list("word",flat=True))
	    print(5)
	    print(grade)

    random_list = []


    #Shuffle the original list of words some times
    for i in range(5):
        shuffle(l)

    #Construct the list of words that is mixed between correct and misspelled words
    for i in range(0,len(l)/2):
        #Correct words
        word = (l[i], '1')
        random_list.append(word)
        #Misspelled words
        misspelled = generateMisspelledWord(l[(len(l)/2)+i]);
        if(misspelled != -1):
            word = (misspelled, '0',l[(len(l)/2)+i])
            random_list.append(word)

    #Shuffle the mixed list of words some times
    for i in range(5):
        shuffle(random_list)

    #Put the list in json
    json_words = json.dumps(random_list)
    
    return json_words
    
