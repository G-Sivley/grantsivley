var i = 0;
var txt = 'Grant Sivley';
var speed = 50; // The speed/duration of the effect in milliseconds 
var identifier = 'title'

function typeWriter() {
  if (i < txt.length) {
    document.getElementById(identifier).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else if(txt == 'Grant Sivley' && txt.length == i){
      txt = 'Software Developer';
      i = 0;
      identifier = "subtitle";
      document.getElementById(identifier).style.visibility = "visible";
      typeWriter()
  }
}

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }



document.addEventListener('DOMContentLoaded', function() {
  // Fuction to do typerwriter text for my name after img load
  typeWriter()

  // Functions to check the input forms and make them incorrect if it is an error
  const name = document.getElementById('name'); 
  name.addEventListener('focusout', function() {
    if (!name.value) {
      name.style.borderColor="red";
    }
    else {
      name.style.borderColor="#99ff99";
    }
  });

  const email = document.getElementById('email');
  email.addEventListener('focusout', function() {
    const isValid = validateEmail(email.value)
    if (!isValid) {
      email.style.borderColor="red";
    }
    else {
      email.style.borderColor="#99ff99";
    }
  });

  const text_message = document.getElementById('text-message');
  text_message.addEventListener('focusout', function() {
    if (!text_message.value) {
      text_message.style.borderColor='red';
    }
    else {
      text_message.style.borderColor='#99ff99'
    }
  });

  const send_button = document.getElementById('send_message');
  var submitted = false;
  send_button.addEventListener('click', function() {
    if (submitted) {
      swal({
        title: "You have already submitted a message.",
        text: "Please do not spam me.",
        icon: "error"
      }); 
      return;
    }

    if (name.value == '' || text_message.value == '') {
      swal({
        title: "Incomplete fields",
        text: "Please make sure each field is filled out properly.",
        icon: "error"
      });
    }
    else if (!validateEmail(email.value)) {
      swal({
        title: "The email is not a valid email",
        text: "Please make sure the email is a proper email.",
        icon: "error"
      }); 
    }
    else {
      var full_message = {
        name: name.value,
        email: email.value,
        message: text_message.value
      }
      const url = window.location.origin;
      $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(full_message),
        contentType: 'application/json; charset=utf-8',
        dataType: 'jsonp',
      });
      swal({
        title: "Message sent successfully!",
        icon: "success"
      });
      submitted = true;
    }
  });
});

