// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAn9bqVPZ4Gd7cciGuHK8ijTZERTNBSbrM",
  authDomain: "contactform-treepodia.firebaseapp.com",
  databaseURL: "https://contactform-treepodia.firebaseio.com",
  projectId: "contactform-treepodia",
  storageBucket: "contactform-treepodia.appspot.com",
  messagingSenderId: "996865127380",
  appId: "1:996865127380:web:cbad85b25bf5954b039c41",
  measurementId: "G-5M2CHDTJRW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference database collection
var messagesRef = firebase.database().ref("messages");

//add another field for other industry
$("#seeAnotherField").change(function() {
  if ($(this).val() == "Other") {
    $("#otherFieldDiv").show();
    $("#otherField").attr("required", "");
    $("#otherField").attr("data-error", "This field is required.");
  } else {
    $("#otherFieldDiv").hide();
    $("#otherField").removeAttr("required");
    $("#otherField").removeAttr("data-error");
  }
});
$("#seeAnotherField").trigger("change");

//add another field for other industry
$("#seeAnotherFieldGroup").change(function() {
  if ($(this).val() == "Other") {
    $("#otherFieldGroupDiv").show();
    $("#otherField1").attr("required", "");
    $("#otherField1").attr("data-error", "This field is required.");
  } else {
    $("#otherFieldGroupDiv").hide();
    $("#otherField1").removeAttr("required");
    $("#otherField1").removeAttr("data-error");
  }
});
$("#seeAnotherFieldGroup").trigger("change");
//Listen for submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

//submit form
function submitForm(e) {
  e.preventDefault();

  //get values from form
  var firstName = getInputVal("first_name");
  var familyName = getInputVal("family_name");
  var company = getInputVal("company");
  var website = getInputVal("website");
  var industry = getInputVal("seeAnotherFieldGroup");
  var industryOther = getInputVal("otherField1");
  var email = getInputVal("email");
  var phone = getInputVal("phone");
  //save message
  saveMessage(
    firstName,
    familyName,
    company,
    website,
    industry,
    industryOther,
    email,
    phone
  );
}

//function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//send email function
function sendEmail(body) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "tomertreepodia@gmail.com",
    Password: "tomer11!TY",
    To: "ronr@treepodia.com,tal@treepodia.com,tomertreepodia@gmail.com",
    From: "tomertreepodia@gmail.com",
    Subject: "Contact",
    Body: body
  }).then(message => alert("mail sent successfully"));
}

//save message to firebase
function saveMessage(
  firstName,
  familyName,
  company,
  website,
  industry,
  industryOther,
  email,
  phone
) {
  var newMessageRef = messagesRef.push();
  firebase;
  newMessageRef.set({
    first_name: firstName,
    family_name: familyName,
    company: company,
    website: website,
    industry: industry,
    industry_other: industryOther,
    email: email,
    phone: phone
  });
  body =
    "first_name: " +
    firstName +
    "<br />" +
    " family_name: " +
    familyName +
    "<br />" +
    "company: " +
    company +
    "<br />" +
    "website: " +
    website +
    "<br />" +
    "industry: " +
    industry +
    "<br />" +
    "industry_other: " +
    industryOther +
    "<br />" +
    "email: " +
    email +
    "<br />" +
    "phone: " +
    phone +
    "<br />";
  sendEmail(body);
}
