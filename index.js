var http = require('http');
var Trello = require('trello');
var trello = new Trello('5432cca712663538d2919e8eb8f85177', '48e74f0a3d2fbdc36ceff32fcc87b2ddbc0aae6af4430a7e91b1d70bf27dea6d');
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
