/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

//When the Web App begins
$(document).ready(function() {
	console.log("Document ready");

  // NOTE: If I had a chance to redo this, I would adjust the sizes depending on the screen changes
  //Makes the width of the id's below to be the size of the screen minus the nav bar
  var nonNavScreenSize = $(window).width() - document.getElementById('nav').offsetWidth;
  $('#search-box').width(nonNavScreenSize);
  $('#search-box').height($(window).height());
  $('#track-list table').width(nonNavScreenSize);
  document.getElementById("search-box").style.left = document.getElementById('nav').offsetWidth + 'px';
  document.getElementById("splash-track-list").style.left = document.getElementById('nav').offsetWidth + 'px';

  // CHECK USER IS AUTHENTICATED
	var vars = window.location.href.split("&");
	if(vars.length < 2) {
	  goToAuthorize();
	}
	for (var i=0;i<vars.length;i++) {
	  var pair = vars[i].split("=");
		if(i == 0) {
			if(pair[1].indexOf("access_denied") < 0) {	
	  		accessToken = pair[1];
	      localStorage.accessToken = accessToken;
			}
			else {
				console.log("ACCESS DENIED");
				goToAuthorize();
			}
		}
		else if(i == 1) {
			bear = pair[1];
		}
		else if(i == 3) {
			state = pair[1];
		}
	}

  // CALL TO AUTHENTICATE
	$.ajax({
		url: 'https://api.spotify.com/v1/me',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
		   findUserID(response);
	  },
	  statusCode: {
	      401: function() {// CHANGE to scopes and redirect to playlist
					goToAuthorize();
	      }
	   }
	});
});



/*  ==========================================================================
    From: Spotify.js when index.html starts up
    To: playlist.js (displayPlaylist)
    Search through Spotify API for the users ID after it is found go to playlist

    @param      JSON		json format which contains details of the Spotify user
    @return     none
    ========================================================================== */
function findUserID(json){

	userID = json.id;
	localStorage.userID = userID;
  $.ajax({
		url: 'https://api.spotify.com/v1/users/' + userID + '/playlists',
		type:"GET",
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
		  displayPlaylist(response);
		},
		error: function(response) {
			console.log("Error couldn't find user");
		}
	});
}

/*  =============================================================================
		From: parse.js (getTracksFromHT)
		To: spotify.js (addTracksToPlaylist) parse.js (addPlaylistToDB) 
    Search through Spotify API for the users ID after it is found go to playlist

    @param      string
    @param      string
    @param      string

    @return     none
    ========================================================================== */
function createPlaylist(name, tracks) {

	userID = localStorage.userID;
	$.ajax({
	url: 'https://api.spotify.com/v1/users/'+ userID + '/playlists',
	xhr: function() {
        // Get new xhr object using default factory
        var xhr = jQuery.ajaxSettings.xhr();
        // Copy the browser's native setRequestHeader method
        var setRequestHeader = xhr.setRequestHeader;
        // Replace with a wrapper
        xhr.setRequestHeader = function(name, value) {
            // Ignore the X-Requested-With header
            if (name == 'X-Requested-With') return;
            // Otherwise call the native setRequestHeader method
            // Note: setRequestHeader requires its 'this' to be the xhr object,
            // which is what 'this' is here when executed.
            setRequestHeader.call(this, name, value);
        }
        // pass it on to jQuery
        return xhr;
  },
	type: "POST",
	headers: {
		'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Authorization': 'Bearer ' + accessToken
	},
	data: "{\"name\":\"" + name + "\",\"public\":true}",
    success: function (data) {
    	addTracksToPlaylist(data.id,tracks)
    	addPlaylistToDB(data,name);
    },
    error: function(error){
    	console.log(" Error in create playlist: " + error);
    }
	});
}

/*  =============================================================================
		From: Spotify.js (createPlaylist)
		To: none
    Adds tracks to the given playlist id

    @param      string		id of playlist
    @param			string 		tracksURI 
    @return     none
    ========================================================================== */
function addTracksToPlaylist(id, tracksURI) {
	var playlistID = id;
	var userID = localStorage.userID;
	var encodedTracksURI ="";
	for(var i=0; i<tracksURI.length; i++) {
		encodedTracksURI += encodeURIComponent(tracksURI[i]);
		if(i< tracksURI.length -1) {
			encodedTracksURI += ",";
		}
	}
	$.ajax({
	url: 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks?uris=' + encodedTracksURI,
	xhr: function() {
        // Get new xhr object using default factory
        var xhr = jQuery.ajaxSettings.xhr();
        // Copy the browser's native setRequestHeader method
        var setRequestHeader = xhr.setRequestHeader;
        // Replace with a wrapper
        xhr.setRequestHeader = function(name, value) {
            // Ignore the X-Requested-With header
            if (name == 'X-Requested-With') return;
            // Otherwise call the native setRequestHeader method
            // Note: setRequestHeader requires its 'this' to be the xhr object,
            // which is what 'this' is here when executed.
            setRequestHeader.call(this, name, value);
        }
        // pass it on to jQuery
        return xhr;
  },
	type: "POST",
	headers: {
		'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Authorization': 'Bearer ' + accessToken
	},
    success: function (data) {
    	window.open('spotify:user:' + localStorage.userID + ':playlist:' + id,'_self'); 
    },
    error: function(data){
    	console.log(data);
    }
	});
}
//Checks if the playlist still exists and if it does add it to to the playlist

