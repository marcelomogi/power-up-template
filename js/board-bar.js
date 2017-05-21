/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var myData = document.getElementById('myData');

const levels = ['N1', 'N2', 'N3', 'N4'];

t.board('all')
  .then(function (success) {
    console.log('Board:', success);

  })
  .catch(function (fail) {
    console.log('Board Fail:', fail);
  });

t.render(function () {
  t.cards('all')
    .then(function (success) {
      console.log('Sucess:', success);

    })
    .catch(function (fail) {
      console.log('Fail:', fail);
    });
});
