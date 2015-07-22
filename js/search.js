function search() {
	event.preventDefault();
	console.log("Hello");
	var query = $("#query-input").val();
	SC.initialize({
  client_id: 'bd791d329c430374438075140d3d3163'
	});
	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', { q: query}, function(tracks) {
	  console.log(tracks);
	});

}