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

'''The dictionary used to spellcheck words. An instance of enchant.Dict must be created in order to use this method. Enchant must also be installed and imported.'''
d = enchant.Dict("en_US")

def isVowel(vowel):
    return vowel.lower() =='a' or vowel.lower() == 'e' or vowel.lower() == 'i' or vowel.lower() == 'o' or vowel.lower() == 'u'

'''
Generates a mispelled word based off the word passed to this function and returns it.
 
    
Returns -1 if a mispelling could not be generated for a word.
'''
def generateMisspelledWord(word):
    
    vowels = ['a','e','i','o','u']
    consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z',]
    
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
    
    doubleConsLoc = 0;
    doubleVList = []
    
    doubleCons = False
    containVowel = False
    
    '''Check for double consonants and also note the positions of vowels as we go along.'''
    for i in xrange(0,len(word)-1):
        if(word[i] == word[i+1]):
            doubleCons = True
            doubleConsLoc = i
            
        if(isVowel(word[i])):
            containVowel = True
            vList.append((i,list(vowels)))
            vList[len(vList)-1][1].remove(word[i].lower())        
        else:
            cList.append(i)
    
    '''Check the last index in the word, since we stopped at the second to last so that the double letter check did not go out of bounds.'''
    v = word[len(word)-1]
    if(isVowel(v)):
        vList.append((len(word)-1,list(vowels)))
        vList[len(vList)-1][1].remove(v.lower())

    '''Letter substitution begins'''
    if(containVowel and doubleCons):

        i = random.randrange(2)
        
        if(i==0):
            '''Vowel'''
                    
            pos = random.randrange(len(vList))
            index = vList[pos][0]
            
            newVowel = ""
            newWord = word
            
            while(True):
                
                if(len(vList[pos][1]) > 0):
                    newVowel = vList[pos][1][random.randrange(len(vList[pos][1]))]
                    newWord = str(word[:index])+str(newVowel)+str(word[index+1:])
                    
                    if(newVowel != word[index] and not d.check(newWord)):
                        return newWord
                    else:
                        vList[pos][1].remove(newVowel)
                else:
                    vList.pop(pos)
                    if(len(vList)==0):
                        return -1
                    
            '''end vowel'''
            
            
            '''Double consonant'''
        elif(i==1):
            return str(word[:doubleConsLoc])+str(word[doubleConsLoc+1:])
            
    elif containVowel:
            '''Vowel'''
                    
            pos = random.randrange(len(vList))
            index = vList[pos][0]
            
            newVowel = ""
            newWord = word
            
            while(True):
                
                if(len(vList[pos][1]) > 0):                  
                    newVowel = vList[pos][1][random.randrange(len(vList[pos][1]))]
                    newWord = str(word[:index])+str(newVowel)+str(word[index+1:])
                    
                    
                    if(newVowel != word[index] and not d.check(newWord)):
                        return newWord
                    else:
                        vList[pos][1].remove(newVowel)
                else:
                    vList.pop(pos)
                    if(len(vList)==0):
                        return -1
            '''Vowel'''
    elif doubleCons:
        return str(word[:doubleConsLoc])+str(word[doubleConsLoc+1:])
    
    
'''Open word list and read it to list'''
'''
wordFile = open("words1.txt",'r')
wList = [line.split() for line in wordFile.readlines()]

millis = int(time.time() * 1000)
for i in xrange(0,100000):
    

    print generateWord(wList[random.randrange(len(wList))][0])

print (time.time()*1000-millis)
'''

    
def generateRandomWords():
    l = list(models.Words1.objects.all().values_list("word",flat=True))
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
        word = (generateMisspelledWord(l[(len(l)/2)+i]), '0',l[(len(l)/2)+i])
        random_list.append(word)

    #Shuffle the mixed list of words some times
    for i in range(5):
        shuffle(random_list)

    #Put the list in json
    json_words = json.dumps(random_list)
    
    return json_words
    
