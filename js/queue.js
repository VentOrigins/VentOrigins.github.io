function addToQueue(buttonClicked) {
	var href = $(buttonClicked).attr('href');
	var videoID = href.substring(31,href.length);
	$("#queues").append("<li><i class='fa fa-youtube'></i> <div class='queue-text'>" + videoID + "</div></li>")
}