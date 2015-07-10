// this is called automatically after the SDK is initialized
window.fbAsyncInit = function() {
	FB.init({version: 'v2.3',
		appId: $('#fb_signin').data('appId'),
		status: true, // monitor the visitor's session-state
		cookie: true, // enable cookies
		xfbml: true, // enable XFBML & social plugins
		oauth: true, // enable OAuth support
		channelUrl: '//' + window.location.host + '/fbChannel'
	});

	FB.getLoginStatus(function(response) {
		fb_session_state(response);
	});
	
	FB.Event.subscribe('auth.statusChange', fb_event_responder);
};

function fb_session_state(response) {
	if (response.status === 'connected') {
		console.log('fb_session_state(): welcome back to NextClimate!');
	} else if (response.status === 'not_authorized') {
		console.log('fb_session_state(): signed into facebook, but not NextClimate');
	} else {
		console.log('fb_session_state(): not signed into facebook even');
	}
}

function fb_event_responder(response) {
	if (response.status === 'connected') {
		fb_get_profile();
		window.fb_signed_in = Boolean(true);
	} else {
		window.fb_signed_in = Boolean(false);
	}
}

function fb_get_profile() {
	FB.api('/me',
		function(response) {
			var visitor = {};
			visitor.socialMedia_kind = 'Facebook';
			visitor.socialMedia_id = response.id;
			visitor.socialMedia_verified = response.verified;
			visitor.name = response.name;
			visitor.gender = response.gender;
			$.ajax({data: JSON.stringify(visitor),
				contentType: 'application/json',
				processData: Boolean(false),
				type: 'POST',
				url: '/saveProfile'});
			$('#first_name').html(response.first_name);
		});
}
