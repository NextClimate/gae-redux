$('#fb_signin').click(function() {
	FB.login(function(response) {
		if (response.status === 'connected') {
			console.log('FB.login(): successfully authenticated NextClimate!');
		} else {
			console.log('FB.login(): ' + response.status);
		}
	});
});

$('#signout').click(function() {
	if (window.fb_signed_in) {
		FB.logout();
	} else {
		gapi.auth.signOut();
	}
});
