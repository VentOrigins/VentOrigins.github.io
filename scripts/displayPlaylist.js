/*  =============================================================================
    When loading playlist.html

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

//When page is ready display the playlist's tracks
$(document).ready(function() {
	console.log("Document ready");
  displayPlaylistTracks();
});


/*  =============================================================================
    From: playlist.js (goToPlaylist)
    To: search.js (sort)
    Parses the tracks from local storage and sorts them, appends playlist name

    @param      none
    @return     none
    ========================================================================== */

function displayPlaylistTracks() {
	//new tracks
  tracks = [];
  //Get the track from the previous localstorage
	var arrayTracks = JSON.parse(localStorage.tracks);
	//Go through the array and get all the data of tracks and add them
	for(var i=0; i< arrayTracks.length; i++) {

		var newTrack = new Track(arrayTracks[i].trackName, arrayTracks[i].trackArtist, arrayTracks[i].trackNameURI,arrayTracks[i].trackArtistURI);
		tracks.push(newTrack);
	}
	//Sort function from search.js to display tracks
	sort(tracks);
	$("#playlist-name").append("<h1> <a href= '" + localStorage.playlistURI + "''> " + localStorage.playlistName + "</a> </h1>");
}
