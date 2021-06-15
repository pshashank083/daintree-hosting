var firebaseConfig = {
    apiKey: "AIzaSyCOu_vpgfdUdjBmMhKaET0iFAWoTC5QwaA",
    authDomain: "daintree-a3c22.firebaseapp.com",
    projectId: "daintree-a3c22",
    storageBucket: "daintree-a3c22.appspot.com",
    messagingSenderId: "321137707228",
    appId: "1:321137707228:web:87e9aae8e97786300d4c19",
    measurementId: "G-1QEWKFDTLY"
  };

firebase.initializeApp(firebaseConfig);

document.getElementById('login').addEventListener('click', onLogin)
document.getElementById('logout').addEventListener('click', onLogout)

var provider = new firebase.auth.GoogleAuthProvider();
 
function onLogin()
{
    console.log("logged in");
    firebase.auth().signInWithPopup(provider).then(res=>{
       var userEmail;
       userEmail= res.user.email;
       console.log("userEmail is:" + userEmail);
       sessionStorage.setItem('userEmail', userEmail);
    });
    var path = window.location.href;
    var page = path.split("/").pop();
    if(page!="index.html")
    {
        checkExist();
    }
    
}

function showField(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
           checkExist()
        }
        else
        {
            document.getElementById('FillForm').style.display = 'block';

            // Hide alert after 3 seconds
            setTimeout(function(){
                document.getElementById('FillForm').style.display = 'none';
            },3000);
            document.getElementById('email').disabled=true;
            document.getElementById('age').disabled=true;
            document.getElementById('gender').disabled=true;
            document.getElementById('next').disabled=true;
            document.getElementById('country').disabled=true;
            
        }
    });
}

function checkAuthState()
{
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            document.getElementById('login').style.display="none";
            document.getElementById('logout').style.display="block";
            console.log("user is already logged in");
            
        }
        else
        {
            console.log("no one is logged in");
            document.getElementById('login').style.display="block";
            document.getElementById('logout').style.display="none";
        }
    });
}

function onLogout()
{
    console.log("logged out");
    firebase.auth().signOut();
    document.getElementById('email').disabled=true;
    document.getElementById('age').disabled=true;
    document.getElementById('gender').disabled=true;
    document.getElementById('next').disabled=true;
    document.getElementById('country').disabled=true;
    // document.getElementById('login').innerHTML="login with google";
    document.getElementById('maleTrigger').style.display="none";
    document.getElementById('femaleTrigger').style.display="none";
    checkAuthState();
}


checkAuthState();

var dataRef = firebase.database().ref('userData');

function checkExist(){
    dataRef.once("value")
    .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var str, signInEmail;
      str = sessionStorage.getItem('userEmail');
      signInEmail = str.substring(0,str.length);
      var childData = childSnapshot.val();
      if(childData.email==signInEmail)
      {
        document.getElementById('AlreadySubmitted').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function(){
            document.getElementById('AlreadySubmitted').style.display = 'none';
        },10000);
        console.log('userExist');
        document.getElementById('email').value=signInEmail;
        document.getElementById('age').value=childData.age;
        document.getElementById('gender').value=childData.gender;
        document.getElementById('country').value=childData.country;
        document.getElementById('next').style.display="none";
        if(childData.gender=="male")
        {
            document.getElementById('maleTrigger').style.display="block";
        }
        else
        {
            document.getElementById('femaleTrigger').style.display="block";
        }
        if(childData.gender=="male")
        {
            ele = document.getElementsByName('maleFaceType');  
           
            for(i = 0; i < ele.length; i++) {
                if(ele[i].value==childData.facetype)
                {
                    ele[i].checked=true;
                }
            }
            ele = document.getElementsByName('maleFaceTone');  
            for(i = 0; i < ele.length; i++) {
                if(ele[i].value==childData.facetone)
                {
                    ele[i].checked=true;
                }
            }
            ele = document.getElementsByName('maleBodyType');  
            
            for(i = 0; i < ele.length; i++) {
                if(ele[i].value==childData.bodytype)
                {
                    ele[i].checked=true;
                }
            }
            
        }
        else
        {
            ele = document.getElementsByName('femaleFaceType');  
           
            for(i = 0; i < ele.length; i++) {
                if(ele[i].value==childData.facetype)
                {
                    ele[i].checked=true;
                }
            }
            ele = document.getElementsByName('femaleFaceTone');  
            for(i = 0; i < ele.length; i++) {
                if(ele[i].value==childData.facetone)
                {
                    ele[i].checked=true;
                }
            }
            ele = document.getElementsByName('femaleBodyType');  
    
            for(i = 0; i < ele.length; i++) {
                if(ele[i].value==childData.bodytype)
                {
                    ele[i].checked=true;
                }
            }
        }
        document.getElementById('email').disabled=true;
        document.getElementById('age').disabled=true;
        document.getElementById('gender').disabled=true;
        document.getElementById('next').disabled=true;
        document.getElementById('country').disabled=true;
        
    }
    else
    {
        document.getElementById('email').disabled=false;
        document.getElementById('age').disabled=false;
        document.getElementById('gender').disabled=false;
        document.getElementById('next').disabled=false;
        document.getElementById('country').disabled=false;
    }
      
  });
});
}

