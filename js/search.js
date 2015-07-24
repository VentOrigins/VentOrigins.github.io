/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Searches through youtube and soundcloud to return the list of tracks
    From: OnSubmit of query-input
    To: youtubeSearch and soundCloudSearch

    @param        none
    @return       none
    ========================================================================== */
function search() {
  // Removes defaults
  event.preventDefault();
  // Puts an overlay over the splash screen to display tracks
  overlayTracks("#splash-screen");

  // Begins Youtube and SoundCloud search
  youTubeSearch();
  soundCloudSearch();
}

/*  =============================================================================
    Does the youtube search part, sets up the API key and makes the request
    From: search()
    To: youTubeMakeRequest()

    @param        none
    @return       none
    ========================================================================== */
function youTubeSearch() {
  console.log("Beginning search through Youtube");
  gapi.client.setApiKey('AIzaSyDJckImr2TEKtJepdGvM0rFU8vlTw-Pufw');
  gapi.client.load('youtube', 'v3', function() {
    youTubeMakeRequest();
  });
}
    
/*  =============================================================================
    Makes the request of the query value inputted from the query-input
    From: youTubeSearch()
    To: displayYoutubeOnOverlay()

    @param        none
    @return       none
    ========================================================================== */
function youTubeMakeRequest() {
  console.log("Making request to Google's API");
  var q = $('#query-input').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'                        
  });
  request.execute(function(videos) {
    displayYoutubeOnOverlay(videos);
  });
}

/*  =============================================================================
    Does the soundcloud search part, sets up the API key and makes the request
    From: search()
    To: soundCloudMakeRequest()

    @param        none
    @return       none
    ========================================================================== */
function soundCloudSearch() {
  console.log("Beginning search through SoundCloud");
  SC.initialize({
    client_id: 'bd791d329c430374438075140d3d3163'
  });
  soundCloudMakeRequest();
}

/*  =============================================================================
    Makes the request of the query value inputted from the query-input
    From: soundCloudSearch()
    To: displaySoundCloudOnOverlay()

    @param        none
    @return       none
    ========================================================================== */
function soundCloudMakeRequest() {
  console.log("Making request to SoundCloud's API");
  var q = $("#query-input").val();
  var page_size = 30;

  SC.get(
    '/tracks', 
    { 
      q: q,
      limit: page_size, 
      linked_partitioning: 1
    }, 
  function(tracks) {
      displaySoundCloudOnOverlay(tracks);
      console.log(tracks.collection.length);
      console.log(tracks.collection[0].title);
      console.log(tracks.collection[0].uri);
      console.log(tracks.collection[0].user.username);
      console.log(tracks.collection[0].user.permalink_url);
      console.log(tracks.next_href);
      var track_url = tracks.collection[0].permalink_url;
      SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
        console.log(oEmbed);
    });
  });
}

function displayYoutubeOnOverlay(videos) {
  var str = JSON.stringify(videos.result);
  $('#splash-screen').append('<pre>' + str + '</pre>');
}

function displaySoundCloudOnOverlay(tracks) {
  for (var i = 0)
  var str = JSON.stringify(tracks.collection);
  $('#splash-screen').append('<pre>' + str + '</pre>');
}



$(document).ready(function() {
	var soundCloud = true;
var widgetIframe = document.getElementById('sc-widget'),
 widget       = SC.Widget(widgetIframe);

widget.bind(SC.Widget.Events.READY, function() {

  // get current level of volume
  widget.getVolume(function(volume) {
    console.log('current volume value is ' + volume);
  });
  // set new volume level
  widget.setVolume(50);
  // get the value of the current position
  var newSoundUrl = 'https://api.soundcloud.com/tracks/179647213';
      // load new widget
      
      	widget.bind(SC.Widget.Events.FINISH, function() {
      		if(soundCloud == true) {
		        widget.load(newSoundUrl, {
		          show_artwork: true,
		          auto_play:true
				    });
				  }
				  else {
				  	console.log("Did this");
					  	widget.pause();
				  }
		    });
    
});
});