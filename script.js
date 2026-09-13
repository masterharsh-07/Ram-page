/* =====================================================
   FALLING ROSE PETALS
===================================================== */

const petalContainer =
    document.getElementById("petal-container");


/* Create one rose petal */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.classList.add("petal");


    /* Random horizontal position */

    petal.style.left =
        Math.random() * 100 + "vw";


    /* Random size */

    const size =
        10 + Math.random() * 12;

    petal.style.width =
        size + "px";

    petal.style.height =
        size * 0.65 + "px";


    /* Random animation duration */

    const duration =
        5 + Math.random() * 6;

    petal.style.animationDuration =
        duration + "s";


    /* Random delay */

    petal.style.animationDelay =
        Math.random() * 2 + "s";


    /* Random rotation */

    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;


    /* Add petal */

    petalContainer.appendChild(petal);


    /* Remove after animation */

    setTimeout(() => {

        petal.remove();

    }, (duration + 3) * 1000);
}


/* =====================================================
   CREATE PETALS CONTINUOUSLY
===================================================== */

setInterval(createPetal, 350);


/* Initial petals */

for (let i = 0; i < 18; i++) {

    setTimeout(
        createPetal,
        i * 200
    );
}