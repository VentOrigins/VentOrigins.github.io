
function displaySoundCloudPlayer() {

	console.log("WTF");
	console.log(localStorage.getItem('currPlaying'));
	checkSize();
	var uri = encodeURIComponent(localStorage.getItem('currPlaying'));
	$("#soundCloudPlayer").prepend("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + uri + "'width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
	$("#soundCloudPlayer").append("<div id='sound-cloud-logo-and-bar' class='container'> <div id='volume-logo'> <i class='fa fa-volume-up'></i> </div> <div id='sound-cloud-bar-div'> <form action='#'> <p class='range-field'> <input type='range' id='sound-cloud-volume' min='0' max='100' /> </p> </form> </div> </div>");

	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	widget.bind(SC.Widget.Events.FINISH, function() {
			nextQueue();
	});
	$("#soundCloudPlayer").show();
	$("#sound-cloud-volume").show();
	widget.setVolume($('#sound-cloud-volume').val() / 100);
}

function playSC() {
	var widgetIframe = document.getElementById('sc-widget'),
 	widget       = SC.Widget(widgetIframe);
	console.log("CALLED PLAY SC");
	widget.bind(SC.Widget.Events.READY, function() {
	  widget.play();
	  widget.setVolume($('#sound-cloud-volume').val() / 100);
	});
}

function hideSCPlayer() {
	//Hide the soundcloud player if made
	$("#soundCloudPlayer").empty();
}

function pauseSCPlayer() {
	//Pause the SC player
	if($('#sc-widget').length) {
		var widgetIframe = document.getElementById('sc-widget'),
		widget = SC.Widget(widgetIframe);
		widget.pause();
	}

}

function playSCPlayer() {
	//Stop the SC player
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

