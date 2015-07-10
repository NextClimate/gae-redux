$(document).ready(function() {
	if (document.getElementById('fb-js-sdk')) return;
	var js = document.createElement('script');
	js.id = 'fb-js-sdk';
	js.type = 'text/javascript';
	js.async = true;
	js.src = 'https://connect.facebook.net/en_US/sdk.js';
	document.getElementById('fb-root').appendChild(js);
});
