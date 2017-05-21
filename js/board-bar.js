;;;/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var myData = document.getElementById('myData');

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

      console.log('Matrix:', matrix);


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
    cardsByLevel[level].donePercentage = ( cardsByLevel[level].cardsDone.length / total );
    cardsByLevel[level].WIPPercentage = ( cardsByLevel[level].cardsWIP.length / total );
  });
  return cardsByLevel;
}

