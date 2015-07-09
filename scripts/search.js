/*  =============================================================================
    For searching through queries

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    NOTE:

    -A track contains a Track Object
    -A track Object has a trackName and a list of trackArtists.
    -A page is the total view of every Track Object. Each page is usually
     limited to 20 tracks returned buy the Spotify API. To get next page,
     have to parse through current JSON to find next page URI and parse through 
     that page URI's JSON for its tracks and etc.
    ========================================================================== */

/*  =============================================================================
    GLOBAL VARIABLES

    arrayArtist           -The array of names of the artist
    arrayArtistURI        -The array of URIs of the Artist
    Tracks                -The array of every object Track on current page
    totalTracks           -The entire total tracks of the given query.
                           For example: Search KYGO returns 72
    currJSON              -The current page's JSON
    ========================================================================== */
var arrayArtist = [];
var arrayArtistURI = [];
var tracks = [];
var totalTracks = 0;
var currJSON = "";

/*  =============================================================================
    Search through Spotify API for tracks when input is selected in splash screen

    @param      none
    @return     none
    ========================================================================== */
function search() {
  //Takes input from the form submit box
  var query = document.getElementById("input-query-box").value;
  console.log("The query input is: " + query);
  if(query.charAt(0) == "#") {
    console.log("Going #");
    getTracksFromHT(query.substring(1,query.length).toLowerCase());
    return;
  }
  //Resets the current page to 1 when querying
  currentPage = 1;
  $(".page-number-button").val(currentPage);

  //AJAX Search Tracks of query
  $.ajax({
    type: 'GET',
    url: "https://api.spotify.com/v1/search?q=" + query + "&type=track&market=US",
    dataType: 'json',
    success: function(json) {parseJSON(json);},
    error: function(xhr, ajaxOptions, thrownError) {errorOut("Error at function: search()");}
  });
} 

/*  =============================================================================
    Search a page's json
    Function is used when user wants to click next or previous page of tracks

    @param      JSON      The page's JSON to parse to find all of the tracks of page
    @return     none
    ========================================================================== */
function search_page(page){
  //AJAX Search Tracks of page
  $.ajax({
    type: 'GET',
    url: page,
    dataType: 'json',
    success: function(json) {parseJSON(json);},
    error: function(xhr, ajaxOptions, thrownError) {errorOut("Error at function: search()");}
  });
}

/*  =============================================================================
    Parses the JSON to read in each track's artist, URI, track's name.

    @param      JSON      The page's JSON to parse to find all of the tracks of page
    @return     none
    ========================================================================== */
function parseJSON(json) {
  currJSON = json;
  arrayArtist = [];
  arrayArtistURI = [];
  tracks = [];
  totalTracks = json.tracks.total;      
  
  //Goes through the total amount of tracks on a given page
  for (var i = 0; i < json.tracks.items.length; ++i) {
    //Reads through every artists in the specific track and stores them into arrayArtist
    for (var j = 0; j < json.tracks.items[i].artists.length; ++j) {
      //Artist's name
      arrayArtist.push(json.tracks.items[i].artists[j].name);
      //Artist's URI
      arrayArtistURI.push(json.tracks.items[i].artists[j].uri);

    }
    //Creates an object track with the given track name, artists, and uri
    //Pushes it into the tracks array
    var newTrack = new Track(json.tracks.items[i].name, arrayArtist, json.tracks.items[i].uri,arrayArtistURI);
    tracks.push(newTrack);

    //Empties out the arrays for later use if another search query or page change
    arrayArtist = [];
    arrayArtistURI = [];

  }
  console.log("\n\nFINISHED PARSING");
  //Sorts
  sort(tracks);
}

/*  =============================================================================
    Sorts all tracks alphabetically by artists

    @param      array     Array of page's tracks
    @return     none
    ========================================================================== */
function sort(tracks) {
  tracks.sort(function(a,b) {
    if (a.getTrackArtist() > b.getTrackArtist())
      return 1;
    if (a.getTrackArtist() < b.getTrackArtist())
      return -1;
    return 0;
  });

  printTracks(tracks);
}

/*  =============================================================================
    Print all tracks in the given track's array

    @param      array     Array of page's tracks
    @return     none
    ========================================================================== */
function printTracks(tracks) {  
  for (var i = 0; i < tracks.length; ++i) {
    console.log("\nTracks " + i + ": "+ tracks[i].getTrackName());
    console.log("\tArtists " + i + ": "+ tracks[i].getTrackArtist());
  }  
  displayTracks();
}

/*  =============================================================================
    Error out message

    @param      none
    @return     none
    ========================================================================== */
function errorOut(printStatement) {
  console.log(printStatement); 
}

