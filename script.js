const initImages = () => {
    const imageTrack = document.getElementById('image-track');
    const imagePaths = ['img/img_1.png', 'img/img_2.png', 'img/img_3.png', 'img/img_4.png', 'img/img_5.png', 'img/img_6.png', 'img/img_7.png'];

    imagePaths.forEach(imagePath => {
        let img = document.createElement('img');
        img.src = imagePath;
        img.className = 'image';
        img.draggable = false;
        imageTrack.appendChild(img);
    });
};

document.addEventListener('DOMContentLoaded', initImages);

const track = document.getElementById("image-track");

const startInteraction = (clientX) => {
    track.dataset.mouseDownAt = clientX;
};

const endInteraction = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.dp = track.dataset.percentage;
};

const moveInteraction = (clientX) => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
        maxDelta = window.innerWidth / 2;
    const sensitivity = 7;
    const percentage = (mouseDelta / maxDelta) * -100 / sensitivity;
    let nextPercentage = parseFloat(track.dataset.dp || 0) + percentage;
    track.dataset.percentage = nextPercentage;

    track.animate ({
        transform: `translate(${nextPercentage}%, -50%)`
    },{duration:1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, {duration:1200, fill: "forwards" });
    }
};

// Mouse Events
window.onmousedown = e => startInteraction(e.clientX);
window.onmouseup = endInteraction;
window.onmousemove = e => moveInteraction(e.clientX);

// Touch Events
window.ontouchstart = e => startInteraction(e.touches[0].clientX);
window.ontouchend = endInteraction;
window.ontouchmove = e => moveInteraction(e.touches[0].clientX);
