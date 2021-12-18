var anime = require('animejs');
console.log('HELLO1');

// let squareAnimation = anime({
//     targets: ".square",
//     translateX: 250,
//     rotateZ: 360,
//     scale: 3,
//     duration: 3000,
//     loop: true
// });

// let circleAnimation = anime({
//     targets: ".circle",
//     keyframes: [
//         {translateY: 250},
//         {translateX: 250},
//         {translateY: 50},
//         {translateX: 50},
//     ],
//     scale: .5,
//     duration: 5000,
//     loop: true,
//     direction: "alternate"
// });

// let photoFrame = anime({
//     targets: ".photo-frame",
//     keyframes: [
//         {    translateX: '50%', translateY: '100vh'},
//         {     translateX: '50%', translateY: '0', delay: '3000'}
//     ],
//     duration: 3000,
//     loop: true,
//     // direction: "alternate"
// });

///////////////////////////////////////////

let canvas = anime({
    targets: ".canvas",
    translateY: "100%",
    rotate: 360,
    duration: 2000,
    delay: 700,
    loop: false,
    easing: 'easeInOutSine'
    // direction: "alternate"
});

let photoFrame = anime({
    targets: ".photo-frame",
    keyframes: [
        { width: "10px" },
        { width: "90%" },
        { height: "50%" },
        { translateY: '-40%'}
    ],
    delay: 2500,
    duration: 3000,
    loop: false,
    // direction: "alternate"
});

let text1 = anime({
    targets: ".title",
    translateX: "-100%",
    duration: 1000,
    delay: 5500
})

let text2 = anime({
    targets: ".sub-title",
    translateX: "100%",
    duration: 1000,
    delay: 6000
})

let mainBody = anime({
    targets: "body",
    backgroundColor: "rgb(156, 6, 44)",
    loop: true,
    direction: "alternate",
    duration: 3000
})
