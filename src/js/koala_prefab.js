(function() {
  'use strict';

  var Koala = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'koala', 0)
    this.anchor.setTo(0.5, 0)
    this.scale.x = 2
    this.scale.y = 2
    this.side = 'L'
    this.leftX = x
    this.rightX = x + 70
  }

  Koala.prototype = Object.create(Phaser.Sprite.prototype)
  Koala.prototype.constructor = Koala

  Koala.prototype.update = function() {
  }

  Koala.prototype.climb = function(dir) {
    var climb

    if (dir === 'L' && this.side === 'R') {
      climb = this.game.add.tween(this).to({x: this.leftX}, this.game.CLIMB_TIME, null, true)
      this.scale.x *= -1
    } else if (dir === 'R' && this.side === 'L') {
      climb = this.game.add.tween(this).to({x: this.rightX}, this.game.CLIMB_TIME, null, true)
      this.scale.x *= -1
    }

    this.side = dir

    // Run climb animation
  }

  window['koala-climb'] = window['koala-climb'] || {}
  window['koala-climb'].Koala = Koala

}());
