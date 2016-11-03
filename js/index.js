(function() {
   wsm = WebStorageModule;
   pcm = paletteChooserModule;
   // see if the user has visited
   var has_visited = wsm.hasVisited();
   // if the haven't then give them a number that determine's the color scheme
   var color_number = wsm.mySessionStorage.getItem('color_number');
   if (!has_visited || !color_number) {
      var color_number = Math.floor(Math.random() * (pcm.background_pallete.length));
      wsm.mySessionStorage.setItem('color_number',color_number);
   }
   var num_visits = wsm.countVisits() + 1;
   wsm.myLocalStorage.setItem('num_visits',num_visits.toString());
   pcm.paletteChooser(color_number);
})()
