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
  //Calculates the total amount by level AND categoty
  _.forEach(cards, function (card) {
    var level = card.labels[0].name;
    var categoryLabel = card.labels[1].name;
    if (cardsByLevel[categoryLabel] == null) {
      cardsByLevel[categoryLabel] = {
        category: categoryLabel,
      };
    }
    if (cardsByLevel[categoryLabel][level] == null) {
      cardsByLevel[categoryLabel][level] = {
        cardsDone: [],
        cardsWIP: [],
        total: 0
      }
    }

    var node = cardsByLevel[categoryLabel][level];

    if (card.idList == '591a47b3c64a334660aa72af') {
      node.cardsDone.push(card)
    } else if (card.idList == '591a47b3c64a334660aa72af') {
      node.cardsWIP.push(card)
    }
    node.total++;
    node.donePercentage = node.cardsDone.length / node.total;
    node.WIPPercentage = node.cardsWIP.length / node.total;
  });

  //Calculates the total amount by level
  cardsByLevel['total'] = {
    category: 'total'
  };

  _.forEach(LEVELS, function (level) {
    cardsByLevel['total'][level] = {};

    var node = cardsByLevel['total'][level];
    node.cards = _.filter(cards, function (card) {
      return _.find(card.labels, { 'name': level }) != null;
    });
    node.cardsDone = _.filter(node.cards, { idList: '591a47b3c64a334660aa72af' });
    node.cardsWIP = _.filter(node.cards, { idList: '591a47b17f78f4dbf51ad600' });

    var total = node.cards.length;
    node.donePercentage = (node.cardsDone.length / total);
    node.WIPPercentage = (node.cardsWIP.length / total);
  });
  return cardsByLevel;
}
