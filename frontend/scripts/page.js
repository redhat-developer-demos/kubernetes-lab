var endpoint = {}

$(document).ready(
// Set the target endpoint and get the existing messages after loading
// the page
function() {
  $.ajax({
    url : document.URL + 'env',
    success : function(result) {
      env = result.env;
      endpoint = 'http://' + env['GUESTBOOK_SERVICE_HOST'] + ':' + env['GUESTBOOK_SERVICE_PORT'] + '/api/messages';
      fillMessages();
    },
    error : function(request, status, error) {
      alert('Error getting the environment variables. Please check the console');
    },
  });
});

// Action on submit
function submitForm() {
  var myForm = $('#myform');
  if (myForm[0].checkValidity()) {
    // POST the form
    $.post(endpoint, myForm.serialize());
    // Clear the message
    $('#inputMessage').val('');
    // Get the hello
    getHelloworld();
    // Fill the table
    fillMessages();
  } else {
    // simulate a submit to force HTML5 validation
    $('<input type="submit">').hide().appendTo(myForm).click().remove();
  }
}

// get the hello world message
function getHelloworld() {
  $.ajax({
    url : 'http://' + env['HELLOWORLD_SERVICE_HOST'] + ':' + env['HELLOWORLD_SERVICE_PORT'] + '/api/hello/'
        + $('#inputUsername').val(),
    success : function(result) {
      $('#message').text(result);
      $('#messageBox').removeClass('hidden');
    },
    error : function(request, status, error) {
      alert('Error getting the helloworld message. Please check the console');
    },
  });
}

// get the existing messages
function fillMessages() {
  // wait at least 100ms before requesting the page
  setTimeout(function() {
    // Clear the table before feeling it again
    $('#mytable tbody').empty();
    $.ajax({
      url : endpoint,
      success : function(result) {
        for ( var i in result) {
          $('#mytable tbody').append(
              '<tr><td><b>' + result[i].username + '</b></td><td>' + result[i].message + '</td></tr>');
        }
      },
      error : function(request, status, error) {
        alert('Error getting the existing messages. Please check the console');
      },
    });
  }, 200);
}