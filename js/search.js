function search() {
	event.preventDefault();
	console.log("Hello");
	var query = $("#query-input").val();
	SC.initialize({
  client_id: 'bd791d329c430374438075140d3d3163'
	});
	// find all sounds of buskers licensed under 'creative commons share alike'
	var page_size = 50;
	SC.get('/tracks', { q: query, limit: page_size, linked_partitioning: 1}, function(tracks) {
	  console.log(tracks);
	  console.log(tracks.collection.length);
	  console.log(tracks.collection[0].title);
	  console.log(tracks.collection[0].permalink_url);
	  console.log(tracks.collection[0].user.username);
	  console.log(tracks.collection[0].user.permalink_url);
	  console.log(tracks.next_href);
	  var track_url = tracks.collection[0].permalink_url;
		SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
		  console.log(oEmbed);
		});

	});

}