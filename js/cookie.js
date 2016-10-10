function cookieModule() {
	this.createCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};

	this.readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};

	this.eraseCookie = function(name) {
		createCookie(name,"",-1);
	};
}

// main()
(function() {
var cookie = new cookieModule();
if ( cookie.readCookie("visit_cnt") === null ){
cookie.createCookie("visit_cnt",0,7);
}
else {
// record new visit
var num_visits = parseInt(cookie.readCookie("visit_cnt")) + 1;
// let the browser know that there's been another visit
cookie.createCookie("visit_cnt",num_visits,7);
}
})();
