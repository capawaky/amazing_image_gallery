$(document).ready(function(){
    // uses https://instagram.com/developer/endpoints/users/#get_users_media_recent to get 4 most recent pictures from Instagram. requires a registered client & permission from user
    var url = "https://api.instagram.com/v1/users/1551735546/media/recent/?access_token=1551735546.4bf074c.c50158944161461cb019d912fa816df9" 
    var instagramData, index, i;
    $.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp'
})
	.done(function(data){
        instagramData = data.data; 
        // loads initial main photo, URL to Instagram and Instagram caption text
        $("#largePhoto").attr("src", instagramData[0].images.standard_resolution.url ); 
        $("#photoLink").attr("href", instagramData[0].link );
        $("#photoLink").attr("title", instagramData[0].caption.text );
        // tooltip by Alessio Atzeni (http://www.alessioatzeni.com/blog/simple-tooltip-with-jquery-only-text/) to display Instagram caption text when hovering
        $("#photoLink").hover(function(){
            var title = $(this).attr('title');
            $(this).data('tipText', title).removeAttr('title');
            $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');
        // removes tooltip when mouse leaves photo
        }, function () {
            $('this').attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
            $("#photoLink").attr("title", instagramData[0].caption.text );
        // captures mouse position on screen 
        }).mousemove(function(e){
            var mousex = e.pageX + 10; 
            var mousey = e.pageY + 10;
            $('.tooltip')
            .css({ top: mousey, left: mousex })
        });

        index = 0; 
        // loops to generate four thumbnail photos
        for (i = 0; i <= 3; i++){ 
        $("#"+i).attr("src", instagramData[i].images.thumbnail.url )
        }
        // clicks on navigation buttons reduce or increase index number to receive a new array
        $(".navigation").click(function(){
           if ($(this).attr("id") == "oldPhoto" && index < 16) {
            ++index; 
           } else if ($(this).attr("id") == "newPhoto" && index >= 1) {
            --index;
           }
            for (i = 0; i <= 3; i++){ 
                $("#"+i).attr("src", instagramData[i+index].images.thumbnail.url )
            }
        })
        
        // thumbnail mouse hover
        $("#thumbs img").hover(function (){   
        // hover over thumbnails launches effects              
            $("#largePhoto").fadeOut(300);                  
            $("#largePhoto").fadeIn(300);
            // loads the main photo by combining id value with var index and fetching the sum from the array
            var elemId = this;                           
            setTimeout(function(){
                        console.log("index number:" + index)
                        console.log("This is id: " + $(elemId).attr("id"))
                $("#largePhoto").attr("src", instagramData[parseInt($(elemId).attr("id"))+ index ].images.standard_resolution.url);
                $("#photoLink").attr("href", instagramData[parseInt($(elemId).attr("id"))+ index ].link);
                $("#photoLink").attr("title", instagramData[parseInt($(elemId).attr("id"))+ index ].caption.text);
                }, 300);
            },  function(){
            // when the cursors leaves a thumbnail, stops the animation and shows the main photo
            $("#largePhoto").stop( true, true );
            $("#largePhoto").show();                    
            });
    }); 
});











