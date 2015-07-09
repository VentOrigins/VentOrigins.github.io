/*  =============================================================================
    Displays the track objects onto the screen

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
		GLOBAL VARIABLES

		mapKeyTracks  		-HashMap<Key, Value> with Key = Tracks, Value = HashTag 
		mapKeyHT					-HashMap<Key, Value> with Key = HashTag, Value = Tracks

		buttonID 					-Used to append the + buttons
		slideID 					-Used to append the sliding input and submit button
		rowTrackName 			-Used to append the track name with its URI to the track
		rowTrackArtists 	-Used to append the track artists with its URIs to the artists
		rowTrackHashTag 	-Used to append the hash tags onto the row

		tracksHTML 				-Keeps track the total rows checked so far when going through the HTML
		========================================================================== */
//HashMaps
var mapKeyTracks = {};
var mapKeyHT = {};

//Variables used to append the table
var buttonID;
var slideID;
var rowTrackName;
var rowTrackArtists;
var rowTrackHashTag;

//Array to store all of the .find
var tracksHTML = [];

var tracksHashTagArray = [];

//Keeps track of how many rows checked so far when going through the HTML
var rowCount;

/*  =============================================================================
	  Displays the Tracks And Artists in the html table with their corresponding
	  hashtags.

		@param  		none
		@return			none
		========================================================================== */
function displayTracks() {
	//Check if track list is made, if made, just update the values of trackName and artists and HT instead of replacing everything
	if(!$.trim($('#list-of-tracks').html()).length == 0 ) {
		//Update track list
		changeTrackList();
		//Scroll up to beginning of track
		scrollToTracks();
		return;
	}

	//Fills the tracksHTML array to have same length as the tracks array, but emptied
	for (var i = 0; i < tracks.length; ++i) {
		tracksHTML.push("");
	}

	//Resets and empties out the variables
	buttonID = "";
	slideID = "";
	rowTrackName = "";
	rowTrackArtists = "";
	rowTrackHashTag = "";
	rowCount = 1;

	//Append the header of table
	$("#list-of-tracks").append("<tr> <th>ADD</th> <th>TRACK</th> <th>ARTIST</th> <th>#</th> </tr>");

	//Append each tracks and their artists while accounting for the hash tags
	for (var i = 0; i < tracks.length; ++i) {
		findHashTagsInTracks(tracks[i].getTrackName(), i);
	}
}

/*  =============================================================================
	  Actually stores the rows of the tracks and artists HTML into tracksHTML.
	  Use this tracksHTML to display the entire table

		@param  		i 			The row #
		@return			none
		========================================================================== */
function storeRow(i) {
	console.log("INCREMENT: displayRow: " + i);

	//Forms the html of the inner table to append
	buttonID = "<div> <td id='add-col' class-buttons ='active'>  <form id='ht-form'><button class='class-button' onclick='addHT(this)' id='add-button" + i + "'> <h1>+</h1> </button>";
	slideID = "<div id='slide-input" + i + "' class='class-input'> </form> <form id='ht-form2' > <input class='input-add-HT' id='input-ht" + i + "' type='text'/> <input class='button-add-HT' id='submit-ht" + i + "' type='submit' onclick='submitHT(this)' value='#'/> </div> </form> </td> </div>";
	rowTrackName = "<td id='trackName" + i + "''> <a href='" + tracks[i].getTrackNameURI() + "' " + "id='link" + i + "' onclick='playButton(this)'>" + tracks[i].getTrackName() + "</a></td>";
	rowTrackArtists = "<td id=trackArtist" + i + ">";

	//Appends the links of every Artist's URI for each row
	for(z = 0; z<tracks[i].getTrackArtist().length; ++z){
		rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>" + ", ";
	}
	rowTrackArtists += "</td>";

	//Stores the HTML of the entire row accordingly to the index of that row's number
	tracksHTML[i] = "<tr class='not-header-row'>" + buttonID + slideID + rowTrackName + rowTrackArtists + rowTrackHashTag + "</tr>";

	//Once all tracks HTML are stored into the array, display the table
	if (rowCount == tracks.length) {
		displayTable();
	}

	//Increments rowCount
	++rowCount;
}

/*  =============================================================================
	  Displays the entire table with all of the rows in the correct order

		@param  		none
		@return			none
		========================================================================== */
function displayTable() {
	console.log("REACHED THE ENDING, should append everything \n\n\n");
	
	//The entire list to append all of the html
	for (var j = 0; j < tracksHTML.length; ++j) {
		$("#list-of-tracks").append(tracksHTML[j]);
	}

	//Set left and right arrow
	//Navigates through the different pages
	currentPage = 1;
	$("#pages").append("<input type='button' class='previous-page-button' onclick='previousPage()' value='<' >");
	$("#pages").append("<input type='button' class='page-number-button' value='" + currentPage + "'disabled>");
	$("#pages").append("<input type='button' class='next-page-button' onclick='nextPage()' value='>' >");

	//Scroll to beginning of tracks
	scrollToTracks();
}

/*  =============================================================================
    Scroll the screen down from splash screen to the Track list

		@param  		none
		@return			none
		========================================================================== */
function scrollToTracks() {
	//Sets the div splash-track-list to show up after submitting
  document.getElementById("splash-track-list").style.display = "inline-block";
  //Scrolls page to the track list
	$('html, body').animate({scrollTop:$('#splash-track-list').position().top}, 'slow');
}

/*  =============================================================================
		Changes the track list accordingly to the new page changes

		@param  		none
		@return			none
		========================================================================== */
function changeTrackList() {
	rowCount = 1;
	rowTrackHashTag = "";

	//Fills the tracksHTML array to have same length as the tracks array, but emptied
	for (var i = 0; i < tracks.length; ++i) {
		tracksHashTagArray.push("");
	}

	//Find Track 
	for (var i = 0; i < tracks.length; ++i) {
		findChangePageTrackHT(tracks[i].getTrackName(), i);
	}
}

/*  =============================================================================
		Changes the DisplayTable without deleting the entire table

		@param  		none
		@return			none
		========================================================================== */
function changeDisplayTable() {
	console.log("rowCount in changeTrackList: " + rowCount);

	if (rowCount >= tracks.length) {
		console.log("REACHED THE ENDING, should append EVERYTHING \n\n");
		//Clear ht table
		$('.hash-tag-table').empty();
		
		//For every track object
		for(i = 0; i < tracks.length; ++i) {
			$('#trackName'+i).empty();
			$('#trackArtist'+i).empty();

			//Add TrackName and Artist
			$('#trackName'+i).append("<a href='" + tracks[i].getTrackNameURI() + "''>" + tracks[i].getTrackName() + "</a>");
			for(z = 0; z < tracks[i].getTrackArtist().length; ++z) {
				$('#trackArtist'+i).append("<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>");
			}

			//appends the hashtag column
			$("#hash-tag-id"+i).append(tracksHashTagArray[i]);
		}
	}
	++rowCount;
}
