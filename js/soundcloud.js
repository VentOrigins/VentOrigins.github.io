function displaySoundCloudPlayer() {
	
	$("#soundCloudPlayer").append("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + localStorage.getItem('currPlaying') + " width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
}


function playSC() {
	var soundCloud = true;
	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	widget.play();
	widget.bind(SC.Widget.Events.READY, function() {

	  // get current level of volume
	  widget.getVolume(function(volume) {
	    console.log('current volume value is ' + volume);
	  });
	  // set new volume level
	  widget.setVolume(50);
	  // get the value of the current position
	  var newSoundUrl = localStorage.getItem('currPlaying');
	      // load new widget      
  	widget.bind(SC.Widget.Events.FINISH, function() {
			hideSCPlayer();
    });
	    
	});
}

function hideSCPlayer() {
	$("#soundCloudPlayer").hide();
}