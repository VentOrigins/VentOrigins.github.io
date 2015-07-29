
function displaySoundCloudPlayer() {

	console.log(localStorage.getItem('currPlaying'));
	checkSize();
	var uri = encodeURIComponent(localStorage.getItem('currPlaying'));
	$("#soundCloudPlayer").append("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + uri + "'width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
	
	var widgetIframe = document.getElementById('sc-widget'),
	widget = SC.Widget(widgetIframe);
	widget.bind(SC.Widget.Events.FINISH, function() {
			nextQueue();
	});
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
	//Hide and pause the soundcloud player if made
	$("#soundCloudPlayer").hide();

	if($('#sc-widget').length) {
		var widgetIframe = document.getElementById('sc-widget'),
		widget = SC.Widget(widgetIframe);
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

