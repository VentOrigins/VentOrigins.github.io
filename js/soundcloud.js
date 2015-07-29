
function displaySoundCloudPlayer() {

	console.log(localStorage.getItem('currPlaying'));
	checkSize();
	var uri = encodeURIComponent(localStorage.getItem('currPlaying'));
	$("#soundCloudPlayer").append("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + uri + "'width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
	$("#soundCloudPlayer").append("<form action='#''><p class='range-field'><input type='range' id='sound-cloud-volume' min='0' max='100'/></p></form>");
	
	var widgetIframe = document.getElementById('sc-widget'),
	 widget       = SC.Widget(widgetIframe);
	widget.bind(SC.Widget.Events.FINISH, function() {
			nextQueue();
   });
}


function playSC() {
	var widgetIframe = document.getElementById('sc-widget'),
 	widget       = SC.Widget(widgetIframe);
	console.log("CALLED PLAY SC");
	widget.bind(SC.Widget.Events.READY, function() {
	  // set new volume level
	  widget.setVolume(25);
	  widget.play();
	  // get the value of the current position

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
	widget = SC.Widget(widgetIframe);
	newSoundUrl = localStorage.getItem('currPlaying');
	widget.load(newSoundUrl, {
    show_artwork: false,
  });
}

function setVolume() {
	var soundCloudVolume = document.getElementById('sound-cloud-volume');
	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	widget.setVolume(20);
}

$('#sound-cloud-volume').on('input', function() {
	console.log('Volume: ' + $('#sound-cloud-volume').val());
});


