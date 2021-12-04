var anime = require('animejs');
console.log('HELLO1');

let squareAnimation = anime({
    targets: ".square",
    translateX: 250,
    rotateZ: 360,
    scale: 3,
    duration: 3000,
    loop: true
});

let circleAnimation = anime({
    targets: ".circle",
    keyframes: [
        {translateY: 250},
        {translateX: 250},
        {translateY: 50},
        {translateX: 50},
    ],
    scale: .5,
    duration: 5000,
    loop: true,
    direction: "alternate"
});

let photoFrame = anime({
    targets: ".photo-frame",
    keyframes: [
        {    translateX: '50%', translateY: '100vh'},
        {     translateX: '50%', translateY: '0', delay: '3000'}
    ],
    duration: 3000,
    loop: true,
    // direction: "alternate"
});
