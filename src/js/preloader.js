'use strict'

function Preloader() {
  this.ready = false
}

Preloader.prototype = {

  preload: function () {
    if (!navigator.isCocoonJS) {
      this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader')
      this.asset.anchor.setTo(0.5, 0.5)
      this.load.setPreloadSprite(this.asset)
    }

    this.load.spritesheet('trunk', 'assets/trunk.png', 200, 35)
    this.load.spritesheet('koala', 'assets/koala.png', 30, 35)

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.load.image('time_meter', 'assets/time_meter.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('bg', 'assets/bg_blue.png')

    var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml'
    console.log(fileFormat, 'font format')
    this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia' + fileFormat)
  },

  create: function () {
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

module.exports = Preloader
