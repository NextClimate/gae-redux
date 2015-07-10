(function($){
	setInterval(function() {
		if (window.fb_signed_in || window.gp_signed_in) {
			$('#wrapper_signin').css('display', 'none');
			$('#wrapper_signout').css('display', 'inline-block');
			if (window.fb_signed_in) {
				$('#signout').attr('title', 'Signed in via Facebook');
			} else {
				$('#signout').attr('title', 'Signed in via Google+');
			}
		} else {
			$('#wrapper_signin').css('display', 'inline-block');
			$('#wrapper_signout').css('display', 'none');
		}
	}, 1000); // (every second)
})(jQuery);
