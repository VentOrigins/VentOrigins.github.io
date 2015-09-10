/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var q;
var ifFinishedWIthBothRequests = 0;
var finalVideos;
var finalAllVideoCOntent;
var finalTracks;
// Used to increment through the contentDetails
var durationPos = 0;

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
    youTubeFinishedWithRequest(videos, videoContentDetailResponse);
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
function youTubeFinishedWithRequest(videos, allVideoContent) {
  ++ifFinishedWIthBothRequests;
  displayBothYoutubeAndSoundCloudOnOverlay(videos, allVideoContent, null);
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
      soundCloudFinishedWithRequest(tracks);
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
function soundCloudFinishedWithRequest(tracks) {
  ++ifFinishedWIthBothRequests;
  displayBothYoutubeAndSoundCloudOnOverlay(null, null, tracks);
}

/*  =============================================================================
    Displays the Youtube list on the overlay
    From: youTubeMakeRequestForContentDetail
    To: none

    @param       
    @param 
    @return       none
    ========================================================================== */
function displayYoutubeOnOverlay(i, videos, allVideoContent) {
  var videoID;
  var title;
  var videoDuration;
  var channelTitle;
  var thumbnail;
  var str;

  // VIDEO ID TO THE URL LINK
  videoID = videos.result.items[i].id.videoId;
  if (videoID != undefined) {
    
    //Seperating URI and title to parse
    thumbnail = "<div class='image-thumbnail'><img src='" + videos.result.items[i].snippet.thumbnails.default.url + "' onerror=\"this.src = 'img/VentOriginsLogoRegular.png';\" alt='playlist-image'></div>";
    text = "<div class='youTubeTracksText'>" + "<button id='" + videoID + "/|" + videos.result.items[i].snippet.title + "' class='addButton' onclick='addYoutubeToQueue(this)'>" + videos.result.items[i].snippet.title + "</button>";
    videoDuration = "<div class='youTubeDuration'>" + parseVideoDuration(allVideoContent.result.items[durationPos].contentDetails.duration) + "</div>";
    playLink = "<a class='youTubePlayLink' href='https://www.youtube.com/watch?v=" + videoID + "' target='_blank' title='Link to Youtube Video'> <i class='fa fa-youtube-play fa-lg fa-align-center'></i> </a>";
    channelLink = "<a class='youTubeChannelLink' href='https://www.youtube.com/channel/" + videos.result.items[i].snippet.channelId + "' target='_blank' title='Link to Youtube Channel'> <i class='fa fa-youtube-square fa-lg fa-align-center'></i> </a> </div>";
    str = thumbnail + text + videoDuration + playLink + channelLink;

    $('#youTubeAndSoundCloudTracks').append("<div class='youTubeTracksRow'>" + str + "</div>");

    // Incremements as long as there is a defined video id
    ++durationPos;
  }
}

/*  =============================================================================
    Displays the SoundCloud list on the overlay
    From: soundCloudMakeRequest
    To: none

    @param        none
    @return       none
    ========================================================================== */
function displaySoundCloudOnOverlay(i, tracks) {
  var title;
  var uri;
  var username;
  var usernameURL;
  var str;
  var artwork_url;
  var duration;
  
  console.log(tracks);
  if (i < tracks.collection.length) {
    uri = tracks.collection[i].permalink_url;
    duration = parseSCDuration(tracks.collection[i].duration);
    username = tracks.collection[i].user.username;
    usernameURL = tracks.collection[i].user.permalink_url;

    //Seperating URI and title to parse
    artwork_url = "<div class='image-thumbnail'><img src='" + tracks.collection[i].artwork_url + "' onerror=\"this.src = 'img/VentOriginsLogo.png';\" alt='playlist-image'></div>";
    title = "<div class='soundCloudTracksText'>" + "<button id='" + uri +"/|" + tracks.collection[i].title  + "' class='addButton' onclick='addSoundCloudToQueue(this)'>" + tracks.collection[i].title + "</button> <br> ";
    videoDuration = duration + "<br>";
    playLink = "<a href='" + uri + "' target='_blank' title='Link to SoundCloud'> <i class='fa fa-soundcloud fa-lg fa-align-center'></i> </a>";
    channelLink = "<a href='"+ usernameURL + "' target='_blank' title='Link to Soundcloud Artist'>" + username + " </a> </div>";   
    str = artwork_url + title + videoDuration + playLink + channelLink;
    
    $('#youTubeAndSoundCloudTracks').append("<div class='soundCloudTracksRow'>" + str + "<div>");
  }
}

function getGreaterLength(i, j) {
  if (i < j) {
    return j;
  }
  else {
    return i;
  }
}

function displayBothYoutubeAndSoundCloudOnOverlay(videos, allVideosContent, tracks) {
  if (videos == null && allVideosContent == null) {
    finalTracks = tracks;
  }
  else {
    finalVideos = videos;
    finalAllVideoCOntent = allVideosContent;
  }

  if (ifFinishedWIthBothRequests != 2) {
    return;
  }

  var displayLength = getGreaterLength(finalVideos.result.items.length, finalTracks.collection.length);
  console.log('DisplayLength: ' + displayLength);
  for (var i = 0; i < displayLength; ++i) {
    displayYoutubeOnOverlay(i, finalVideos, finalAllVideoCOntent);
    displaySoundCloudOnOverlay(i, finalTracks);
  }

  //Resets
  ifFinishedWIthBothRequests = 0;
  // Used to increment through the contentDetails
  durationPos = 0;

  // Adjusts the size
  checkSize();
}



