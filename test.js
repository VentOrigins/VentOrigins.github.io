$(document).ready(function() {
	userID = "pawngypsy";
	$.ajax({
	url: 'https://api.spotify.com/v1/users/'+ userID + '/playlists',
	type: "POST",
	headers: {
		'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Authorization': 'Bearer ' + 'BQBr1viMUbMmS_mEqGqDS5a0RO3y__VR_QbaVljxp7PtjRQjAYh7bq3wVfDH_AwNiQltJnws7LQqs4Hyzkf7DipOJbuo5UmYEMjw6BIdmIw6kRGE1ErWsikgcv2DtqQXLdzbShAehaheI6_BoXUaGxUal6EOxhR0rrd-OtgjrOp7ExKsOKGSkvF_XNs4UN_h_B-deKtYBfH1NBZU7sVDTdxvGvpwp7APRJSt_MaTASEUhs3Hl_x-2YNaYhF2YAvfdNncKjKpNg'
	},
    data: "{\"name\":\"NewPlaylist\",\"public\":false}",
    success: function (data) {
      alert(JSON.stringify(data));
    },
    error: function(data){
    	console.log(data);
    	alert(data);
    }
	});
});
