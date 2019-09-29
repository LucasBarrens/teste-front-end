var api_key = "AIzaSyAal9nXdkaAKWONEred_lbrGiO9lovTEf4";
var playlistId, nextPageToken, prevPageToken;

//SE JA EXISTE BUSCA, FAZER NOVAMENTE AO CARREGAR A PAGINA
$(document).ready(function(){
	var termo_busca = localStorage.getItem('termo_busca');

	if(termo_busca != null){
		$("#txtpesquisa").val(termo_busca);
		$("#buscar").click();
	}
});

$("#buscar").on("click", function(){
	var termo_busca = $("#txtpesquisa").val();

	if(termo_busca == ""){
		$('.alert').show();

		$(".div_acao").slideUp("slow");
		$("#conteudo").slideUp("slow");
		$("#conteudo").html("");
		return false;
	} 

	$(".close").on("click", function(){
		$('.alert').hide();
	});

	localStorage.setItem("termo_busca", termo_busca);
	requestVideoPlaylist(playlistId, prevPageToken)
});

$(".proximo").on("click", function(){
  requestVideoPlaylist(playlistId, nextPageToken);
});

$(".anterior").on("click", function(){
  requestVideoPlaylist(playlistId, prevPageToken);
});


document.addEventListener('keypress', function(e){
    if(e.which == 13){
    	$("#buscar").click();
    } 
});

function requestVideoPlaylist(playlistId, pageToken) {
	var termo_busca = $("#txtpesquisa").val();

    var options = {
       part        : 'snippet',
       q           : termo_busca,
       maxResults  : 12,
       type        : 'video',
       key         : api_key
    };

    if (pageToken !== null){
        options.pageToken = pageToken;
    }

    $.get("https://www.googleapis.com/youtube/v3/search", options,
 		function (data) {

 		  $("#conteudo").html("");

	      nextPageToken = data.nextPageToken;
	      prevPageToken = data.prevPageToken;
	      
	      var nextVis = nextPageToken ? 'visible' : 'hidden';

	      $('.proximo').css('visibility', nextVis);
	      prevPageToken = data.prevPageToken
	     
	      var prevVis = prevPageToken ? 'visible' : 'hidden';
	      $('.anterior').css('visibility', prevVis);

	      var playlistItems = data.items;
	    
	      if (playlistItems) {
	      
		    $.each(playlistItems, function(index, item) {
		       displayResult(item);
		    });

		    $('.div_acao').show();
		    $("#formPesquisa").css("margin-top","0");
			$("#conteudo").show();

	      } else {

			$('.div_acao').hide();
	      	$('#conteudo').html("<span class='sem_resultado'> Sua busca não retornou resultados.</span>");
	     
	      } 

	      $(".item .btn").on("click", function(){
	      		buscar_detalhe($(this).attr("data_id"));
		   });
    	}
    );


    function displayResult(videoSnippet) {
	    var title       = videoSnippet.snippet.title;
	    var videoId     = videoSnippet.id.videoId;
	    var description = videoSnippet.snippet.description;

	    $('#conteudo').append(
	    	'<div class="col-md-3 col-xs-12 col-sm-12 item text-center float-lg-left">' +
	         	'<label class="col-12"> '+title+ '</label>'+
	            '<img class="col-12" src="'+videoSnippet.snippet.thumbnails.medium.url+'">'+
	            '<p class="col-12 descricao text-left"> '+description+' </p>'+
	            '<span class="float-left ml-2 col-md-8 col-xs-12 btn btn-outline-primary btn-sm detalhes" data_id='+videoId+'> Detalhes </span>'+
	        '</div> '
	    );
    }

    function buscar_detalhe(videoId){

   		var options = {
   		   id     : videoId,
	       part   : 'snippet,statistics',
	       type   : 'video',
	       key    : api_key
	    };

		$.get('https://www.googleapis.com/youtube/v3/videos', options ,
 			function (data) {
 				localStorage.setItem("videoId", data["items"][0]["id"]);
 				localStorage.setItem("snippet", JSON.stringify(data["items"][0]["snippet"]));
 				localStorage.setItem("statistics", JSON.stringify(data["items"][0]["statistics"]));
				window.location.href = "datails.html";
 			}
 		);
    }
}


	

	