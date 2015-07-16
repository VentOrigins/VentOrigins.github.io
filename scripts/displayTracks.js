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
var bottomOfPage = "";
//Keeps track of how many rows checked so far when going through the HTML
var rowCount;

/*  =============================================================================
	  Displays the Tracks And Artists in the html table with their corresponding
	  hashtags.

		@param  		none
		@return			none
		========================================================================== */
function displayTracks() {
	// Document ready for the css
	// Sets the width for the track's table to the screen minus the width of the nav bar
  var splashScreenSize = screen.width - document.getElementById('nav').offsetWidth;
  $('#track-list table').width(splashScreenSize);

	//Check if track list is made, if made, just update the values of trackName and artists and HT instead of replacing everything
	if(!$.trim($('#list-of-tracks').html()).length == 0 ) {
		//Changes height of splash-track-list to track-list to correctly overlay the loading screen
	  document.getElementById("splash-track-list").style.height = $("#track-list").outerHeight() + 'px';
		//Sets up the loading screen when waiting to display the tracks
		loadingScreen("#track-list");
		//Update track list
		changeTrackList();
		//Scroll up to beginning of track
		return;
	}

	//Scroll to beginning of tracks only if in index.html
	scrollToTracks('#splash-screen');

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
	$("#list-of-tracks").append("<tr> <th class='class-addHT-column'>ADD #</th> <th class='class-tracks-column'>TRACK</th> <th class='class-artists-column'>ARTIST</th> <th class='class-hashtag-column'>#</th> </tr>");

	//Sets up the loading screen when waiting to display the tracks
	loadingScreen("#track-list");

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
		========================================================================= */
function storeRow(i, trackHashTag) {
	console.log("INCREMENT: displayRow: " + i);

	//Forms the html of the inner table to append
	buttonID = "<div> <td class='class-addHT-column' id='add-col' class-buttons='active'>  <form id='ht-form'><button class='class-button' onclick='addHT(this)' id='add-button" + i + "'> <h1>+</h1> </button>";
	slideID = "<div id='slide-input" + i + "' class='class-input'> </form> <form id='ht-form2' > <input class='input-add-HT' id='input-ht" + i + "' type='text'/> <input class='button-add-HT' id='submit-ht" + i + "' type='submit' onclick='submitHT(this)' value='#'/> </div> </form> </td> </div>";
	rowTrackName = "<td class='class-track-column' id='trackName" + i + "''> <a href='" + tracks[i].getTrackNameURI() + "' " + "id='link" + i + "' onclick='playButton(this)'>" + tracks[i].getTrackName() + "</a></td>";
	rowTrackArtists = "<td class='class-artists-column' id=trackArtist" + i + ">";

	//Appends the links of every Artist's URI for each row
	for(z = 0; z<tracks[i].getTrackArtist().length; ++z){
		if (z == (tracks[i].getTrackArtist().length) - 1) {
			//If traversed to the last track artist, do not append a comma
			rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>";
		}
		else {
			//If not the last track artist, then do append a comma
			rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>" + ", ";
		}
	}
	rowTrackArtists += "</td>";

	//Stores the HTML of the entire row accordingly to the index of that row's number
	tracksHTML[i] = "<tr class='not-header-row' onmousedown='rowClick(this,false);'>" + buttonID + slideID + rowTrackName + rowTrackArtists + trackHashTag + "</tr>";

	//Once all tracks HTML are stored into the array, display the table
	if (rowCount == tracks.length) {
		displayTable();
		getTRS();
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
	// $("#pages").append("<input type='button' class='previous-page-button' onclick='previousPage()' value='<' >");
	// $("#pages").append("<input type='button' class='page-number-button' value='" + currentPage + "'disabled>");
	// $("#pages").append("<input type='button' class='next-page-button' onclick='nextPage()' value='>' >");
	finishedLoading("#track-list");
	if(tracksHTML.length > 5) {
		var num = tracksHTML.length - 5;
		bottomOfPage = $('#trackName'+ num).position().top;
	}
	
}

/*  =============================================================================
    Scroll the screen down from splash screen to the Track list only if the div exists

		@param  		div 		The div where the screen will scroll down only if this div exists
		@return			none
		========================================================================== */
function scrollToTracks(div) {
	//Sets the div splash-track-list to show up after submitting
  document.getElementById("splash-track-list").style.display = "inline-block";

  //Scrolls page to the track list only if the div exists (Would be splash-track-list)
  //This means it is currently in the main index.html page
  if ($(div).length > 0) {
		$('html, body').animate({scrollTop:$('#splash-track-list').position().top}, 'slow');
	}
	//If it is a playlist loading the tracks, then set this height to be value 250px
	else {
	  document.getElementById("splash-track-list").style.height = '250px';
	}
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
	var currentLength = $('#list-of-tracks tr').length - 1;
	//Find Track 
	for (var i = 0; i < tracks.length; ++i) {
		var tableID = i + currentLength;
		findChangePageTrackHT(tracks[i].getTrackName(), tableID);
	}
}

/*  =============================================================================
		Changes the DisplayTable without deleting the entire table

		@param  		none
		@return			none
		========================================================================== */
function changeDisplayTable() {
	console.log("rowCount in changeTrackList: " + rowCount);
	var currentLength = $('#list-of-tracks tr').length - 1;
	if (rowCount >= tracks.length) {
		console.log("REACHED THE ENDING, should append EVERYTHING \n\n");
		//Clear ht table
		//For every track object
		for(i = 0; i < tracks.length; ++i) {
			var tableID = i + currentLength;
			buttonID = "<div> <td class='class-addHT-column' id='add-col' class-buttons='active'>  <form id='ht-form'><button class='class-button' onclick='addHT(this)' id='add-button" + tableID + "'> <h1>+</h1> </button>";
			slideID = "<div id='slide-input" + tableID + "' class='class-input'> </form> <form id='ht-form2' > <input class='input-add-HT' id='input-ht" + tableID + "' type='text'/> <input class='button-add-HT' id='submit-ht" + tableID + "' type='submit' onclick='submitHT(this)' value='#'/> </div> </form> </td> </div>";
			rowTrackName = "<td class='class-track-column' id='trackName" + tableID + "''> <a href='" + tracks[i].getTrackNameURI() + "' " + "id='link" + tableID + "' onclick='playButton(this)'>" + tracks[i].getTrackName() + "</a></td>";
			rowTrackArtists = "<td class='class-artists-column' id=trackArtist" + tableID + ">";

			//Appends the links of every Artist's URI for each row
			for(z = 0; z<tracks[i].getTrackArtist().length; ++z){
				if (z == (tracks[i].getTrackArtist().length) - 1) {
					//If traversed to the last track artist, do not append a comma
					rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>";
				}
				else {
					//If not the last track artist, then do append a comma
					rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>" + ", ";
				}
			}
			rowTrackArtists += "</td>";
			$("#list-of-tracks").append("<tr class='not-header-row' onmousedown='rowClick(this,false);'>" + buttonID + slideID + rowTrackName + rowTrackArtists + tracksHashTagArray[tableID] + "</tr>");	
		}

			
			// $('#trackName'+ tableID).empty();
			// $('#trackArtist'+tableID).empty();

			// //Add TrackName
			// $('#trackName'+tableID).append("<a href='" + tracks[i].getTrackNameURI() + "''>" + tracks[i].getTrackName() + "</a>");

			// // Adds all the track Artists for that track
			// for(z = 0; z < tracks[i].getTrackArtist().length; ++z) {
			// 	//If traversed to the last track artist, do not append a comma
			// 	if (z == (tracks[i].getTrackArtist().length) - 1) {
			// 		$('#trackArtist'+tableID).append("<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>");
			// 	}
			// 	//If not the last track artist, then do append a comma
			// 	else {
			// 		$('#trackArtist'+tableID).append("<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>" + ", ");
			// 	}
			// }

			//appends the hashtag column
			// $("#hash-tag-id"+tableID).append(tracksHashTagArray[tableID]);
		console.log("REMOVED TRACKS AND ADDED NEW ONES, REMOVE LOAD SCREEN");
		//Finishes the loading overlay
		finishedLoading("#track-list");
		var num = tableID - 5;	
		bottomOfPage = $('#trackName' + num).position().top;
	}
	++rowCount;
}
$(document).scroll(function() {
  if(bottomOfPage != "") {
  	if($(document).scrollTop() >= bottomOfPage){
			bottomOfPage = "";
			setTimeout(
	    	function() {
	      	nextPage();
	    	}, 300
	  	);
		}
	}
});


