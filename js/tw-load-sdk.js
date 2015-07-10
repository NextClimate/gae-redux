$(document).ready(function() {
	if (document.getElementById('tw-js-sdk')) return;
	var js = document.createElement('script');
	js.id = 'tw-js-sdk';
	js.type = 'text/javascript';
	js.async = true;
	js.src = 'https://platform.twitter.com/widgets.js';
	document.getElementById('tw_root').appendChild(js);
});
