/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var q;
/*  =============================================================================
    Searches through youtube and soundcloud to return the list of tracks
    From: OnSubmit of query-input
    To: youtubeSearch and soundCloudSearch

    @param        none
    @return       none
    ========================================================================== */
function search() {
  // Removes defaults
  event.preventDefault();

  console.log("Searched");
  // Puts an overlay over the splash screen to display tracks

  overlayTracks("#splash-screen");

  if ($('#query-form').css('display') == 'none') {
    q = $('#top-search-box').val();
  }
  else {
    q = $("#query-input").val();  
  }
  // Begins Youtube and SoundCloud search
  youTubeSearch();
  soundCloudSearch();
  if(!$('#top-title').length) {
    insertTopSearchBar();
  }
}

/*  =============================================================================
    Does the youtube search part, sets up the API key and makes the request
    From: search()
    To: youTubeMakeRequest()

    @param        none
    @return       none
    ========================================================================== */
function youTubeSearch() {
  console.log("Beginning search through Youtube");
  gapi.client.setApiKey('AIzaSyDJckImr2TEKtJepdGvM0rFU8vlTw-Pufw');
  gapi.client.load('youtube', 'v3', function() {
    youTubeMakeRequest();
  });
}
    
/*  =============================================================================
    Makes the request of the query value inputted from the query-input
    From: youTubeSearch()
    To: displayYoutubeOnOverlay()

    @param        none
    @return       none
    ========================================================================== */
function youTubeMakeRequest() {
  console.log("Making request to Google's API for Search");
  console.log("Q is " + q);
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',  
    maxResults: 50                      
  });
  request.execute(function(videos) {
    prepareForVideoListRequest(videos);
  });
}

/*  =============================================================================
    Prepares to add the parameters of 50 videos into the video API
    From: youTubeMakeRequest
    To: none

    @param        the videos response from the API search call
    @return       none
    ========================================================================== */
function prepareForVideoListRequest(videos) {
  console.log("In prepareForVideoListRequest");
  var videoID;
  var allVideoIDForContentDetail = '';

  // Parsing through the videos json response to retrieve each video.
  for(var i = 0; i < videos.result.items.length; ++i) {
    // VIDEO ID TO THE URL LINK
    videoID = videos.result.items[i].id.videoId;
    if (videoID != undefined) {
      // Adds all of the video IDs together to parse
      allVideoIDForContentDetail += videoID;

      // Doesn't add a comma to the end if last video
      if (i < videos.result.items.length - 1) {
        allVideoIDForContentDetail += ',';
      }
    }
  }
  console.log('prepare: ' + allVideoIDForContentDetail);
  youTubeMakeRequestForContentDetail(videos, allVideoIDForContentDetail);
}

/*  =============================================================================
    Prepares to add the parameters of 50 videos into the video API
    From: youTubeMakeRequest
    To: none

    @param        videos response from the API search call
    @param        all of the video ID's stringed together with commas
    @return       none
    ========================================================================== */
function youTubeMakeRequestForContentDetail(videos, allVideoIDs) {
  console.log("Making request to Google's API for Videos");
  var request = gapi.client.youtube.videos.list({
    part: 'contentDetails',
    id: allVideoIDs  
  });
  request.execute(function(videoContentDetailResponse) {
    displayYoutubeOnOverlay(videos, videoContentDetailResponse);
  });
}

/*  =============================================================================
    Displays the Youtube list on the overlay
    From: youTubeMakeRequestForContentDetail
    To: none

    @param       
    @param 
    @return       none
    ========================================================================== */