function checkPlaylist(response, idToCheck, trackURI, htValue) {
	for(var i=0; i<response.items.length; i++) {
		if(idToCheck == response.items[i].id) {
			addTracksToPlaylist(idToCheck, [trackURI]);
			return;
		}
	}
	erasePlaylist(idToCheck, htValue);
}

/*  =============================================================================
		From: parse.js (findPlaylistID)
		To: spotify.js (checkPlaylist)
    Get the playlists of a user

    @param      string		id of the playlist to check
    @param      string		trackURI to add
    @param      string		hashtag value

    @return     none
    ========================================================================== */
function getPlaylist(idToCheck, trackURI, htValue) {

  $.ajax({
		url: 'https://api.spotify.com/v1/users/' + localStorage.userID + '/playlists',
		type:"GET",
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
		  checkPlaylist(response, idToCheck, trackURI, htValue);
		},
		error: function(response) {
			console.log("Error couldn't find user");
		}
	});
	
}

/*  =============================================================================
		From: Spotify.js (getPlaylist)
		To: parse.js (erasePlaylist, addTracksToPlaylist)
    Checks if the playlist still exists and if it does add it to to the playlist

    @param      json 		json format of all the playlists
    @param			int			id of playlist to check
    @param			string	track URI to add
    @param			string	hashtag value

    @return     none
    ========================================================================== */
function checkPlaylist(response, idToCheck, trackURI, htValue) {
	var x = true;
	for(var i=0; i<response.items.length; i++) {
		for(var j = 0; j < idToCheck.length; j++) {
			if(idToCheck[j] == response.items[i].id) {
				addTracksToPlaylist(idToCheck[j], [trackURI]);
				x = false;
			}
		}
		
	}
	//Went through everything and couldn't find any playlists
	if(x == true) {
		erasePlaylist(htValue);
	}
	
}


function findPlaylistsWithTrack(playlistsOfHT, trackName) {
	//Get the playlist name
	var playlistID = "";
	for(var i = 0; i < playlistsOfHT.length; i++) {
		playlistID = playlistsOfHT[i];
		//Ajax call to get json and then change htmlpage
		$.ajax({
			url: 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID,
			headers: {
			  'Authorization': 'Bearer ' + accessToken
			},
			dataType: 'json',
			success: function(response) {
				for(var j = 0; j < response.tracks.items.length; j++) {
					if(response.tracks.items[j].track.name.replace(/[\W_]+/g, "").toLowerCase() == trackName) {
						deleteTrackFromPlaylist(response.id, j,response.tracks.items[j].track.uri);
					}
				}

			},
			error: function(response) {
				console.log("Error couldn't find playlist");
				console.log(response);
			}
		});

	}

}

function deleteTrackFromPlaylist(playlistID, position, trackURI) {

	$.ajax({
			url: 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks',
			headers: {
			  'Authorization': 'Bearer ' + accessToken
			},
			xhr: function() {
        // Get new xhr object using default factory
        var xhr = jQuery.ajaxSettings.xhr();
        // Copy the browser's native setRequestHeader method
        var setRequestHeader = xhr.setRequestHeader;
        // Replace with a wrapper
        xhr.setRequestHeader = function(name, value) {
            // Ignore the X-Requested-With header
            if (name == 'X-Requested-With') return;
            // Otherwise call the native setRequestHeader method
            // Note: setRequestHeader requires its 'this' to be the xhr object,
            // which is what 'this' is here when executed.
            setRequestHeader.call(this, name, value);
        }
        // pass it on to jQuery
        return xhr;
  		},
			type: "DELETE",
			data: "{\"tracks\":[{\"positions\":[" + position + "],\"uri\":\""+ trackURI + "\"}]}",
			success: function(response) {
				console.log("Success");
			},
			error: function(response) {
				console.log(response);
			}
		});

}

function goToAuthorize() {
	var scopes = 'playlist-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-private';
  var my_client_id = '32434c80aa5744618b51f9a3eed3f807'
  var redirect_uri = 'http://ventorigins.github.io'
  var uri = 'https://accounts.spotify.com/authorize?' + 
  '&client_id=' + my_client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri)
  + '&response_type=token&state=444'
  window.location = uri;
}

