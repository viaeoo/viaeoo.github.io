(function() {
  // 검색 결과 랜더링
  function displaySearchResults(results, store) {
    var searchResults = document.querySelector('.js-search-list');

    if (results.length) { // Are there any results?
      var appendString = '';
      var resultLength = results.length;

      for (var i = resultLength - 1; i >= 0; i--) {  // Iterate over the results
        var item = store[results[i].ref];

        appendString += 
          '<div class="card">' +
            '<a href="' + item.url + '">' +
              '<h3 class="card-header bg-transparent"><span class="text-primary">[' + item.category + ']</span> ' + item.title + '</h3>' +
              '<div class="card-body">' +
                '<p class="card-text">' + item.content +'</p>' +
                '<p class="card-text text-right">' + 
                  '<time class="card-date" datatime="' + item.date + '"><i class="fa fa-clock-o mr-2" aria-hidden="true"></i>' + item.date + '</time>' +
                '</p>' +
              '</div>' +
            '</a>' +
          '</div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = 'No results found';
    }
  }

  // 검색어 확인
  function getQueryVariable() {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    var search = {}; // 검색 객체 생성

    if(query){
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        // 검색 객체에 요소 추가
        search[decodeURIComponent(pair[0].replace(/\+/g, '%20'))] = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
    
    return search; // 검색 객체 반환
  }

  // 검색어를 searchTerm에 할당
  var searchTerm = getQueryVariable();

  if (searchTerm) {
    // 검색박스에 검색필드 추가
    document.querySelector('.js-form-search-select').value = searchTerm.sort;
    document.querySelector('.js-form-search-input').value = searchTerm.value;
    
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = new lunr.Index();
    
    switch(searchTerm.sort) {
      case 'all':
        idx.field('id');
        idx.field('title', { boost: 10 });
        idx.field('content');
        idx.field('category');
        break;
      case 'title':
        idx.field(searchTerm.sort, { boost: 10 });
        break;
      default:
        idx.field(searchTerm.sort);
        break;
    }

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'category': window.store[key].category,
        'content': window.store[key].content,
        'date': window.store[key].date,
        'tag': window.store[key].tag
      });

      var results = idx.search(searchTerm.value); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();