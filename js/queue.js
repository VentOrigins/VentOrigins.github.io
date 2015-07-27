function addToQueue(buttonClicked, youtubeOrSoundCloud) {
	
  var videoID = $(buttonClicked).attr('id');

  // Appends the correct logo to the queue bar depending if youtube or soundclick was added
  if(youtubeOrSoundCloud == 'youtube') {
    $("#queues").append("<li><i class='fa fa-youtube'></i> <div class='queue-text'>" + videoID + "</div></li>")
  }
  else if (youtubeOrSoundCloud == 'soundcloud') {
    $("#queues").append("<li><i class='fa fa-soundcloud'></i> <div class='queue-text'>" + videoID + "</div></li>")
  }
}