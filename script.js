$(document).ready(function(){
    SetEvents();
})

function SetEvents(){
    $('#movie').keypress(function(evt){
        if(evt.charCode == 13){
            Search();
        }
    })
}

function Search(){
    var movieName = $('#movie').val();
    $.ajax({
        method: 'GET',
        url: 'http://www.omdbapi.com/?apikey=fc37a2e7&s=' + movieName
    })
    .then(function(results){
        if(results.Response == "True"){
            Render(results.Search);
        }
        else {
            alert('Refine melhor sua busca')
        }
    })
    .fail(function(error){
        console.error(error)
    });
}

function Render(movies){
    $('#movies-list').html('')
    var moviesHtml = '';
    for(var i = 0; i < movies.length; i++){
        moviesHtml += '<div class="movie" style="background-image:url(' + movies[i].Poster + ')">'
        moviesHtml += '<div class="overlay"></div>'
        moviesHtml += ' <div class="title">' + movies[i].Title + '</div>'
        moviesHtml += '</div>'
    }
    $('#movies-list').append(moviesHtml);
}