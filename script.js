/* =========================================
   START SCREEN + MUSIC
========================================= */

const startScreen =
    document.getElementById("startScreen");

const startButton =
    document.getElementById("startButton");

const bgMusic =
    document.getElementById("bgMusic");


/*
   The visitor reaches this page by scanning
   the QR code.

   The first tap starts the music.
   There is NO mute button.
*/

if (startButton && bgMusic) {

    startButton.addEventListener("click", async () => {

        try {

            /*
               Start music after user's tap.
               This is allowed by mobile browsers.
            */

            bgMusic.volume = 1.0;

            await bgMusic.play();

            console.log(
                "Devotional music started."
            );


            /*
               Hide the starting screen
            */

            if (startScreen) {

                startScreen.classList.add(
                    "hidden"
                );

            }

        }

        catch (error) {

            console.error(
                "Audio could not start:",
                error
            );

            /*
               Even if audio fails,
               continue to the webpage.
            */

            if (startScreen) {

                startScreen.classList.add(
                    "hidden"
                );

            }

        }

    });

}


/* =========================================
   SLIDESHOW
========================================= */

const slides =
    document.querySelectorAll(".slide");

const slideshow =
    document.getElementById("slideshow");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const slideDots =
    document.getElementById("slideDots");


let currentSlide = 0;

let autoSlideTimer;


/* =========================================
   CREATE DOTS
========================================= */

slides.forEach((slide, index) => {

    const dot =
        document.createElement("button");

    dot.classList.add("dot");

    dot.setAttribute(
        "aria-label",
        `Go to slide ${index + 1}`
    );


    if (index === 0) {

        dot.classList.add("active");

    }


    dot.addEventListener(
        "click",
        () => {

            currentSlide = index;

            showSlide(currentSlide);


            /*
               Continue autoplay unless
               final collage is selected.
            */

            if (
                currentSlide <
                slides.length - 1
            ) {

                resetAutoSlide();

            }

            else {

                clearInterval(
                    autoSlideTimer
                );

            }

        }
    );


    slideDots.appendChild(dot);

});


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    slides.forEach(
        (slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        }
    );


    const dots =
        document.querySelectorAll(".dot");


    dots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        }
    );

}


/* =========================================
   NEXT SLIDE
========================================= */

function nextSlide() {

    if (
        currentSlide <
        slides.length - 1
    ) {

        currentSlide++;

        showSlide(currentSlide);


        /*
           Stop at final collage
        */

        if (
            currentSlide ===
            slides.length - 1
        ) {

            clearInterval(
                autoSlideTimer
            );

        }

    }

}


/* =========================================
   PREVIOUS SLIDE
========================================= */

function previousSlide() {

    if (currentSlide > 0) {

        currentSlide--;

        showSlide(currentSlide);


        /*
           If we return from final slide,
           start autoplay again.
        */

        if (
            currentSlide <
            slides.length - 1
        ) {

            resetAutoSlide();

        }

    }

}


/* =========================================
   NEXT BUTTON
========================================= */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            nextSlide();


            if (
                currentSlide <
                slides.length - 1
            ) {

                resetAutoSlide();

            }

        }
    );

}


/* =========================================
   PREVIOUS BUTTON
========================================= */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        () => {

            previousSlide();

        }
    );

}


/* =========================================
   AUTO SLIDE
   5 SECONDS
========================================= */

function startAutoSlide() {

    clearInterval(
        autoSlideTimer
    );


    autoSlideTimer =
        setInterval(
            () => {

                if (
                    currentSlide >=
                    slides.length - 1
                ) {

                    clearInterval(
                        autoSlideTimer
                    );

                    return;

                }


                nextSlide();

            },
            5000
        );

}


/* =========================================
   RESET AUTO SLIDE
========================================= */

function resetAutoSlide() {

    clearInterval(
        autoSlideTimer
    );


    if (
        currentSlide <
        slides.length - 1
    ) {

        startAutoSlide();

    }

}


/* =========================================
   TOUCH SWIPE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


if (slideshow) {

    slideshow.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    slideshow.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );

}


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    /*
       Swipe left = next
    */

    if (swipeDistance < -50) {

        nextSlide();


        if (
            currentSlide <
            slides.length - 1
        ) {

            resetAutoSlide();

        }

    }


    /*
       Swipe right = previous
    */

    else if (swipeDistance > 50) {

        previousSlide();

    }

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight"
        ) {

            nextSlide();


            if (
                currentSlide <
                slides.length - 1
            ) {

                resetAutoSlide();

            }

        }


        else if (
            event.key === "ArrowLeft"
        ) {

            previousSlide();

        }

    }
);


/* =========================================
   INITIALIZE SLIDESHOW
========================================= */

showSlide(0);

startAutoSlide();


/* =========================================
   ROSE PETALS
========================================= */

const petalContainer =
    document.getElementById(
        "petal-container"
    );


function createPetal() {

    if (!petalContainer) return;


    const petal =
        document.createElement("div");


    petal.classList.add(
        "petal"
    );


    /*
       Random horizontal position
    */

    petal.style.left =
        Math.random() * 100 + "vw";


    /*
       Random size
    */

    const size =
        Math.random() * 9 + 12;


    petal.style.width =
        size + "px";

    petal.style.height =
        size * 1.45 + "px";


    /*
       Rose colours
    */

    const roseColors = [

        `radial-gradient(
            ellipse at 35% 25%,
            #ffd0da 0%,
            #ed6b88 35%,
            #c72e52 75%,
            #8d1638 100%
        )`,

        `radial-gradient(
            ellipse at 35% 25%,
            #ffc0cf 0%,
            #e84f72 40%,
            #b51f48 75%,
            #78102e 100%
        )`,

        `radial-gradient(
            ellipse at 35% 25%,
            #ffd8df 0%,
            #f07891 35%,
            #d33a5b 70%,
            #951735 100%
        )`

    ];


    petal.style.background =
        roseColors[
            Math.floor(
                Math.random() *
                roseColors.length
            )
        ];


    /*
       Random falling speed
    */

    const duration =
        Math.random() * 5 + 6;


    petal.style.animationDuration =
        duration + "s";


    /*
       Random delay
    */

    petal.style.animationDelay =
        Math.random() * 1.5 + "s";


    /*
       Random starting rotation
    */

    petal.style.transform =
        `rotate(
            ${Math.random() * 360}deg
        )`;


    /*
       Random transparency
    */

    petal.style.opacity =
        Math.random() * 0.3 + 0.7;


    petalContainer.appendChild(
        petal
    );


    /*
       Remove after animation
    */

    setTimeout(
        () => {

            petal.remove();

        },
        (duration + 2) * 1000
    );

}


/* =========================================
   CONTINUOUS PETALS
========================================= */

setInterval(
    createPetal,
    350
);


/* Initial petals */

for (
    let i = 0;
    i < 18;
    i++
) {

    createPetal();

}