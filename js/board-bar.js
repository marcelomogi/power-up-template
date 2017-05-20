/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var myData = document.getElementById('myData');

t.render(function () {
  t.card('all')
    .then(function (success) {
      console.log(success);
    })
    .error(function (fail) {
      console.log(fail);
    });
});
