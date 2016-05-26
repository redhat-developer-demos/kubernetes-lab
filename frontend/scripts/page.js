var endpoint = {}

$(document).ready(
		function() {
			$.ajax({
				url : document.URL + 'env',
				success : function(result) {
					env = result.env;
					endpoint = 'http://' + env['GUESTBOOK_SERVICE_HOST'] + ':'
							+ env['GUESTBOOK_SERVICE_PORT'] + '/api/messages';
					fillMessages();
				},
			});
		});

function submitForm() {
	var myForm = $('#myform');
	if (myForm[0].checkValidity()) {
		// POST the form
		$.post(endpoint, myForm.serialize());
		// Clear the message
		$('#inputMessage').val('');
		fillMessages();
	} else {
		// simulate a submit to force HTML5 validation
		$('<input type="submit">').hide().appendTo(myForm).click().remove();
	}
}

function fillMessages() {
	// wait at least 100ms before requesting the page
	setTimeout(function() {
		$('#mytable tbody').empty();
		$.ajax({
			url : endpoint,
			success : function(result) {
				for ( var i in result) {
					$('#mytable tbody').append(
							'<tr><td><b>' + result[i].username + '</b></td><td>'
									+ result[i].message + '</td></tr>');
				}
			},
		});
	}, 200);
}