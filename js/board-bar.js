;;;/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var totalDone = {};
totalDone['N1'] = document.getElementById('totalDoneN1');
totalDone['N2'] = document.getElementById('totalDoneN2');
totalDone['N3'] = document.getElementById('totalDoneN3');
totalDone['N4'] = document.getElementById('totalDoneN4');


const LEVELS = ['N1', 'N2', 'N3', 'N4'];

t.lists('all')
  .then(function (success) {
    console.log('Board:', success);

  })
  .catch(function (fail) {
    console.log('Board Fail:', fail);
  });

t.render(function () {
  t.cards('all')
    .then(function (cards) {
      console.log('Sucess:', cards);
      var matrix = generateLevelMatrix(cards);
      _.forEach(LEVELS, function (level) {
        totalDone[level].innerHTML = (matrix[level].donePercentage * 100).toFixed(2) + '%';
      });
    })
    .catch(function (fail) {
      console.log('Fail:', fail);
    });
});

generateLevelMatrix = function (cards) {
  var cardsByLevel = {};
  _.forEach(LEVELS, function (level) {
    cardsByLevel[level] = {};
    cardsByLevel[level].cards = _.filter(cards, function (card) {
      return _.find(card.labels, { 'name': level }) != null;
    });
    cardsByLevel[level].cardsDone = _.filter(cardsByLevel[level].cards, { idList: '591a47b3c64a334660aa72af' });
    cardsByLevel[level].cardsWIP = _.filter(cardsByLevel[level].cards, { idList: '591a47b17f78f4dbf51ad600' });
    var total = cardsByLevel[level].cards.length;
    cardsByLevel[level].donePercentage = (cardsByLevel[level].cardsDone.length / total);
    cardsByLevel[level].WIPPercentage = (cardsByLevel[level].cardsWIP.length / total);
  });
  return cardsByLevel;
}

