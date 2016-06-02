$(document).ready(function() {
  fillMessages();
});

// Action on submit
function submitForm(event) {
  var myForm = $('#myform');
  if (myForm[0].checkValidity()) {
    // Prevent submission
    event.preventDefault();
    // POST the form
    $.post('/api/messages', myForm.serialize(), function() {
      // Clear the message
      $('#inputMessage').val('');
      // Get the hello
      getHelloworld();
      // Fill the table
      fillMessages();
    }).fail(function(data) {
      alert('Failed to post form. Please check the logs for more details.')
      console.log(data);
    });
  } else {
    // simulate a submit to force HTML5 validation
    $('<input type="submit">').hide().appendTo(myForm).click().remove();
  }
}

// get the hello world message
function getHelloworld() {
  $.ajax({
    url : '/api/hello/' + $('#inputUsername').val(),
    success : function(result) {
      $('#message').text(result);
      $('#messageBox').removeClass('hidden');
    },
    error : function(request, status, error) {
      alert('Error getting the helloworld message. Please check the logs for more details.');
    },
  });
}

// get the existing messages
function fillMessages() {
  // wait at least 200ms before requesting the page
  setTimeout(function() {
    $.ajax({
      url : '/api/messages',
      success : function(result) {
        var messages = JSON.parse(result);
        // Clear the table before feeling it again
        $('#mytable tbody').empty();
        for ( var i in messages) {
          $('#mytable tbody').append(
              '<tr><td><b>' + messages[i].username + '</b></td><td>' + messages[i].message + '</td></tr>');
        }
      },
      error : function(request, status, error) {
        alert('Error reading the messages. Please check the logs for more details.');
      },
    });

  }, 200);
}