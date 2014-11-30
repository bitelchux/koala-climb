(function() {
  'use strict'

  function Play() {
    this.player = null
  }

  Play.prototype = {

    create: function () {
      this.game.CLIMB_TIME = 100

      var w = this.game.width
        , h = this.game.height

      this.TRUNK_HEIGHT = 70

      // Input
      this.input.onDown.add(this.onInputDown, this)
      this.cursors = this.game.input.keyboard.createCursorKeys()

      // Tree
      this.trunks = this.game.add.group()
      for (var i = h; i > 0; i -= this.TRUNK_HEIGHT) {
        var trunk = new window['koala-climb'].Trunk(this.game, w/2, i)
        this.trunks.add(trunk)
      }

      //Player
      this.player = new window['koala-climb'].Koala(this.game, w/2 - 35, 300)
      this.game.add.existing(this.player)
    },

    update: function () {
      if (!this.player.isClimbing) {
        if (this.cursors.left.isDown) {
          this.player.climb('L')
          this.moveTrunk()
        } else if (this.cursors.right.isDown) {
          this.player.climb('R')
          this.moveTrunk()
        }
      }
    },

    moveTrunk: function() {
      var trunkLocal = this.trunks.getFirstDead()
      if(!trunkLocal) {
        trunkLocal = new window['koala-climb'].Trunk(this.game, this.game.width/2, 1000)
        this.trunks.add(trunkLocal)
        console.log('new trunk!')
      }
      this.trunks.sort('y', Phaser.Group.SORT_ASCENDING)
      trunkLocal.reset(this.game.width/2, this.trunks.getAt(0).y - this.TRUNK_HEIGHT)
      this.trunks.callAllExists('moveDown', true, this)
    },

    onInputDown: function () {
      // Move left/right based on click position
      this.moveTrunk()
    },

    render: function() {
    }

  }

  window['koala-climb'] = window['koala-climb'] || {}
  window['koala-climb'].Play = Play

}())
