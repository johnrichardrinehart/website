var sidebar_btn = document.getElementById("sidebar-button");
var SIDEBARWIDTH = "100%";
var SIDEBARHEIGHT = "auto";
sidebar_btn.addEventListener("click", function() {
   var sidebar = document.getElementById("sidebar");
   var post_container = document.getElementById("post-container");
   var sidebar_content = document.getElementById("sidebar-content");
   var icon = sidebar_btn.getElementsByTagName("i")[0]; // maybe won't be the 0th in the future
   var sidebar_status = sidebar_btn.textContent.replace(/\s/g,'');
   if (sidebar_content.style.display === "" && sidebar_status === "menu") {
      icon.textContent = "close";
      sidebar.style.width = SIDEBARWIDTH;
      sidebar.style.height = SIDEBARHEIGHT;
      sidebar.style.overflowY = "auto";
      //         sidebar.style.padding = "0 2rem";
      sidebar_content.style.display = "block" ; // show the sidebar content
      sidebar.style.backgroundColor = "white";
   } else if (sidebar_content.style.display === "block" && sidebar_status === "close") {
      icon.textContent = "menu";
      sidebar.style.width = sidebar_btn.offsetWidth;
      sidebar.style.height = sidebar_btn.offsetHeight;
      sidebar_content.style.display = "" ; // hide the sidebar content
      sidebar.style.overflowY = "";
      sidebar.style.backgroundColor = "transparent";
      //         sidebar.style.padding = "0";
   };
});
