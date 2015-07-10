window.___gcfg = {
	lang: 'en-US',
	parsetags: 'onload'
};

$(document).ready(function() {
	if (document.getElementById('gp-js-sdk')) return;
	var js = document.createElement('script');
	js.id = 'gp-js-sdk';
	js.type = 'text/javascript';
	js.async = true;
	js.src = 'https://apis.google.com/js/client:platform.js?onload=gp_init_onload';
	document.getElementById('gp_root').appendChild(js);
});
