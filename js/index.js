function homeLayoutModule() {
	this.num_visits;
	this.background_pallete = ["#90caf9",
		"#5d4037",
		"#d1c4e9",
		"#b2dfdb",
		"#00695c",
	];
	this.headline_color_pallete = ["white",
		"#e0e0e0",
		"white",
		"white",
		"#e0e0e0",
	];
	this.headline_font_weight_pallete = ["200",
		"200",
		"200",
		"200",
		"200",
	];
	this.squares_background_pallete = ["#f0f0f0",
		"#f0f0f0",
		"#f0f0f0",
		"#f0f0f0",
		"#f0f0f0",
	];

	this.paletteChooser = function(){
		var num_visits_mod_pallete_size = this.num_visits % this.background_pallete.length;
		// change the background color
		document.body.style.background = this.background_pallete[num_visits_mod_pallete_size];
		// change the headline text color and weight
		var headline_element = document.getElementById("header-text");
		headline_element.style.color = this.headline_color_pallete[num_visits_mod_pallete_size];
		headline_element.style.fontWeight = this.headline_font_weight_pallete[num_visits_mod_pallete_size];
		// change center card background color
		var center_card_element = document.getElementById("center-card");
      center_card_element.style.background = this.squares_background_pallete[num_visits_mod_pallete_size];
		// change buttons color
		var button_elements = document.getElementsByTagName("button");
		for ( var i = 0; i < button_elements.length; i++) {
				button_elements[i].style.background = this.squares_background_pallete[num_visits_mod_pallete_size];
		};
	};
}

var home_layout = new homeLayoutModule();
// get visit count
var cookie = new cookieModule();
home_layout.num_visits = parseInt(cookie.readCookie("visit_cnt")) + 1;
// apply the right palette based on number of visits
home_layout.paletteChooser();
