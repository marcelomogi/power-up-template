/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var myData = document.getElementById('myData');

t.render(function () {
  t.cards('all')
    .then(function (success) {
      console.log(success);
    })
    .catch(function (fail) {
      console.log(fail);
    });
});
