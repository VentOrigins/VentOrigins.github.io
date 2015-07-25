function displaySoundCloudPlayer() {
	
	$("#soundCloudPlayer").append("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites' width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
}


function playSC() {
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
}

function hideSCPlayer() {
	$("#soundCloudPlayer").hide();
}