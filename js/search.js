/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var q;
var ifFinishedWithBothRequests = 0;
// In a way, these have no need to be global, because they are passed as arguments in functions
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

  // Takes the query depending on which search box is currently showing (Either the top nav, or the splash query)
  // q is the query
  if ($('#query-form').css('display') == 'none') {
    q = $('#top-search-box').val();
  }
  else {
    q = $("#query-input").val();  
  }
  // Begins Youtube and SoundCloud search
  youTubeSearch();
  soundCloudSearch();
  // Adds the top search bar when it does not exist yet
  if(!$('#top-search-form').length) {
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
  // Should not be public, but for this website, oh well
  // If we wanted to hide it, we would have done it on server side and hidden it  
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
  ++ifFinishedWithBothRequests;
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
  // Should not be public, but for this website, oh well
  // If we wanted to hide it, we would have done it on server side and hidden it
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
  ++ifFinishedWithBothRequests;
  displayBothYoutubeAndSoundCloudOnOverlay(null, null, tracks);
}

/*  =============================================================================
    Displays the Youtube list on the overlay
    From: youTubeMakeRequestForContentDetail
    To: none

    @param        The index of the video within the youtube list
    @param        The JSON list of the videos
    @param        The JSON list of all the videos' content
    @return       none
    ========================================================================== */
function displayYoutubeOnOverlay(i, videos, allVideoContent) {
  // NOTE: To clarify, allVideoContent is used to return the duration of the video, the duration of the video is in separate JSON's from the actual video's JSON.
  // Soundcloud has the duration in the same JSON call. Technically 2 API's are called for Youtube, while 1 API is called for Soundcloud to acquire the duration

  var videoID;
  var title;
  var videoDuration;
  var channelTitle;
  var thumbnail;
  var str;

  // VIDEO ID TO THE URL LINK
  videoID = videos.result.items[i].id.videoId;
  // This check was necessary because the index may actually be non videos, but channel names instead
  if (videoID != undefined) {
    
    //Seperating URI and title to parse
    thumbnail = "<div class='image-thumbnail'><img src='" + videos.result.items[i].snippet.thumbnails.default.url + "' onerror=\"this.src = 'img/VentOriginsNoAvailableImage.png';\" alt='playlist-image'></div>";
    text = "<div class='youTubeTracksText'>" + "<button id='" + videoID + "/|" + videos.result.items[i].snippet.title + "' class='addButton' onclick='addYoutubeToQueue(this)'>" + "+ " + videos.result.items[i].snippet.title + "</button>";
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

    @param        The index of the song within the soundcloud list
    @param        The JSON list of the tracks
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
  
  if (i < tracks.collection.length) {
    uri = tracks.collection[i].permalink_url;
    duration = parseSCDuration(tracks.collection[i].duration);
    username = tracks.collection[i].user.username;
    usernameURL = tracks.collection[i].user.permalink_url;

    //Seperating URI and title to parse
    artwork_url = "<div class='image-thumbnail'><img src='" + tracks.collection[i].artwork_url + "' onerror=\"this.src = 'img/VentOriginsNoAvailableImage.png';\" alt='playlist-image'></div>";
    title = "<div class='soundCloudTracksText'>" + "<button id='" + uri +"/|" + tracks.collection[i].title  + "' class='addButton' onclick='addSoundCloudToQueue(this)'>" + "+ " + tracks.collection[i].title + "</button> <br> ";
    videoDuration = duration + "<br>";
    playLink = "<a href='" + uri + "' target='_blank' title='Link to SoundCloud'> <i class='fa fa-soundcloud fa-lg fa-align-center'></i> </a>";
    channelLink = "<a href='"+ usernameURL + "' target='_blank' title='Link to Soundcloud Artist'>" + username + " </a> </div>";   
    str = artwork_url + title + videoDuration + playLink + channelLink;
    
    $('#youTubeAndSoundCloudTracks').append("<div class='soundCloudTracksRow'>" + str + "<div>");
  }
}

/*  =============================================================================
    returns the list with the bigger size

    @param        The length of the 1st parameter
    @param        The length of the 2nd parameter
    @return       The bigger length
    ========================================================================== */
function getGreaterLength(i, j) {
  if (i < j) {
    return j;
  }
  else {
    return i;
  }
}

/*  =============================================================================
    Displays both Youtube and SoundCloud ont he overlay. Waits for all the API requests
    to finish then continues on. After displaying, resets the values

    @param        The JSON list of the videos
    @param        The JSON list of the videos' content
    @param        The JSON list of the tracks
    @return       none
    ========================================================================== */
function displayBothYoutubeAndSoundCloudOnOverlay(videos, allVideosContent, tracks) {
  // If the Soundcloud tracks finished, then do this
  if (videos == null && allVideosContent == null) {
    finalTracks = tracks;
  }
  // If the youtube video tracks finished, then do this
  else {
    finalVideos = videos;
    finalAllVideoCOntent = allVideosContent;
  }

  // Continues on with the code only when both youtube and soundcloud finished their requests
  if (ifFinishedWithBothRequests != 2) {
    return;
  }

  // Increments through the size of the songs of youtube and soundcloud, the size is calculated by
  // checking which size is greater from both the youtube and soundcloud
  var displayLength = getGreaterLength(finalVideos.result.items.length, finalTracks.collection.length);
  // Displays the videos and tracks, alternating each one
  for (var i = 0; i < displayLength; ++i) {
    displayYoutubeOnOverlay(i, finalVideos, finalAllVideoCOntent);
    displaySoundCloudOnOverlay(i, finalTracks);
  }

  //Resets
  ifFinishedWithBothRequests = 0;
  // Used to increment through the contentDetails
  durationPos = 0;

  // Adjusts the size
  checkSize();
}



