'use strict'

var Trunk = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'trunk', 0)
  this.anchor.setTo(0.5, 0)
  this.scale.x = 2
  this.scale.y = 2
  this.isMoving = false

  // Only 3 frames but we want more 0 index frames
  this.frame = this.game.rnd.integerInRange(0, 2)
  this.branchSide = this.frame === 1 ? 'R'
                  : this.frame === 2 ? 'L'
                  : 'NONE'

}

Trunk.prototype = Object.create(Phaser.Sprite.prototype)
Trunk.prototype.constructor = Trunk

Trunk.prototype.update = function() {
}

Trunk.prototype.moveDown = function() {
  function finishMoving() { this.isMoving = false }
  this.isMoving = true
  var newHeight = this.y + this.height
  var movement = this.game.add.tween(this).to({y: newHeight}, this.game.CLIMB_TIME, null, true)
  movement.onComplete.add(finishMoving, this)
}

Trunk.prototype.resetTrunk = function(y) {
  this.reset(this.game.width/2, y)
  // this.bringToTop()
  this.frame = this.game.rnd.integerInRange(0, 2)
  this.branchSide = this.frame === 1 ? 'R'
                : this.frame === 2 ? 'L'
                : 'NONE'
}

module.exports = Trunk

