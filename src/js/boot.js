'use strict'

function Boot() {}

Boot.prototype = {
  preload: function () {
    this.load.image('preloader', 'assets/preloader.gif')
  },

  create: function () {
    this.game.input.maxPointers = 1
    this.game.stage.smoothed = false

    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true
    } else {
      this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.game.scale.setScreenSize(true)
    }
    this.game.state.start('preloader')
  }
}

module.exports = Boot
