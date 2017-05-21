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
      console.log('Matrix:',matrix);
    })
    .catch(function (fail) {
      console.log('Fail:', fail);
    });
});

generateLevelMatrix = function (cards) {
  var cardsByLevel = {};
  _.forEach(LEVELS, function (level) {
    cardsByLevel[level] = _.filter(cards, function (card) {
      return _.indexOf(card.labels, level) > -1;
    });
  });
  return cardsByLevel;
}