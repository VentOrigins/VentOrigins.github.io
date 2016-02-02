/*  =============================================================================
    Script for the loading screen

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Called in: displayTracks.js and displayPlaylist.js
    Starts up the loading screen for the given div given by the arguments

    @param      div     The div to overlay a loading screen
    
    @return     none
    ========================================================================== */
function loadingScreen(divsLoadingScreen) {
  $(divsLoadingScreen).append("<div class='overlay'>");
  $(divsLoadingScreen).append("<div class='loadingScreen'> <i class='fa fa-spinner fa-pulse'></i> </div>");
  $(divsLoadingScreen).append("</div>");
}

/*  =============================================================================
    Called in: displayTracks.js and displayPlaylist.js
    Ends the loading screen for the given div given by the arguments

    @param      div     The div to remove the overlayn
    
    @return     none
    ========================================================================== */
function finishedLoading(divsLoadingScreen) {
  $(divsLoadingScreen + " > div[class='loadingScreen']").remove();
  $(divsLoadingScreen + " > div[class='overlay']").remove();
}