function nextPage(){
    var email, gender, country, age; 
    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    country = document.getElementById('country').value;
    if(email=="" || age=="" || gender=="" || country=="")
    {
        alert('kindly fill all details');
    }
    else
    {
        document.getElementById('next').style.display="none";
        checkGender(gender);
        document.getElementById('submit').style.display="inline";
        document.getElementById('cancel').style.display="inline";
    }
    
}


function submitData(){
    var email, gender, country, age; 
    email= document.getElementById("email").value;
    var str, signInEmail;
    str = sessionStorage.getItem('userEmail');
    signInEmail = str.substring(0,str.length);
    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    country = document.getElementById('country').value;
    var facetype, facetone, bodytype;
    if(gender=="male")
    {
        ele = document.getElementsByName('maleFaceType');  
       
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            {
                facetype=ele[i].value;
            }
        }
        ele = document.getElementsByName('maleFaceTone');  
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            {
                facetone=ele[i].value;
            }
        }
        ele = document.getElementsByName('maleBodyType');  
        
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            {
                bodytype=ele[i].value;
            }
        }
        
    }
    else
    {
        ele = document.getElementsByName('femaleFaceType');  
       
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            {
                facetype=ele[i].value;
            }
        }
        ele = document.getElementsByName('femaleFaceTone');  
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            {
                facetone=ele[i].value;
            }
        }
        ele = document.getElementsByName('femaleBodyType');  

        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            {
                bodytype=ele[i].value;
            }
        }
    }
    if(facetype==null || facetone==null || bodytype==null)
    {
        alert("kindly fill all details");
    }
    else
    {
        saveData(signInEmail, age, gender, country, bodytype, facetype, facetone);
        document.getElementById('successfullySubmitted').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function(){
            document.getElementById('successfullySubmitted').style.display = 'none';
        },10000);

        location.reload();
    }
}

function reloadPage(){
    location.reload();
}
function checkGender(gender){
    console.log(gender);
    if(gender=="male")
    {
        console.log('male working');
        document.getElementById('maleTrigger').style.display="block";
    }
    else
    {
        document.getElementById('femaleTrigger').style.display="block";
    }
}

function indexPage(){
    location.href="index.html";
}


function saveData(email, age, gender, country, bodytype, facetype, facetone)
{
    console.log(email);
    console.log(age);
    console.log(gender);
    console.log(country);
    console.log(facetype);
    console.log(facetone);
    console.log(bodytype);
    var newDataRef = dataRef.push();  //168 line
    newDataRef.set({
        email: email,
        age: age,
        gender: gender,
        country: country,
        bodytype: bodytype,
        facetype: facetype,
        facetone: facetone
    });
}

