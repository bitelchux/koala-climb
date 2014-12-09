'use strict'

var TimeBar = function(game) {

  Phaser.Group.call(this, game)
  this.BAR_WIDTH = 200
  this.remainingTime = 100
  this.DECREASE_RATE = 0.1
  this.INCREASE_RATE = 1
  this.meter = this.game.add.sprite((game.width - this.BAR_WIDTH) * 0.5, 20, 'time_meter')
  this.add(this.meter)
  this.meter.anchor.setTo(0, 0.5)
  this.meter.width = this.BAR_WIDTH
}

TimeBar.prototype = Object.create(Phaser.Group.prototype)
TimeBar.prototype.constructor = TimeBar

TimeBar.prototype.update = function() {
  this.remainingTime -= this.DECREASE_RATE
  this.meter.width = (Math.max(this.remainingTime, 0) / 100) * this.BAR_WIDTH
}

TimeBar.prototype.bumpTime = function() {
  this.remainingTime += this.INCREASE_RATE
  if (this.remainingTime > 100) { this.remainingTime = 100 }
}

module.exports = TimeBar
