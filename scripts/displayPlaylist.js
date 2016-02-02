/*  =============================================================================
    When loading playlist.html

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

var userID = "";
var accessToken = "";
var arrayPlaylists = [];

//When playlist page is ready, displays the playlist's tracks
$(document).ready(function() {
	console.log("Document ready");
  //Declaring initial variables
  userID = localStorage.userID;
  accessToken = localStorage.accessToken;
  //Get the playlists from the currPlaylists from local storage
  arrayPlaylists = JSON.parse(localStorage.currPlaylists);

  // Document ready for the css
  // Sets the width appropriately
  var splashScreenSize = screen.width - document.getElementById('nav').offsetWidth;
  $("#playlist-name").width(splashScreenSize);
  $('#splash-track-list').width(splashScreenSize);
  document.getElementById("splash-track-list").style.left = document.getElementById('nav').offsetWidth + 'px';

  //Functions to do
  displayPlaylistTracks();
  displayPlaylistsInPlaylistBar();
});

/*  =============================================================================
    From: this
    To: this
    Display all the current user's playlist from local storage

    @param      none
    @return     none
    ========================================================================== */
function displayPlaylistsInPlaylistBar() {
  // Appends the head of the playlist
  $('#nav-playlist').append("<li id='nav-playlist-head'> <a href='playlist.html'>PLAYLISTS </a></li>")

  //Appends all of the user's playlists from local storage
  for(var i = 0; i < arrayPlaylists.items.length; ++i) {
    //Appends a music icon with the playlist name
    $('#nav-playlist').append("<li > <button id='playlist" + i + "' type='button' onclick='searchPlaylistTracks(this)'>" + "<i class='fa fa-music'></i>" + arrayPlaylists.items[i].name + "</button></li>");
    playlistMap[arrayPlaylists.items[i].name + i] = arrayPlaylists.items[i].id;
  }
}

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
  //Displays the splash screen of the playlists
  displayPlaylistSplashScreen();
}

function displayPlaylistSplashScreen() {
  //Gets the position of the playlist selected in the JSON for user's playlist, which is from the local storage
  var num = localStorage.playlistNum;
  
  //Appends the title of the playlist onto the main screen
  $("#playlist-name").append("<img class='image-cover' src='" + arrayPlaylists.items[num].images[0].url + "' alt='playlist-image'>");
  $("#playlist-name").append("<h1> <a href= '" + arrayPlaylists.items[num].uri + "''> " + arrayPlaylists.items[num].name + "</a> </h1>");
}




