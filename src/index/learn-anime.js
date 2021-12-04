var anime = require('animejs');
console.log('HELLO1');

anime({
    targets: ".square",
    translateX: 250,
    rotateZ: 360,
    scale: 3,
    duration: 3000,
    loop: true
})
