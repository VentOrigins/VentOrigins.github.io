/*  =============================================================================
    Spotify Playlists

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

var vars = window.location.href.split("&");
console.log(vars);
if(vars.length < 2) {
    var scopes = 'playlist-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-private';
    var my_client_id = 'f516a166c50d43dfae1800141104d748'
    var redirect_uri = 'http://ventorigins.github.io/playlist.html'
    var uri = 'https://accounts.spotify.com/authorize?' + 
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri)
      + '&response_type=token&state=444'
    window.location = uri;
}
else {
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(i == 0) {
      if(pair[1].indexOf("access_denied") < 0) {  
        accessToken = pair[1];
        localStorage.accessToken = accessToken;
        console.log("Access Token = " + accessToken);
        
      }
      else {
        console.log("ACCESS DENIED");
        var scopes = 'playlist-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-private';
        var my_client_id = 'f516a166c50d43dfae1800141104d748'
        var redirect_uri = 'http://ventorigins.github.io/playlist.html'
        var uri = 'https://accounts.spotify.com/authorize?' + 
          '&client_id=' + my_client_id +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' + encodeURIComponent(redirect_uri)
          + '&response_type=token&state=444'
        window.location = uri;
      }
    }
    else if(i == 1) {
      bear = pair[1];
      console.log("Bear = " + bear);
    }
    else if(i == 3) {
      state = pair[1];
      console.log("State = " + state);
    }
  }
  $.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: {
     'Authorization': 'Bearer ' + accessToken
    },
    success: function(response) {

    },
    statusCode: {
      401: function() {
        var scopes = 'playlist-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-private';
        var my_client_id = 'f516a166c50d43dfae1800141104d748'
        var redirect_uri = 'http://ventorigins.github.io/playlist.html'
        var uri = 'https://accounts.spotify.com/authorize?' + 
          '&client_id=' + my_client_id +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' + encodeURIComponent(redirect_uri)
          + '&response_type=token&state=444'
        window.location = uri;
      }
    }
  });
}
