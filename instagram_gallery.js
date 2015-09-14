$(document).ready(function(){
    // uses https://instagram.com/developer/endpoints/users/#get_users_media_recent to get 4 most recent pictures from Instagram. requires a registered client & permission from user
    var url = "https://api.instagram.com/v1/users/1551735546/media/recent/?access_token=1551735546.4bf074c.c50158944161461cb019d912fa816df9&count=4"
    $.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp'
})
	.done(function(data){
        // loads initial photo to be displayed
        $("#iso").attr("src", data.data[0].images.standard_resolution.url ); 
        // loops to generate four thumbnail photos
        for (i = 0; i < 4 ; i++){
        $("#"+i).attr("src", data.data[i].images.low_resolution.url );
        }
        $("#thumbs img").hover(function (){   
        // hover over thumbnails launches effects              
            $("#largePhoto img").fadeOut(300);                  
            $("#largePhoto img").fadeIn(300);
            // loads the main photo by grabbing the id of the active thumbnail and feeding it to the array
            var savedThis = this;                           
            setTimeout(function(){
                $("#largePhoto img").attr("src", data.data[$(savedThis).attr("id")].images.standard_resolution.url); 
                }, 300);
            },  function(){
            // when the cursors leaves a thumbnail, stops the animation and shows the main photo
            $("#largePhoto img").stop( true, true );
            $("#largePhoto img").show();                    
            });
    }); 
});