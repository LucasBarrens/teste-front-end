$(document).ready(function(){
	var snippet    = localStorage.getItem('snippet');
	var statistics = localStorage.getItem('statistics');
	var videoId    = localStorage.getItem('videoId');

	if(snippet == null || statistics == ""){
		window.location.href = "index.html";
	}

	snippet    = JSON.parse(snippet);
	statistics = JSON.parse(statistics);
	
	$("#video").html('<iframe width="100%" height="400px" src="https://www.youtube.com/embed/'+videoId+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
	$("#title").text(snippet["title"]);
	$("#description").text(snippet["description"]);
	$("#viewCount").text(statistics["viewCount"] + " Visualizações");
	$("#like").text(statistics["likeCount"] + " Likes");
	$("#deslike").text(statistics["dislikeCount"] + " Deslikes");
});