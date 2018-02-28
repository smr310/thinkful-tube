const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function pageLoadCallBack() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");

    getDataFromApi(query, getDataFromApiCB);
  });
}

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: searchTerm,
    per_page: 5,
    part: 'snippet',
    key: "AIzaSyDW01WDj_JY47WKZmAJ14fj7TXaiM-nOZM"

  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function getDataFromApiCB(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}


function displayNumResults() {
  $('.number-results').html(`showing ${data.items.length} results`)
}


function renderResult(eachItem) {
  return `
    <div class='results'>
      ${eachItem.snippet.title}
      <img data-item-id="${eachItem.id.videoId}" onclick="clickCB(event)" class="image" src="${eachItem.snippet.thumbnails.medium.url}">
    </div>
  `;
}

function clickCB(event) {
  const videoID = $(event.target).attr("data-item-id");
  window.location.href = `https://www.youtube.com/watch?v=${videoID}`;
}




$(pageLoadCallBack);
