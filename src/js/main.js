var game

window.onload = function () {
  'use strict'

  var width = window.innerWidth
    , height = window.innerHeight
    , ns = window['koala-climb']

  game = new Phaser.Game(width, height, Phaser.CANVAS, '')

  game.state.add('boot', ns.Boot)
  game.state.add('preloader', ns.Preloader)
  game.state.add('menu', ns.Menu)
  game.state.add('play', ns.Play)

  game.state.start('boot')
}
