(function () {
   var navIsDisplayed = false;
   document.body.addEventListener("keydown", function(e) {
      if (e.code == 'Space') {
         e.preventDefault()
         var timeline_nav_container = document.getElementById("timeline-nav-container");
         if (navIsDisplayed) {
            while (timeline_nav_container.hasChildNodes()) {
               timeline_nav_container.removeChild(timeline_nav_container.lastChild);
            }
         }
         else {
            loadTimeLineNav()}
         }
         navIsDisplayed = !navIsDisplayed;
   })
   // Set up nav-container and timeline-nav
   function drawTimelineNav( posts_metadata) {
      var POSTTAGSCOLORS = {"random":"rgba(87,190,210,1)","games":"rgba(120,220,180,1)","design":"rgba(220,89,60,1)"};
      var viewport_width = window.innerWidth;
      var viewport_height = window.innerHeight;
      var margin = {
         top: 20,
         right: 40,
         bottom: 40,
         left: 40 };

      var timeline_nav_width = .8 * viewport_width;
      var timeline_nav_height = .145 * viewport_height;

      var x_axis_width = timeline_nav_width - margin.left - margin.right;
      var x_axis_height = timeline_nav_height - margin.top - margin.bottom;

      var dates = posts_metadata.map(function(d){return Date.parse(d.date)});

      var x = d3.scaleTime()
         .domain([Math.min(...dates),Math.max(...dates)])
         .range([0, x_axis_width])
         .nice();

      var x_axis = d3.axisBottom(x).ticks(d3.timeWeek.every(2)).tickSize(15);

      var svg = d3.select("#timeline-nav-container")
         .append("svg",":first-child")
         .attr("id","timeline-nav")
         .attr("width", timeline_nav_width)
         .attr("height", timeline_nav_height);

      // make group to contain plot
      var g = svg.append("g")
         .attr("transform","translate(" + margin.left + "," + margin.top + ")");

      // make group for x axis
      g
         .append("g")
         .attr("transform", "translate(0," + x_axis_height + ")")
         .attr("id","--x-axis")
         .call(x_axis);


      var post_links = g.selectAll("circle")
         .data(posts_metadata)
         .enter().append("a").attr("href",function(d) {return d.url});
      post_links.append("line")
         .attr("x1",function(d) {return x(Date.parse(d.date))})
         .attr("x2",function(d) {return x(Date.parse(d.date))})
         .attr("y1", "12px")
         .attr("y2", x_axis_height)
         .attr("stroke",function(d) { if (d !== undefined) { return getColorForPost(d.tags, 1)} })
         .attr("stroke-width", "4px");
      post_links.append("circle")
         .attr("r", "12px")
         .attr("cx", function(d) {return x(Date.parse(d.date))})
         .attr("cy", "12px")
         .attr("fill", function(d) { if (d !== undefined) { return getColorForPost(d.tags, 1)} })
      d3.selectAll("a")
         .on("mouseover", function(d) {
            tooltip
               .html("<h1>"+d.title+"</h1>"+d.excerpt)
               .style("left", x(Date.parse(d.date))-20)
               .style("background", getColorForPost(d.tags, 1) )
               .style("opacity",1)
         })
         .on("mouseout", function(d) {
            tooltip
               .style("opacity",0)
               .html("");
         })

      // insert tooltip
      var tooltip = d3.select("#timeline-nav-container").insert("div",":first-child")
         .attr("class", "tooltip")

      function getColorForPost(tags, opacity) {
         var tag_which_has_color;
         if (tags !== undefined) {
            tag_which_has_color = tags.find( function(el, idx, arr) { return POSTTAGSCOLORS[el]; })
         }
         return (tag_which_has_color === undefined) ? "rgba(140,140,140,1)" : POSTTAGSCOLORS[tag_which_has_color].replace(/[\d\.](?=\)$)/g, opacity.toString());
      }
   }

   function loadTimeLineNav() {
      d3.json("/assets/posts_metadata.json", function(error, data){
         if (error) return console.warn(error);
         drawTimelineNav(data)
      });
   }
}());
