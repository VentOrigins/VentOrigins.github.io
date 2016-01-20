/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    The playQueue calls this function when a soundcloud track is currPlaying
		Starts the displaying of SoundCloud player

    @param      none
    @return     none
    ========================================================================== */
function displaySoundCloud () {
  displaySoundCloudPlayer();
}

/*  =============================================================================
    Displays the SoundCloud player

    @param      none
    @return     none
    ========================================================================== */
function displaySoundCloudPlayer() {
	checkSize();
	// Gets the Current playing SoundCloud song and adds that song with the SoundCloud iframe
	var uri = encodeURIComponent(localStorage.getItem('currPlaying'));
	$("#soundCloudPlayer").prepend("<iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=" + uri + "'width='100%' height='200' scrolling='no' frameborder='no'></iframe>");
	$('#sound-cloud-logo-and-bar').show();

	// Bind all the events for the player
	soundcloudEventBindings();
}


/*  =============================================================================
    Starts the player as widget with the given event bindings

    @param      none
    @return     none
    ========================================================================== */
function soundcloudEventBindings() {
	// Starts the widget with specific event bindings
	var widgetIframe = document.querySelector('iframe');
	widget = SC.Widget(widgetIframe);

	// When the player is finished loading
	widget.bind(SC.Widget.Events.READY, function() {
	  widget.play();
  	widget.setVolume($('#sound-cloud-volume').val() / 100);
	});

	// Next Queue with finish
	widget.bind(SC.Widget.Events.FINISH, function() {
		hideSCPlayer();
		nextQueue();
	});

	// Pause queue when SC is paused
	widget.bind(SC.Widget.Events.PAUSE, function() {
		// Changes the pause button into a play button
		$("#ppQueue").empty();
  	$("#ppQueue").append("<button onclick='resumeQueue()'><i class='fa fa-play'></i></button>");
	});

	// Play queue when SC is played
	widget.bind(SC.Widget.Events.PLAY, function() {
		// Changes the play button into a pause button
		$("#ppQueue").empty();
  	$("#ppQueue").append("<button onclick='pauseQueue()'><i class='fa fa-pause'></i></button>");
	});

	// Displays the player and the volume
	$("#soundCloudPlayer").show();
	$("#sound-cloud-volume").show();
	widget.setVolume($('#sound-cloud-volume').val() / 100);
}

/*  =============================================================================
    Plays the track after the player finishes loading.
    Currently not called

    @param      none
    @return     none
    ========================================================================== */
function playSCAfterLoading() {
	var widgetIframe = document.querySelector('iframe');
 	widget = SC.Widget(widgetIframe);
	widget.bind(SC.Widget.Events.READY, function() {
	  widget.play();
	  widget.setVolume($('#sound-cloud-volume').val() / 100);
	});
}

/*  =============================================================================
    Removes the player, usually occurs when the soundcloud song ends or another
    song is clicked

    @param      none
    @return     none
    ========================================================================== */
function hideSCPlayer() {
	$('#sc-widget').remove();
	$('#sound-cloud-logo-and-bar').hide();
}

/*  =============================================================================
    Pauses the player's song

    @param      none
    @return     none
    ========================================================================== */
function pauseSCPlayer() {
	//Pause the SC player
	if($('#sc-widget').length) {
		var widgetIframe = document.querySelector('iframe');
		widget = SC.Widget(widgetIframe);
		widget.pause();
	}
}

/*  =============================================================================
    Plays the track, usually gets called when the user resumes the queue

    @param      none
    @return     none
    ========================================================================== */
function playSCPlayer() {
	if($('#sc-widget').length) {
		var widgetIframe = document.querySelector('iframe');
		widget = SC.Widget(widgetIframe);
		widget.play();
	}
}


/*  =============================================================================
    Loads the SoundCloud player. 
    Currently not called

    @param      none
    @return     none
    ========================================================================== */
function loadSCVideo() {
	var widgetIframe = document.querySelector('iframe');
	widget = SC.Widget(widgetIframe);
	newSoundUrl = localStorage.getItem('currPlaying');
	widget.load(newSoundUrl, {
		auto_play: true,
    show_artwork: false
  });
  widget.setVolume($('#sound-cloud-volume').val() / 100);
}

/*  =============================================================================
    Event JQuery call, whenever the input for the volume is changed, this 
    function is called, which changes the volume of the SoundCloud player

    @param      none
    @return     none
    ========================================================================== */
$('#sound-cloud-volume').on('input', function() {
	var volume = $('#sound-cloud-volume').val();
	setSCVolume(volume);
});

/*  =============================================================================
    Sets the volume for the SoundCloud Player with the given volume argument

    @param      The volume from the input bar
    @return     none
    ========================================================================== */
function setSCVolume(volume) {
	var widgetIframe = document.querySelector('iframe');
	widget = SC.Widget(widgetIframe);
	widget.setVolume(volume / 100);
}

/*  =============================================================================
    Parses the time into the correct format of Hour, Minute, and Seconds

    @param      The time given to be parsed
    @return     none
    ========================================================================== */
function parseSCDuration(time) {
	var hour = '0';
	var minute = '0';
	var second = '00';
	var stringTime;
	// Hours
	if(time > 3600000) {
		hour = Math.floor(time/3600000).toString();
		time = time % 3600000;
	}
	// Minutes
	if(time > 60000) {
		minute = Math.floor(time/60000).toString();
		if(parseInt(minute) <= 9 && hour != '0') {
			minute = '0' + minute;
		}
		time = time % 60000;
	}
	// Seconds
	if(time > 1000) {
		second = Math.floor(time/1000).toString();
		if(parseInt(second) <= 9) {
			second = '0' + second;
		}
	}
	// Finally checks if hrs exist, if there is then add the hour along too
	if(hour == '0') {
		stringTime = minute + ':' + second;
	}
	else if(hour != '0') {
		stringTime = hour + ':' + minute + ':' + second;
	}
	return stringTime;
}








