/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

function overlayTracks(divToOverlay) {
  console.log("Overlaying tracks");
  $(divToOverlay).append("<div class='overlay'>" );
  $(divToOverlay).append("</div>");
}

function displayTracksOnOverlay(tracks) {

}


/*  =============================================================================
    Called in: displayTracks.js and displayPlaylist.js
    Ends the loading screen for the given div given by the arguments
    @param      div     The div to remove the overlayn
    
    @return     none
    ========================================================================== */
function finishedOverlaying(divToOverlay) {
  $(divToOverlay + " > div[class='overlay']").remove();
  console.log("FINISHED REMOVING OVERLAY\n\n");
}