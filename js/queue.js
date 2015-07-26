function addToQueue(buttonClicked) {
	var videoID = $(buttonClicked).attr('id');
	$("#queues").append("<li><i class='fa fa-youtube'></i> <div class='queue-text'>" + videoID + "</div></li>")
}