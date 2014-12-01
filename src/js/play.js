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
  },

  update: function () {
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

    this.trunks.sort('y', Phaser.Group.SORT_DESCENDING)
    this.trunks.callAllExists('moveDown', true, this)

    // Check if the koala position conflicts with the branch it's on
    this.checkKoalaCollide(this.trunks.getAt(2))
  },

  checkKoalaCollide: function(trunkSegment) {
    console.log('koala:', this.player.y, this.player.side, 'trunk:', trunkSegment.branchSide, trunkSegment.y)
    if (this.player.side === trunkSegment.branchSide) {
      console.log("DEAD")
    }

    if (!trunkSegment.frame) {
      // debugger
    }
  },

  onInputDown: function () {
    // Move left/right based on click position
    this.moveTrunk()
  },

  render: function() {
  }

}

module.exports = Play
