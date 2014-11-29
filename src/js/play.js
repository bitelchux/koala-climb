(function() {
  'use strict'

  function Play() {
    this.player = null
  }

  Play.prototype = {

    create: function () {
      var w = this.game.width
        , h = this.game.height

      this.TRUNK_HEIGHT = 70

      this.input.onDown.add(this.onInputDown, this)

      // Tree
      this.trunks = this.game.add.group()
      for (var i = h; i > 0; i -= this.TRUNK_HEIGHT) {
        var trunk = new window['koala-climb'].Trunk(this.game, w/2, i)
        this.trunks.add(trunk)
      }

      //Player
      this.player = new window['koala-climb'].Koala(this.game, w/2, 300)
      this.game.add.existing(this.player)
    },

    update: function () {

    },

    generateTrunk: function() {
      var trunkLocal = this.trunks.getFirstDead()
      if(!trunkLocal) {
        trunkLocal = new window['koala-climb'].Trunk(this.game, this.game.width/2, 1000)
        this.trunks.add(trunkLocal)
        console.log('new trunk!')
      }
      this.trunks.sort('y', Phaser.Group.SORT_ASCENDING)
      trunkLocal.reset(this.game.width/2, this.trunks.getAt(0).y - this.TRUNK_HEIGHT)
    },

    onInputDown: function () {
      this.generateTrunk()
      this.trunks.callAllExists('moveDown', true, this)
    },

    render: function() {
    }

  }

  window['koala-climb'] = window['koala-climb'] || {}
  window['koala-climb'].Play = Play

}())
