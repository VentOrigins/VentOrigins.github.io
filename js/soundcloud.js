/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function displaySoundCloudPlayer() {
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
		$("#ppQueue").empty();
  	$("#ppQueue").append("<button onclick='resumeQueue()'><i class='fa fa-play'></i></button>");
	});
	//Play queue when SC is played
	widget.bind(SC.Widget.Events.PLAY, function() {
		$("#ppQueue").empty();
  	$("#ppQueue").append("<button onclick='pauseQueue()'><i class='fa fa-pause'></i></button>");
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

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
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
		auto_play: true,
    show_artwork: false
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


function parseSCDuration(time) {
	var hour = '0';
	var minute = '0';
	var second = '00';
	var stringTime;
	if(time > 3600000) {
		hour = Math.floor(time/3600000).toString();
		time = time % 3600000;
	}
	if(time > 60000) {
		minute = Math.floor(time/60000).toString();
		if(parseInt(minute) <= 9 && hour != '0') {
			minute = '0' + minute;
		}
		time = time % 60000;
	}
	if(time > 1000) {
		second = Math.floor(time/1000).toString();
		if(parseInt(second) <= 9) {
			second = '0' + second;
		}
	}
	console.log("Hour" + hour);
	console.log("Minute" + minute);
	console.log("Second" + second);
	if(hour == '0') {
		stringTime = minute + ':' + second;
	}
	else if(hour != '0') {
		stringTime = hour + ':' + minute + ':' + second;
	}
	return stringTime;

}








