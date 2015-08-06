
function displaySoundCloudPlayer() {

	console.log("displaySoundCloudPlayer");
	console.log(localStorage.getItem('currPlaying'));
	checkSize();
	var uri = encodeURIComponent(localStorage.getItem('currPlaying'));
	$("#soundCloudPlayer").prepend("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + uri + "'width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
	$('#sound-cloud-logo-and-bar').show();

	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	//Next Queue with finish
	widget.bind(SC.Widget.Events.FINISH, function() {
		hideSCPlayer();
		nextQueue();
	});
	//Pause queue when SC is paused
	widget.bind(SC.Widget.Events.PAUSE, function() {
		console.log("WTF2")
		resumeQueue();
	});
	//Play queue when SC is played
	widget.bind(SC.Widget.Events.PLAY, function() {
		console.log("WTF")
		pauseQueue();
	});
	$("#soundCloudPlayer").show();
	$("#sound-cloud-volume").show();
	widget.setVolume($('#sound-cloud-volume').val() / 100);
}



/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function displaySoundCloud () {
  
  displaySoundCloudPlayer();
  
}



function playSC() {
	var widgetIframe = document.getElementById('sc-widget'),
 	widget       = SC.Widget(widgetIframe);
	console.log("CALLED PLAY SC");
	widget.bind(SC.Widget.Events.READY, function() {
		console.log("WTF3")
	  widget.pause();
	  widget.setVolume($('#sound-cloud-volume').val() / 100);
	});
}

function hideSCPlayer() {
	//Hide the soundcloud player if made
	$('#sc-widget').remove();
	$('#sound-cloud-logo-and-bar').hide();
}

function pauseSCPlayer() {
	//Pause the SC player
	console.log('pauseSCPlayer')
	if($('#sc-widget').length) {
		var widgetIframe = document.getElementById('sc-widget'),
		widget = SC.Widget(widgetIframe);
		widget.pause();
	}

}

function playSCPlayer() {
	//Stop the SC player
	console.log('playSCPlayer');
	if($('#sc-widget').length) {
		var widgetIframe = document.getElementById('sc-widget'),
		widget = SC.Widget(widgetIframe);
		widget.play();
	}
}


function loadSCVideo() {
	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	newSoundUrl = localStorage.getItem('currPlaying');
	widget.load(newSoundUrl, {
    show_artwork: false,
  });
  widget.setVolume($('#sound-cloud-volume').val() / 100);
}

$('#sound-cloud-volume').on('input', function() {
	var volume = $('#sound-cloud-volume').val();
	console.log('Volume: ' + volume);
	setSCVolume(volume);
});

function setSCVolume(volume) {
	var five = 5;
	console.log('In setSCVolume: ' + (volume / 100) + ' ' + five);
	var soundCloudVolume = document.getElementById('sound-cloud-volume');
	
	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	widget.setVolume(volume / 100);
}