function displayYoutubeOnOverlay(videos, allVideoContent) {
  console.log("In displayYoutubeOnOverlay");
  var videoID;
  var title;
  var videoDuration;
  var channelTitle;
  var thumbnail;
  var str;

  console.log('VIDEOS: ');
  console.log(videos);
  console.log('ALLVIDEOCONTENT: ');
  console.log(allVideoContent);

  // Used to increment through the contentDetails
  var j = 0;

  // Parsing through the videos json response to retrieve each video.
  for(var i = 0; i < videos.result.items.length; ++i) {
    // VIDEO ID TO THE URL LINK
    videoID = videos.result.items[i].id.videoId;
    if (videoID != undefined) {
      
      //Seperating URI and title to parse
      thumbnail = "<div class='image-thumbnail'><img src='" + videos.result.items[i].snippet.thumbnails.default.url + "' alt='playlist-image'></div>";
      text = "<div class='youTubeTracksText'>" + "<button id='" + videoID + "/|" + videos.result.items[i].snippet.title + "' class='addButton' onclick='addYoutubeToQueue(this)'>" + videos.result.items[i].snippet.title + "</button> <br>";
      videoDuration = parseVideoDuration(allVideoContent.result.items[j].contentDetails.duration) + "<br>";
      playLink = "<a href='https://www.youtube.com/watch?v=" + videoID + "' target='_blank' title='Link to Youtube Video'> <i class='fa fa-youtube-play fa-lg fa-align-center'></i> </a>";
      channelLink = "<a href='https://www.youtube.com/channel/" + videos.result.items[i].snippet.channelId + "' target='_blank' title='Link to Youtube Channel'> <i class='fa fa-youtube-square fa-lg fa-align-center'></i> </a> </div>";
      str = thumbnail + text + videoDuration + playLink + channelLink;

      $('#youTubeTracks').append("<div class='youTubeTracksRow'>" + str + "</div>");

      // Incremements as long as there is a defined video id
      ++j;
    }
  }
  checkSize();
}

/*  =============================================================================
    Does the soundcloud search part, sets up the API key and makes the request
    From: search()
    To: soundCloudMakeRequest()

    @param        none
    @return       none
    ========================================================================== */
function soundCloudSearch() {
  console.log("Beginning search through SoundCloud");
  SC.initialize({
    client_id: 'bd791d329c430374438075140d3d3163'
  });
  soundCloudMakeRequest();
}

/*  =============================================================================
    Makes the request of the query value inputted from the query-input
    From: soundCloudSearch()
    To: displaySoundCloudOnOverlay()

    @param        none
    @return       none
    ========================================================================== */
function soundCloudMakeRequest() {
  console.log("Making request to SoundCloud's API");
  console.log("Q is " + q);
  var page_size = 50;

  SC.get(
    '/tracks', 
    { 
      q: q,
      limit: page_size, 
      linked_partitioning: 1
    }, 
  function(tracks) {
      displaySoundCloudOnOverlay(tracks);
      var track_url = tracks.collection[0].permalink_url;
      SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
        console.log(oEmbed);
    });
  });
}

/*  =============================================================================
    Displays the SoundCloud list on the overlay
    From: soundCloudMakeRequest
    To: none

    @param        none
    @return       none
    ========================================================================== */
function displaySoundCloudOnOverlay(tracks) {
  var title;
  var uri;
  var username;
  var usernameURL;
  var str;
  var artwork_url;
  var duration;
  var next_href;
  console.log(tracks);
  for (var i = 0; i < tracks.collection.length; ++i) {  
    uri = tracks.collection[i].uri;
    duration = parseSCDuration(tracks.collection[i].duration);
    //Seperating URI and title to parse
    title = "<div class='soundCloudTracksText'>" + "<button id='" + uri +"/|" + tracks.collection[i].title  + "' class='addButton' onclick='addSoundCloudToQueue(this)'>" + tracks.collection[i].title + "</button> </div>";
    username = tracks.collection[i].user.username;
    usernameURL = tracks.collection[i].user.permalink_url;
    artwork_url = "<div class='image-thumbnail'><img src='" + tracks.collection[i].artwork_url + "' alt='playlist-image'></div>";;
    str = title + artwork_url;
    $('#soundCloudTracks').append("<div class='soundCloudTracksRow'>" + str + "<div>");
  }
  next_href = tracks.next_href;
  checkSize();
  //Remove splash screen title
  
}



