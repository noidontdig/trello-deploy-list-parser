var http = require('http');
var Trello = require('trello');
// To get a new token (2nd param), use the following with the key (1st param)
// https://trello.com/1/connect?key=...&name=MyApp&response_type=token
var trello = new Trello('5432cca712663538d2919e8eb8f85177', '0b08460f3e00c9bacaf4085e6969dfaf0b4b57932e0b6373f56f77263aa0961c');
const PORT = 3000;

function handleRequest (req, res) {
  var boardId = '4eca8bb6ed3e63a2d111784a';

  trello.getListsOnBoard(boardId, function (error, lists) {
    var listId = lists[7].id;

    trello.getCardsOnList(listId, function(error, cards) {
      var sorted = [];
      cards.forEach(function(card) {
        sorted.push(card.name);
      });

      sorted.sort();

      var html = '';
      sorted.forEach(function(shipped) {
        html += shipped + '</br>';
      });

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    });
  });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
  console.log("Server listening on: http://localhost:%s", PORT);
});
