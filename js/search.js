function search() {
  // keyWordsearch();

	event.preventDefault();
	console.log("Hello");
	var query = $("#query-input").val();
	SC.initialize({
  client_id: 'bd791d329c430374438075140d3d3163'
	});
	// find all sounds of buskers licensed under 'creative commons share alike'


	
	var page_size = 30;
	SC.get('/tracks', { q: query, limit: page_size, linked_partitioning: 1}, function(tracks) {
	  overlayTracks("#splash-screen");
	  displayTracksOnOverlay(tracks);
	  console.log(tracks.collection.length);
	  console.log(tracks.collection[0].title);
	  console.log(tracks.collection[0].permalink_url);
	  console.log(tracks.collection[0].user.username);
	  console.log(tracks.collection[0].user.permalink_url);
	  console.log(tracks.next_href);
	  var track_url = tracks.collection[0].permalink_url;
		SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
		  console.log(oEmbed);
		});

	});

}


function keyWordsearch(){
            console.log("asd");
            gapi.client.setApiKey('AIzaSyDJckImr2TEKtJepdGvM0rFU8vlTw-Pufw');
            gapi.client.load('youtube', 'v3', function() {
                    makeRequest();
            });
    }
    function makeRequest() {
            console.log("test2")
            var q = $('#query-input').val();
            var request = gapi.client.youtube.search.list({
                       q: q,
                    part: 'snippet'                        
            });
            request.execute(function(response) {
                    var str = JSON.stringify(response.result);
                    $('#splash-screen').html('<pre>' + str + '</pre>');
            });
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