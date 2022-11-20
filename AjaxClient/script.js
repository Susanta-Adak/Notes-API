function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(JSON.parse(this.responseText));
    }
    xhttp.open("GET", "http://localhost:5000/note/", true);
    xhttp.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhnYmhAZ21haWwuY29tIiwiaWQiOiI2Mzc5OWY5ODAzZmQ4YzU3ZDdjOWQxNWIiLCJpYXQiOjE2Njg5MTUxMTJ9.1kCs1uWUDxzG0e_rIh6yesWqCjgI4UtXqZMhHPXtmNw");
    xhttp.send();
  }