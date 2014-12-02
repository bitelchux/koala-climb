'use strict'

var Koala = require('./koala_prefab')
  , Trunk = require('./trunk_prefab')

function Play() {
  this.player = null
}

Play.prototype = {

  create: function () {
    this.game.CLIMB_TIME = 100
    this.game.add.sprite(0, 0, 'bg')

    var w = this.game.width
      , h = this.game.height

    this.TRUNK_HEIGHT = 70

    // Input
    this.input.onDown.add(this.onInputDown, this)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.cursors.left.onDown.add(this.pressLeft, this)
    this.cursors.right.onDown.add(this.pressRight, this)

    // Tree
    this.trunks = this.game.add.group()
    for (var i = h; i >= -2 * this.TRUNK_HEIGHT; i -= this.TRUNK_HEIGHT) {
      var trunk = new Trunk(this.game, w/2, i)
      this.trunks.add(trunk)
    }

    //Player
    this.player = new Koala(this.game, w/2 - 35, h - (2 * this.TRUNK_HEIGHT))
    this.game.add.existing(this.player)

    this.score = 0
    this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia', '', 42)
    this.game.add.existing(this.scoreText)

  },

  update: function () {
    this.scoreText.setText(this.score)
    this.scoreText.updateText()
    this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2
  },

  pressLeft: function() {
    if (this.trunks.getFirstAlive().isMoving) return false;
    this.player.climb('L')
    this.moveTrunk()
  },

  pressRight: function() {
    if (this.trunks.getFirstAlive().isMoving) return false;
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
    }
  },

  endGame: function() {
    this.player.fall()
    this.game.input.onDown.removeAll()
    this.cursors.left.onDown.removeAll()
    this.cursors.right.onDown.removeAll()
    this.game.time.events.add(
      Phaser.Timer.SECOND * 2
    , this.restartState
    , this
    )
  },

  restartState: function() {
    this.state.restart()
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
