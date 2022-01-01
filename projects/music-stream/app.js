// Registering Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

console.log('me Load!');

const mainAction = document.querySelector('#main-action');
mainAction.addEventListener('click', mainActionClick);

function mainActionClick(e) {
    e.preventDefault();
    console.log('Main action clicked');

    // fetchAudio();
    // playBasicAudio();
    // sourceOpen();
    playBasicAudio();
}


// type: "audio/mpeg"
// const mediaSource = new MediaSource();
// let audioSrc = URL.createObjectURL(mediaSource);
// const audio = new Audio('audio/eric-skiff-underclocked.mp3');
// mediaSource.addEventListener('sourceopen', sourceOpen, { once: true });

function playBasicAudio() {
    // console.log(audio.src);
    const audio = new Audio('audio/eric-skiff-underclocked.mp3');
    audio.addEventListener('canplay', (e) => {
        console.log('Audio can start, but not sure it will play through.');
        console.log(audio.audioTracks);
        console.log(audio.autoplay);
        console.log(audio.buffered);
        console.log(audio.controller);
        console.log(audio.controlsList);
        console.log(audio.currentSrc);
        console.log(audio.currentTime);
        console.log(audio.defaultMuted);
        console.log(audio.defaultPlaybackRate);
        console.log(audio.duration);
        console.log(audio.networkState);
        audio.play();
    });

    audio.addEventListener('play', (e)=> {
        console.log('PLAYING??');
    })
}

// function sourceOpen() {
//     console.log('invoke sourceOpen');
//     URL.revokeObjectURL(audioSrc); // maybe don't need this
//     const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');

//     fetch('audio/eric-skiff-underclocked.mp3')
//         .then(response => response.arrayBuffer())
//         .then(data => {
//             sourceBuffer.appendBuffer(data);
//         })
// }

// function fetchAudio() {
//     fetch('audio/eric-skiff-underclocked.mp3')
//         .then((response) => {
//             const reader = response.body.getReader();
//             console.log(reader);
//             console.log(response);
//             console.log(response.blob());

//             return new ReadableStream({
//                 async start(controller) {
//                   while (true) {
//                     const { done, value } = await reader.read();
//                     console.log(done);
//                     console.log(value);
//                     console.log(value.byteLength);
          
//                     // When no more data needs to be consumed, break the reading
//                     if (done) {
//                       break;
//                     }
          
//                     // Enqueue the next data chunk into our target stream
//                     controller.enqueue(value);
//                   }
          
//                   // Close the stream
//                   controller.close();
//                   reader.releaseLock();
//                 }
//             })
//         })
//         // .then((readableStream) => {
//         //     console.log(readableStream);
//         // })
// }
