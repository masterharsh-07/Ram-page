/* =========================================
   WELCOME SCREEN + BACKGROUND MUSIC
========================================= */

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const bgMusic = document.getElementById("bgMusic");

if (startButton && bgMusic) {

    startButton.addEventListener("click", async function () {

        try {
            bgMusic.volume = 1.0;
            await bgMusic.play();

            console.log("Background music started.");

        } catch (error) {
            console.error("Music could not start:", error);
        }

        if (startScreen) {
            startScreen.classList.add("hidden");
        }

    });

}



/* =========================================
   SLIDESHOW ELEMENTS
========================================= */

const slides = document.querySelectorAll(".slide");
const slideshow = document.getElementById("slideshow");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideDots = document.getElementById("slideDots");

const devotionalVideo =
    document.getElementById("devotionalVideo");

let currentSlide = 0;
let autoSlideTimer = null;



/* =========================================
   CREATE SLIDE DOTS
========================================= */

slides.forEach(function (slide, index) {

    const dot = document.createElement("button");

    dot.classList.add("dot");

    dot.setAttribute(
        "aria-label",
        `Go to slide ${index + 1}`
    );

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", function () {

        goToSlide(index);

    });

    slideDots.appendChild(dot);

});



/* =========================================
   SHOW CURRENT SLIDE
========================================= */

function showSlide(index) {

    slides.forEach(function (slide, i) {

        slide.classList.toggle(
            "active",
            i === index
        );

    });


    /* Update dots */

    const dots =
        document.querySelectorAll(".dot");

    dots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === index
        );

    });


    /*
       Stop video if we move away
       from the video slide.
    */

    if (
        devotionalVideo &&
        !slides[index].contains(devotionalVideo)
    ) {

        devotionalVideo.pause();

    }

}



/* =========================================
   GO TO A PARTICULAR SLIDE
========================================= */

function goToSlide(index) {

    if (
        index < 0 ||
        index >= slides.length
    ) {
        return;
    }


    /* Clear any existing timer */

    clearInterval(autoSlideTimer);


    currentSlide = index;

    showSlide(currentSlide);



    /*
       =====================================
       VIDEO SLIDE
       =====================================

       The normal 5-second slideshow
       does NOT run while the video
       is displayed.
    */

    if (
        devotionalVideo &&
        slides[currentSlide].contains(
            devotionalVideo
        )
    ) {

        /*
           Start video from beginning
        */

        devotionalVideo.currentTime = 0;


        /*
           Try to play automatically.
           Mobile browsers may block
           autoplay.
        */

        devotionalVideo.play().catch(
            function () {

                console.log(
                    "Video autoplay blocked. Press the play button."
                );

            }
        );


        /*
           IMPORTANT:
           Do not start the 5-second timer.
        */

        return;
    }



    /*
       =====================================
       FINAL COLLAGE
       =====================================
    */

    if (
        currentSlide ===
        slides.length - 1
    ) {

        /*
           Stop slideshow permanently.
        */

        clearInterval(autoSlideTimer);

        return;
    }



    /*
       =====================================
       NORMAL IMAGE SLIDES
       =====================================
    */

    startAutoSlide();

}



/* =========================================
   NEXT SLIDE
========================================= */

function nextSlide() {

    if (
        currentSlide <
        slides.length - 1
    ) {

        goToSlide(
            currentSlide + 1
        );

    }

}



/* =========================================
   PREVIOUS SLIDE
========================================= */

function previousSlide() {

    if (currentSlide > 0) {

        goToSlide(
            currentSlide - 1
        );

    }

}



/* =========================================
   NEXT BUTTON
========================================= */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        function () {

            nextSlide();

        }
    );

}



/* =========================================
   PREVIOUS BUTTON
========================================= */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        function () {

            previousSlide();

        }
    );

}



/* =========================================
   NORMAL IMAGE AUTO SLIDESHOW
========================================= */

function startAutoSlide() {

    clearInterval(autoSlideTimer);


    autoSlideTimer = setInterval(
        function () {

            /*
               Stop before the video.

               If current slide is the last
               image, do not automatically
               move anywhere.
            */

            if (
                currentSlide >=
                slides.length - 2
            ) {

                clearInterval(
                    autoSlideTimer
                );

                /*
                   Move to video manually
                   only when current image
                   is the image before video.
                */

                if (
                    currentSlide ===
                    slides.length - 3
                ) {

                    goToSlide(
                        currentSlide + 1
                    );

                }

                return;
            }


            /*
               Move to next image
            */

            goToSlide(
                currentSlide + 1
            );

        },
        5000
    );

}



/* =========================================
   VIDEO FINISHED
========================================= */

if (devotionalVideo) {

    devotionalVideo.addEventListener(
        "ended",
        function () {

            console.log(
                "Video finished."
            );


            /*
               After the complete 48-second
               video, show the final collage.
            */

            if (
                currentSlide <
                slides.length - 1
            ) {

                currentSlide++;

                showSlide(currentSlide);

            }


            /*
               Make sure slideshow remains
               stopped at the final collage.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}



/* =========================================
   WHEN VIDEO STARTS PLAYING
========================================= */

if (devotionalVideo) {

    devotionalVideo.addEventListener(
        "play",
        function () {

            /*
               Stop the normal 5-second
               slideshow timer.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}



/* =========================================
   WHEN VIDEO IS PAUSED
========================================= */

if (devotionalVideo) {

    devotionalVideo.addEventListener(
        "pause",
        function () {

            /*
               Do NOT start the image
               slideshow while video is paused.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}



/* =========================================
   TOUCH / SWIPE SUPPORT
========================================= */

let touchStartX = 0;
let touchEndX = 0;


if (slideshow) {

    slideshow.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    slideshow.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );

}



/* =========================================
   HANDLE SWIPE
========================================= */

function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    /*
       Swipe left = next
    */

    if (swipeDistance < -50) {

        nextSlide();

    }


    /*
       Swipe right = previous
    */

    else if (swipeDistance > 50) {

        previousSlide();

    }

}



/* =========================================
   KEYBOARD ARROW SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextSlide();

        }

        else if (
            event.key ===
            "ArrowLeft"
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

    if (!petalContainer) {
        return;
    }


    const petal =
        document.createElement("div");

    petal.classList.add("petal");


    /* Random horizontal position */

    petal.style.left =
        Math.random() * 100 + "vw";


    /* Random size */

    const size =
        Math.random() * 9 + 12;

    petal.style.width =
        size + "px";

    petal.style.height =
        size * 1.45 + "px";


    /* Rose colors */

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


    /* Random falling speed */

    const duration =
        Math.random() * 5 + 6;


    petal.style.animationDuration =
        duration + "s";


    petal.style.animationDelay =
        Math.random() * 1.5 + "s";


    /* Random rotation */

    petal.style.transform =
        `rotate(
            ${Math.random() * 360}deg
        )`;


    petal.style.opacity =
        Math.random() * 0.3 + 0.7;


    petalContainer.appendChild(
        petal
    );


    /* Remove old petal */

    setTimeout(
        function () {

            petal.remove();

        },
        (duration + 2) * 1000
    );

}



/* =========================================
   CONTINUOUS ROSE PETALS
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