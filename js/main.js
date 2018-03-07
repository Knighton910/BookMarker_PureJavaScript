document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark (e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {

        var bookmarks = [];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else
     {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}


function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // refetch bookmarks
    fetchBookmarks();
}


function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">' +
                                        '<h3>' + name +
            '<a class="btn btn-primary" target="_blank" href="'+url+'"> Visit</a>' +
            '<a onclick="deleteBookmark(\'' +url+ '\')" class="btn btn-danger" href="#">Delete</a>' +
                                        '</h3>' +
                                      '</div>';
    }
}

// validation
function validateForm(siteName, siteUrl) {

    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL')
        return false;
    }

    return true;
}


// // listen for form submit

// document.getElementById("myForm").addEventListener('submit', saveBookMark);

// // save bookmark
// function saveBookMark (e) {

//     // get form values
//     var siteName = document.getElementById('siteName').value;
//     var siteUrl = document.getElementById('siteUrl').value;

//     var bookmark = {
//       name: siteName,
//       url: siteUrl
//     };

//     // // testing localStorage
//     // localStorage.setItem('west', 'Seattle');
//     // console.log(localStorage.getItem('west'));
//     // localStorage.removeItem('west');
//     // console.log(localStorage.getItem('west'));

//     // test if bookmarks is null
//     if (localStorage.getItem('bookmarks') === null) {

//         // Init array
//         var bookmarks = [];

//         // add to array
//         bookmarks.push(bookmark);

//         //set to localStorage
//         localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
//     } else {
//          var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//          // add bookmark
//          bookmarks.push(bookmark);

//          // re-set back to localStorage
//         localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
//     }

//     // prevent form for submitting
//     e.preventDefault();
// }

// // fetch bookmarks
// function fetchBookmarks() {
//     // get bookmarks from localStorage
//     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//     // get output id
//     var bookmarksResults = document.getElementById('bookmarksResults');

//     bookmarksResults.innerHTML = '';
//     for (var i = 0; i < bookmarks.length; i++) {
//         var name = bookmarks[i].name;
//         var url = bookmarks[i].url;

//         bookmarksResults.innerHTML += '<div class="card bg-light text-dard card-body">'+
//                                         '<h3>' + name + '</h3>'+
//                                         '</div>';
//     }
// }

