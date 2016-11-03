paletteChooserModule = {
   background_pallete : ["#90caf9",
      "#5d4037",
      "#d1c4e9",
      "#b2dfdb",
      "#00695c",
   ],
   headline_color_pallete : ["white",
      "#e0e0e0",
      "white",
      "white",
      "#e0e0e0",
   ],
   headline_font_weight_pallete : ["200",
      "200",
      "200",
      "200",
      "200",
   ],
   squares_background_pallete : ["#f0f0f0",
      "#f0f0f0",
      "#f0f0f0",
      "#f0f0f0",
      "#f0f0f0",
   ],

   paletteChooser : function(color_number){
      // change the background color
      document.body.style.background = this.background_pallete[color_number];
      // change the headline text color and weight
      var headline_element = document.getElementById("header-text");
      headline_element.style.color = this.headline_color_pallete[color_number];
      headline_element.style.fontWeight = this.headline_font_weight_pallete[color_number];
      // change center card background color
      var center_card_element = document.getElementById("center-card");
      center_card_element.style.background = this.squares_background_pallete[color_number];
      // change buttons color
      var button_elements = document.getElementsByClassName("button");
      for ( var i = 0; i < button_elements.length; i++) {
         button_elements[i].style.background = this.squares_background_pallete[color_number];
      };
   }
}
