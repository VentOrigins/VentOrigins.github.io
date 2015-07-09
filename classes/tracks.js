/*  =============================================================================
    Track Class

    A track is a class that has a trackName and the track's artist(s)
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Constructor

    @param    string    Track's name
    @param    array     List of artists for the specific track
    @param    string    Track's name URI
    @param    array     List of artists for the specific track's uri
    @return   none
    ========================================================================== */
var Track = function (trackName, trackArtist, trackNameURI, trackArtistURI) {
  console.log("Track created");
  this.trackName = trackName;
  this.trackArtist = trackArtist;
  this.trackNameURI = trackNameURI;
  this.trackArtistURI = trackArtistURI;
}

/*  =============================================================================
    returns a track's name

    @param    none
    @return   string
    ========================================================================== */
Track.prototype.getTrackName = function() {
  return this.trackName;
}

/*  =============================================================================
    returns a track's name URI

    @param    none
    @return   string
    ========================================================================== */
Track.prototype.getTrackNameURI = function() {
  return this.trackNameURI;
}

/*  =============================================================================
    returns list of the track's artist(s)

    @param    none
    @return   array
    ========================================================================== */
Track.prototype.getTrackArtist = function() {
  return this.trackArtist;
}

/*  =============================================================================
    returns list of the track's artist(s) URI

    @param    none
    @return   array
    ========================================================================== */
Track.prototype.getTrackArtistURI = function() {
  return this.trackArtistURI;
}

/*  =============================================================================
    returns string of both trackName and trackArtist

    @param    none
    @return   array
    ========================================================================== */

Track.prototype.getAll = function() {
  return this.trackName + "\t\t\t\t\t" + this.trackArtist
}