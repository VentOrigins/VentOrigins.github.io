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
	  console.log(tracks.length);
	  console.log(tracks.next_href);
	});

}