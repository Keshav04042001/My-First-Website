//const axios = require('axios');
//const fs = require('fs');
//const path = require('path')
document.addEventListener("DOMContentLoaded", function(event){
const link = ' https://www.omdbapi.com/?i=tt3896198&apikey=e602044f&r=json&s=';
const link1 = 'https://www.omdbapi.com/?i=';
const link2 = '&apikey=e602044f&r=json';
function Search() {
  let search = document.getElementById('search').value;
  movies(search);
}

function movies(search) {
  document.getElementById('desc').innerHTML="";
  axios
    .get(link + search)
    .then((res) => {
      console.log(res);
      //let movieitem= res;
      if(res.data.Response=="True"){
      let movies = res.data.Search;
      movies.forEach(movieitem => {

        document.getElementById('desc').innerHTML += `<div class="lister"><p>Title: ${movieitem.Title}<br>Year: ${movieitem.Year}<br>IMDb ID:${movieitem.imdbID}<br><button type="button" id=${movieitem.imdbID} onClick=Click(id) class="btn btn-primary form-control">View More</button><hr></p></div>`;
      });}
      else{
        document.getElementById('desc').innerHTML=`<p style:"text-align"="center">Oops!! Movie not found. Try checking the spelling or search for another movie...</p>`
      }
      
      //document.getElementById('desc').innerHTML=`<p>Title: ${movieitem.data.Title}<br>Actors: ${movieitem.data.Actors}<br>IMDb Rating: ${movieitem.data.Ratings[0].Value}<br>Year of release: ${movieitem.data.Year}<br>Genre: ${movieitem.data.Genre}</p`;
    })
    .catch((err) => {
      console.log(err);
    });

}
function Click(imdb){
  document.getElementById('desc').innerHTML="";
  axios
    .get(link1 + imdb+link2)
    .then((res) => {
      console.log(res);
      let movieitem= res;
      //let movieitem = res.data.Search;
     // movies.forEach(movieitem => {
        document.getElementById('desc').innerHTML += `<form class="clicker"><image src="${movieitem.data.Poster}" height=350px><p>Title: ${movieitem.data.Title}<br>Actors: ${movieitem.data.Actors}<br>IMDb Rating: ${movieitem.data.Ratings[0].Value}<br>Year of release: ${movieitem.data.Year}<br>Genre: ${movieitem.data.Genre}</p></form>`;

      
    })
      .catch((err) => {
        console.log(err);
      });
}
}
  //function showOutput(res) {
    //document.getElementById(res).innerHTML=`${res.data.Actors}`;


/*function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.data.Title}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}*/