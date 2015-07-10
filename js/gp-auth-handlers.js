function gp_init_onload() {
	gapi.signin.render('gp_signin'); // note: gapi.auth.signIn() is triggered automatically on-click
}

// this is called after gp_init_onload() has finished.
// as we've specified the callback function as a page-level parameter,
// it's triggered automatically when the vistor's session-state changes.
function gp_signin_callback(response) {
	if (response['status']['signed_in']) {
		gapi.client.load('plus', 'v1', gp_get_profile);
		window.gp_signed_in = Boolean(true);
	} else {
		window.gp_signed_in = Boolean(false);
		console.log('gp_session_state: ' + response['error']);
	}
}

function gp_get_profile() {
	var request = gapi.client.plus.people.get({'userId': 'me'});
	request.execute(function(response) {
		var visitor = {};
		visitor.socialMedia_kind = 'Google+';
		visitor.socialMedia_id = response.id;
		if (response.verified) {
			visitor.socialMedia_verified = response.verified;
		} else {
			visitor.socialMedia_verified = Boolean(false);
		}
		if (response.displayName) {
			visitor.name = response.displayName;
		} else {
			visitor.name = 'N/A';
		}
		if (response.gender) {
			visitor.gender = response.gender;
		} else {
			visitor.gender = 'N/A';
		}
		$.ajax({data: JSON.stringify(visitor),
			contentType: 'application/json',
			processData: Boolean(false),
			type: 'POST',
			url: '/saveProfile'});
		$('#first_name').html(response.name.givenName);
	});
}
