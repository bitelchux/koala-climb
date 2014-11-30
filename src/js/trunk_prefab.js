(function() {
  'use strict';

  var Trunk = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'trunk', 0)
    this.anchor.setTo(0.5, 0)
    this.scale.x = 2
    this.scale.y = 2

    // Kill offscreen trunks
    this.checkWorldBounds = true
    this.outOfBoundsKill = true
  }

  Trunk.prototype = Object.create(Phaser.Sprite.prototype)
  Trunk.prototype.constructor = Trunk

  Trunk.prototype.update = function() {

  }

  Trunk.prototype.moveDown = function() {
    var newHeight = this.y + this.height
    this.game.add.tween(this).to({y: newHeight}, this.game.CLIMB_TIME, null, true)
    // tween.to(properties, duration, ease, autoStart, delay, repeat, yoyo)
  }


  window['koala-climb'] = window['koala-climb'] || {}
  window['koala-climb'].Trunk = Trunk

}());
