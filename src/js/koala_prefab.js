(function() {
  'use strict';

  var Koala = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'koala', 0)
    this.anchor.setTo(0.5, 0)

  }

  Koala.prototype = Object.create(Phaser.Sprite.prototype)
  Koala.prototype.constructor = Koala

  Koala.prototype.update = function() {

  }

  window['koala-climb'] = window['koala-climb'] || {}
  window['koala-climb'].Koala = Koala

}());
