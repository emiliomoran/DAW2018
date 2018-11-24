function loadTweet(busqueda){
	$.ajax({
		type : 'GET',
		url : 'https://twitrss.me/twitter_search_to_rss/?term='+busqueda,
		dataType : 'xml',
		success : function(xml){
			$(xml).find('item').each(function() {
				var autor = $(this).find('dc:creator').text() + 'dijo:';        
				var descripcion = $(this).find('description').text();
        var url = $(this).find('link').text();
				var fecha = $(this).find('pubDate').text();
        addTweet(autor, descripcion, url, fecha);
			});
		},
		error: function(){
			alert('Requerimiento fallido');
    }
	});
}

function addTweet(autor, descripcion, url, fecha_hora){

  var icono = $("<i/>",{
    "class":"fa fa-twitter-square col-md-12"
  });

  var div_i = $("<div/>",{
    "class":"div_i col-md-2 col-sm-2"
  });

  var div_tweet = $("<div/>",{
    "class":"div_tweet col-md-12 col-sm-12"
  });

	var p_autor = $("<p/>", {
    "class":"autor_t col-md-12 col-sm-12",
    html: autor
  });

  var p_descripcion = $("<p/>",{
    "class": "descripcion_t col-md-12 col-sm-12",
    "id":"principal",
    html: descripcion
  });

  var a_t = $("<a/>",{
    "class": "a_link",
    "href": url,
    html: url.substring(0,30)+'...'
  });
    
	var time_t = $("<time/>",{
    "class": "time_t col-md-4 col-sm-4",
    html: fecha_hora
  });

  var div = $( "<div/>", {
    "class": "div_t col-md-10 col-sm-10"
  });

  icono.appendTo(div_i);
  p_autor.appendTo(div);
  p_descripcion.appendTo(div);
  a_t.appendTo(p_descripcion);
  time_t.appendTo(div);   
  div_i.appendTo(div_tweet); 
  div.appendTo(div_tweet);
  div_tweet.appendTo('div#tweets')

  $('p#principal *').addClass('col-md-12 col-sm-12');
}

$(document).ready(function(){
  $('button#id_buscar').click(function(e){
    var busqueda = $('input#id_buscador').val();
    $('h1#id_titulo').text(busqueda);
    document.getElementById("tweets").innerHTML = '';
    loadTweet(busqueda);
    return false;
  });  
})