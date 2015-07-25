/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Called in: search.js
    Overlays the tracks with a div

    @param      div     The div to remove the overlay
    @return     none
    ========================================================================== */

function overlayTracks(divToOverlay) {
  console.log("Overlaying tracks");
  $(divToOverlay).append("<div class='overlay'> <button id='close' onclick='finishedOverlaying()'> x </button>");
  $(divToOverlay).append("  <div id='youTubeTracks'></div>");
  $(divToOverlay).append("  <div id='soundCloudTracks'></div>");
  $(divToOverlay).append("</div>");

  
}



/*  =============================================================================
    Called in: search.js
    Removes the overlay once done

    @param      div     The div to remove the overlay
    @return     none
    ========================================================================== */
// For later use for modular function
// function finishedOverlaying(divToOverlay) {
//   console.log("hello");
//   $(divToOverlay + " > div[class='overlay']").remove();
//   console.log("FINISHED REMOVING OVERLAY\n\n");
// }

function finishedOverlaying() {
  $("#splash-screen > div[class='overlay']").remove();
  $("#query-form").hide();
  $("#title").hide();
  var top_title = "<div id='top-title'> Vent DJ </div>";
  var top_search_form = "<div id='top-search-form'> <form> <input id='top-search-box' type='search'> </form>";
  var top_search_button = "<button id='top-search-button'><i class='fa fa-search'></i></button></div>";
  $("#top-nav").append(top_title + top_search_form + top_search_button);
  displaySoundCloudPlayer();
  // displayYouTubePlayer();
  checkSize();

  console.log("FINISHED REMOVING OVERLAY\n\n");

}