(function() {
  'use strict'

  function Preloader() {
    this.asset = null
    this.ready = false
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader')
      this.asset.anchor.setTo(0.5, 0.5)

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
      this.load.setPreloadSprite(this.asset)
      this.load.image('koala', 'assets/koala.png')
      this.load.image('trunk', 'assets/trunk.png')
      this.load.image('player', 'assets/player.png')
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml')
    },

    create: function () {
      this.asset.cropEnabled = false
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('play')
      }
    },

    onLoadComplete: function () {
      this.ready = true
    }
  }

  window['koala-climb'] = window['koala-climb'] || {}
  window['koala-climb'].Preloader = Preloader

}())