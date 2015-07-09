/*  =============================================================================
    Functions for play button

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Adjusts the play buttong accordingly to the song clicked

    @param      object    Takes the link's object and get's the ID
    @return     none
    ========================================================================== */
function playButton(linkID) {
  //Show the play button
  document.getElementById("play-button").style.display = "inline-block";
  //Gets the URI of the row clicked
  var URI = tracks[linkID.id.substring(4, linkID.id.length)].getTrackNameURI();
  //Sets the src of the song to the URI
  document.getElementById('play-iframe').src = 'https://embed.spotify.com/?uri=' + URI;
}