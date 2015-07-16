/*  =============================================================================
    When clicking hashtags

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */


function showTracks(hashTag) {
	var num = hashTag.id.substring(9,hashTag.id.length);
	if ($("#ht-button"+num).find("#close" + num).length > 0){ 
		$("#close"+num).remove();
		return;
	}
	$("#ht-button"+num).append("<button id='close" + num + "' onclick='deleteHT(this);'>     x   </button>");
}



function deleteHT(hashTag) {

	var num = hashTag.id.substring(5,hashTag.id.length);
	console.log(hashTag);
	var firstNum = num.substring(0, num.indexOf("r"));
	console.log(firstNum);
	var hashTagValue = $("#ht-button"+num).text().substring(1,$("#ht-button"+num).text().indexOf(" ")).toLowerCase();
	var trackName = $("#trackName" + firstNum).text().replace(/[\W_]+/g, "").toLowerCase();
	console.log(trackName);
	console.log(hashTagValue);
	hashTagDB.equalTo("hashtags", hashTagValue);
	hashTagDB.equalTo("user", localStorage.userID);
	hashTagDB.find({
	  success: function(results) {
	    //Check if there is only one of that track
	    if(results.length > 1) {
	    	console.log("Error more than one hashtag object of that #");
	    	return;
	    }
	    //Add add track to the ht
			var tracksOfHT = results[0].get("tracks");
			var tracksURIOfHT = results[0].get("trackURI");
			var playlistsOfHT = results[0].get("playlist");

			findPlaylistsWithTrack(playlistsOfHT, trackName);
			
			var index = tracksOfHT.indexOf(trackName);
			while(index != -1) {
				tracksOfHT.splice(index, 1);
				tracksURIOfHT.splice(index, 1);
				index = tracksOfHT.indexOf(trackName);
			}
			if(tracksOfHT.length == 0) {
					results[0].destroy();
			}
			else {
				results[0].set("tracks", tracksOfHT);
				results[0].set("trackURI", tracksURIOfHT);
				results[0].save();
			}
			
			   	

	  },
  	error: function(error) {
  		//Error, hashtag should exist but doesnt.
  		console.log(error);
  		alert("Error in show tracks, hash should exist hashtagDB") ;
 			return;
  	}
	});
	trackDB.equalTo("tracks", trackName);
	trackDB.equalTo("user", localStorage.userID);
	trackDB.find({
	  success: function(results) {
	    //Check if there is only one of that track
	    if(results.length > 1) {
	    	console.log("Error more than one track");
	    	return;
	    }
	    //Add add track to the ht
			var htOfTracks = results[0].get("hashtags");
			var index = htOfTracks.indexOf(hashTagValue);
			if(index != -1) {
				htOfTracks.splice(index, 1);
				if(htOfTracks.length == 0) {
					results[0].destroy();
				}
				else{
					results[0].set("hashtags", htOfTracks);
					results[0].save();
				}
			}
			

	  },
  	error: function(error) {
  		//Error, hashtag should exist but doesnt.
  		console.log(error);
  		alert("Error in show tracks, hash should exist in trackDB" );
 			return;
  	}
	});

	$("#ht-button"+num).remove();


}



