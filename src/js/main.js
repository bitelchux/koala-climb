window.onload = function () {
  'use strict'

  var width = window.innerWidth
    , height = window.innerHeight

  var game = new Phaser.Game(width, height, Phaser.CANVAS, '')

  game.state.add('boot', require('./boot'))
  game.state.add('preloader', require('./preloader'))
  game.state.add('menu', require('./menu'))
  game.state.add('play', require('./play'))

  game.state.start('boot')
}
