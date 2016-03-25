from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from login import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from RandomWordGenerator import generateRandomWords

def Login(request):
    next = request.GET.get('next', '/home/')
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponse('/game/')
                #return HttpResponseRedirect('/game')
            else:
                return HttpResponse("Inactive user.")
        else:
            return HttpResponse('/accounts/invalid')
            #return HttpResponseRedirect('/accounts/invalid')

    return render(request, "index/login.html", {'redirect_to': next})
    
def invalid_login(request):
    return render(request, 'invalid_login.html')

def loggedin(request):
    return render(request, 'loggedin.html', {'full_name': request.user.username})

def Logout(request):
    logout(request)
    return render(request, 'logout.html')
    
def test(request):
    l = list(models.Words1.objects.all().values_list("word",flat=True))
    #a = models.testAdd(value = "asfoasfh")
    #a.save()

    json_words = randomGenerator()
    
    return render(request, 'test.html', {'words':json_words})

'''
def randomGenerator():
    l = list(models.Words1.objects.all().values_list("word",flat=True))
    random_list = []
    
    for i in range(5):
        index = randint(0, len(l)-1)
        random_list.append(l[index])

    json_words = json.dumps(random_list)
    
    return json_words
'''

def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/accounts/success')
            
    args = {}
    
    
    args['form'] = UserCreationForm()
    
    return render(request, 'register.html', args)
    
def register_success(request):
    return render(request, 'register_success.html')


@login_required
def Home(request):
    return render(request, "index/home.html", {})

def Blog(request):
    return render(request, "index/blog.html", {})

@login_required
def game(request):
    rand_words = generateRandomWords()
    
    return render(request, 'index.html', {'value':rand_words})

def about(request):
    return render(request, 'about.html')
