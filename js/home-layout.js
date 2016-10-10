function homeLayoutModule() {
	this.num_visits;
	this.background_pallete = ["blue lighten-3",
		"brown darken-2",
		"deep-purple lighten-4",
		"teal lighten-4",
		"teal darken-3",
	];
	this.headline_color_pallete = ["white-text",
		"grey-text text-lighten-2",
		"white-text",
		"white-text",
		"grey-text text-lighten-2",
	];
	this.headline_font_weight_pallete = ["200",
		"200",
		"200",
		"200",
		"200",
	];
	this.squares_background_pallete = ["grey lighten-5",
		"grey lighten-2",
		"grey lighten-3",
		"grey lighten-4",
		"grey lighten-2",
	];
	this.paletteChooser = function(){
		var num_visits_mod_pallete_size = this.num_visits % this.background_pallete.length;
		// change the background color
		document.body.className = this.background_pallete[num_visits_mod_pallete_size];
		// change the headline text color and weight
		var headline_element = document.getElementById("headline");
		headline.className = this.headline_color_pallete[num_visits_mod_pallete_size];
		headline.style.fontWeight = this.headline_font_weight_pallete[num_visits_mod_pallete_size];
		// change center card background color
		var card_element = document.getElementById("center-card");
		button_elements = document.getElementsByClassName("btn");
		var squares_class_items = this.squares_background_pallete[num_visits_mod_pallete_size].split(" ");
		for ( var j = 0; j < squares_class_items.length; j++) {
			card_element.classList.add(squares_class_items[j]);
		}
		// change buttons color
		for ( var i = 0; i < button_elements.length; i++) {
			for ( var j = 0; j < squares_class_items.length; j++) {
				button_elements[i].classList.add(squares_class_items[j]);
			}
		};
	};

}

var home_layout = new homeLayoutModule();
// get visit count
var cookie = new cookieModule();
home_layout.num_visits = parseInt(cookie.readCookie("visit_cnt")) + 1;
// apply the right palette based on number of visits
home_layout.paletteChooser();
