'use strict'

var Koala = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'koala', 0)
  this.anchor.setTo(0.5, 0)
  this.scale.x = 2
  this.scale.y = 2
  this.side = 'L'
  this.leftX = x
  this.rightX = x + 70
  this.game.physics.enable(this, Phaser.Physics.ARCADE)
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

Koala.prototype.fall = function() {
  if (this.side === 'L') {
    this.body.velocity.x = this.game.rnd.integerInRange(-200, -100)
  } else if (this.side === 'R') {
    this.body.velocity.x = this.game.rnd.integerInRange(100, 200)
  }

  this.body.gravity.y = 400
  this.body.angularVelocity = this.game.rnd.integerInRange(-100, 100)
  this.body.velocity.y = this.game.rnd.integerInRange(-100, -300)
  // console.log(
  //   'x:', this.body.velocity.x
  // , 'y:', this.body.velocity.y
  // , 'ang:', this.body.angularVelocity)
}

module.exports = Koala
