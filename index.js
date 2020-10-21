'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the array
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(searchUser) {
  const params = {
    username: searchUser,
  };
  
  const url = `https://api.github.com/users/${searchUser}/repos`
  console.log(url);
  
  const options = {
    headers: new Headers({
      "accept": "application/vnd.github.v3+json"})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUser = $('#js-search-term').val();
    console.log(searchUser);
    getNews(searchUser);
  });
}

$(watchForm);