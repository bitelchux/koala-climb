'use strict'

var Koala = require('./koala_prefab')
  , Trunk = require('./trunk_prefab')
  , TimeBar = require('./timebar_prefab')
  , Scoreboard = require('./scoreboard_prefab')

function Play() {
  this.player = null
}

Play.prototype = {

  create: function () {
    this.game.CLIMB_TIME = 100

    var w = this.game.width
      , h = this.game.height
      , bg = this.game.add.sprite(0, 0, 'bg')

    bg.width = w
    bg.height = h

    this.TRUNK_HEIGHT = 70

    // Input
    this.input.onDown.add(this.onInputDown, this)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.cursors.left.onDown.add(this.pressLeft, this)
    this.cursors.right.onDown.add(this.pressRight, this)

    // Tree
    this.trunks = this.game.add.group()
    for (var i = h; i >= -2 * this.TRUNK_HEIGHT; i -= this.TRUNK_HEIGHT) {
      // prevent branches at start
      var random = !(i >= h - 2 * this.TRUNK_HEIGHT)
      var trunk = new Trunk(this.game, w/2, i, random)
      this.trunks.add(trunk)
    }

    // Player
    this.player = new Koala(this.game, w/2 - 35, h - (2 * this.TRUNK_HEIGHT))
    this.game.add.existing(this.player)

    // Score
    this.score = 0
    this.scoreText = this.game.add.bitmapText(10, 30, 'minecraftia', '0', 42)
    this.game.add.existing(this.scoreText)

    // Time Bar
    this.timeBar = new TimeBar(this.game)
    this.game.add.existing(this.timeBar)

  },

  update: function () {
    // Update Score
    this.scoreText.setText(this.score.toString())
    this.scoreText.updateText()
    this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2

    // Check Timer
    if (this.timeBar.remainingTime <= 0 && this.player.alive) { this.endGame() }
  },

  pressLeft: function() {
    if (this.trunks.getFirstAlive().isMoving) { return false; }
    this.player.climb('L')
    this.moveTrunk()
  },

  pressRight: function() {
    if (this.trunks.getFirstAlive().isMoving) { return false; }
    this.player.climb('R')
    this.moveTrunk()
  },

  moveTrunk: function() {
    this.trunks.sort('y', Phaser.Group.SORT_DESCENDING)
    var trunkLocal = this.trunks.children[0]
    var topTrunk  = this.trunks.getAt(this.trunks.length - 1)
    trunkLocal.resetTrunk(topTrunk.y - this.TRUNK_HEIGHT)
    this.trunks.callAllExists('moveDown', true, this)

    // Check if the koala position conflicts with the branch it's on
    this.checkKoalaCollide(this.trunks.getAt(3))
  },

  checkKoalaCollide: function(trunkSegment) {
    if (this.player.side === trunkSegment.branchSide) {
      this.endGame()
    } else {
      this.score += 1
      this.timeBar.bumpTime()
    }
  },

  endGame: function() {
    this.player.fall()
    this.timeBar.alive = false
    this.game.input.onDown.removeAll()
    this.cursors.left.onDown.removeAll()
    this.cursors.right.onDown.removeAll()
    this.scoreboard = new Scoreboard(this.game, this.scoreText)
  },

  onInputDown: function () {
    if (this.game.input.activePointer.x < this.game.width * 0.5) {
      this.pressLeft()
    } else {
      this.pressRight()
    }
  },

  render: function() {
  }

}

module.exports = Play
