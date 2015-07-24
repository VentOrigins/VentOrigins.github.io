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
  $(divToOverlay).append("<div class='overlay'>" );
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
function finishedOverlaying(divToOverlay) {
  $(divToOverlay + " > div[class='overlay']").remove();
  console.log("FINISHED REMOVING OVERLAY\n\n");
}