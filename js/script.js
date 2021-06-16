var firebaseConfig = {
    apiKey: "AIzaSyCbYj9VraH3M1QxZFuH_x37d1-_FeJybvU",
    authDomain: "daintree-tech2.firebaseapp.com",
    projectId: "daintree-tech2",
    storageBucket: "daintree-tech2.appspot.com",
    messagingSenderId: "591139048420",
    appId: "1:591139048420:web:f7ceefb0431d8442ec55f1",
    measurementId: "G-6YMPZ03LK0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  document.getElementById('login').addEventListener('click', onLogin)
  document.getElementById('logout').addEventListener('click', onLogout)
  
  var provider = new firebase.auth.GoogleAuthProvider();
   
  function onLogin()
  {
      //console.log("logged in");
      firebase.auth().signInWithPopup(provider).then(res=>{
         var userEmail;
         userEmail= res.user.email;
         //console.log("userEmail is:" + userEmail);
         sessionStorage.setItem('userEmail', userEmail);
      });
      var path = window.location.href;
      var page = path.split("/").pop();
      if(page=="form.html")
      {
           // console.log("checking");
            document.getElementById('email').disabled=false;   //After data not fetching properly and two times storing
            document.getElementById('age').disabled=false;
            document.getElementById('gender').disabled=false;
            document.getElementById('next').disabled=false;
            document.getElementById('country').disabled=false;
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
              setTimeout(function(){
                  document.getElementById('FillForm').style.display = 'none';
              },10000);
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
              document.getElementById('login').innerHTML="logged in";
              document.getElementById('login').style.display="none";
              document.getElementById('logout').style.display="block";
             // console.log("user is already logged in");
              
          }
          else
          {
            //  console.log("no one is logged in");
              document.getElementById('login').style.display="block";
              document.getElementById('logout').style.display="none";
          }
      });
  }
  
  function onLogout()
  {
     // console.log("logged out");
      firebase.auth().signOut();
      
      var path = window.location.href;
      var page = path.split("/").pop();
      if(page=="form.html")
      {
        document.getElementById('email').disabled=true;
        document.getElementById('age').disabled=true;
        document.getElementById('gender').disabled=true;
        document.getElementById('next').disabled=true;
        document.getElementById('country').disabled=true;
       // document.getElementById('login').innerHTML="login with google";
        document.getElementById('maleTrigger').style.display="none";
        document.getElementById('femaleTrigger').style.display="none";
          location.reload();
      }
      checkAuthState();
  }
  
  
  checkAuthState();
  
  var dataRef = firebase.database().ref('userData');
  
  function checkExist(){
      dataRef.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var signInEmail;
        signInEmail = sessionStorage.getItem('userEmail');
        //signInEmail = str.substring(0,str.length);
        var childData = childSnapshot.val();
        if(childData.email==signInEmail)
        {
          document.getElementById('AlreadySubmitted').style.display = 'block';
  
          // Hide alert after 3 seconds
          setTimeout(function(){
              document.getElementById('AlreadySubmitted').style.display = 'none';
          },10000);
          //console.log('userExist');
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
                  else
                  {
                      ele[i].disabled=true;
                  }
              }
              ele = document.getElementsByName('maleFaceTone');  
              for(i = 0; i < ele.length; i++) {
                  if(ele[i].value==childData.facetone)
                  {
                      ele[i].checked=true;
                  }
                  else
                  {
                      ele[i].disabled=true;
                  }
              }
              ele = document.getElementsByName('maleBodyType');  
              
              for(i = 0; i < ele.length; i++) {
                  if(ele[i].value==childData.bodytype)
                  {
                      ele[i].checked=true;
                  }
                  else
                  {
                      ele[i].disabled=true;
                  }
              }
              
          }
          if(childData.gender=="female")
          {
              ele = document.getElementsByName('femaleFaceType');  
             
              for(i = 0; i < ele.length; i++) {
                  if(ele[i].value==childData.facetype)
                  {
                      ele[i].checked=true;
                  }
                  else
                  {
                      ele[i].disabled=true;
                  }
              }
              ele = document.getElementsByName('femaleFaceTone');  
              for(i = 0; i < ele.length; i++) {
                  if(ele[i].value==childData.facetone)
                  {
                      ele[i].checked=true;
                  }
                  else
                  {
                      ele[i].disabled=true;
                  }
              }
              ele = document.getElementsByName('femaleBodyType');  
      
              for(i = 0; i < ele.length; i++) {
                  if(ele[i].value==childData.bodytype)
                  {
                      ele[i].checked=true;
                  }
                  else
                  {
                      ele[i].disabled=true;
                  }
              }
          }
          document.getElementById('email').disabled=true;
          document.getElementById('age').disabled=true;
          document.getElementById('gender').disabled=true;
          document.getElementById('country').disabled=true;
          
      }
      else
      {
         // console.log("else");
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
          document.getElementById('email').disabled=true;
          document.getElementById('age').disabled=true;
         document.getElementById('gender').disabled=true;
          document.getElementById('country').disabled=true;
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
      signInEmail = str;
     // signInEmail = str.substring(0,str.length);
     // console.log(signInEmail);
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
              location.href="index.html";
          },3000);
  
          //location.reload();
      }
  }
  
  function reloadPage(){
      location.reload();
  }
  function checkGender(gender){
      //console.log(gender);
      if(gender=="male")
      {
        //  console.log('male working');
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

