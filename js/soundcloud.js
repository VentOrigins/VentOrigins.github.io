
function displaySoundCloudPlayer() {

	console.log(localStorage.getItem('currPlaying'));
	checkSize();
	var uri = encodeURIComponent(localStorage.getItem('currPlaying'));
	$("#soundCloudPlayer").append("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + uri + "'width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
}


function playSC() {
	var soundCloud = true;
	var widgetIframe = document.getElementById('sc-widget'),
	 widget       = SC.Widget(widgetIframe);
	console.log("CALLED PLAY SC");
	widget.bind(SC.Widget.Events.READY, function() {

	 
	  widget.getVolume(function(volume) {
	    console.log('current volume value is ' + volume);
	  });
	  // set new volume level
	  widget.setVolume(50);
	  widget.play();
	  // get the value of the current position
  	widget.bind(SC.Widget.Events.FINISH, function() {
  		console.log("Finish SC");
			nextQueue();
    });
	    
	});
}

function hideSCPlayer() {
	//Hide and pause the soundcloud player if made
	$("#soundCloudPlayer").hide();

	if($('#sc-widget').length) {
		var widgetIframe = document.getElementById('sc-widget'),
		widget       = SC.Widget(widgetIframe);
		widget.pause();
	}
		
}

function showSCPlayer() {
	$("#soundCloudPlayer").show();
	
}

function loadSCVideo() {
	var widgetIframe = document.getElementById('sc-widget'),
	widget       = SC.Widget(widgetIframe);
	newSoundUrl = localStorage.getItem('currPlaying');
	widget.load(newSoundUrl, {
          show_artwork: false,
        });
	widget.bind(SC.Widget.Events.READY, function() {

	  // get current level of volume
	  widget.play();
	});
}




