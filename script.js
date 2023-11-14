const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.dp = track.dataset.percentage; // Update dp to maintain continuity
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
    const sensitivity = 7;
    const percentage = (mouseDelta / maxDelta) * -100 / sensitivity;
    let nextPercentage = parseFloat(track.dataset.dp || 0) + percentage; // Ensure cumulative movement
    track.dataset.percentage = nextPercentage;

    track.animate ({
        transform: `translate(${nextPercentage}%, -50%)`
    },{duration:1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, {duration:1200, fill: "forwards" });
    }
}
