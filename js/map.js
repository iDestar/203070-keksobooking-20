'use strict';
(function () {

  var map = document.querySelector('.map');

  window.getPins = window.debounce(function (data) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < data.length; j++) {
      var elem = template.cloneNode(true);
      elem.dataset.id = data[j].id;
      var img = elem.children[0];
      elem.style = 'left: ' + (data[j].location.x - 25) + 'px; top: ' + (data[j].location.y - 70) + 'px;';
      img.src = data[j].author.avatar;
      img.alt = data[j].offer.title;

      fragment.append(elem);
    }

    return map.append(fragment);
  });

})();
