/*
*		Amazing Image Gallery 1.0
*		https://github.com/capawaky/amazing_image_gallery
*		
*		Licensed under the MIT license:
*		http://opensource.org/licenses/MIT
*
*		(c) Carlos Kynäslahti 2015
*		http://www.capawaky.com
**/

$(document).ready(function(){
	// mouse hover over thumbnails
	$("#thumbs img").hover(function (){   				
		$("#largePhoto img").fadeOut(300);					
		$("#largePhoto img").fadeIn(300);
		var savedThis = this; 							
		//removes "_thumb" from jpg filename and changes the main photo
		setTimeout(function(){
			$("#largePhoto img").attr("src", $(savedThis).attr("src").replace("_thumb", ""));
			}, 300);
	}, 	function(){
		//clears animation queue to prevent it from looping when the cursor moves rapidly between thumbnails 
		$("#largePhoto img").stop( true, true );
		//prevents main photo from disappearing when the cursor leaves the thumbnail area quickly
		$("#largePhoto img").show();					
		}
	);
});