/* =========================================
   WELCOME SCREEN + MUSIC
========================================= */

const startScreen =
    document.getElementById("startScreen");

const startButton =
    document.getElementById("startButton");

const bgMusic =
    document.getElementById("bgMusic");


if (startButton && bgMusic) {

    startButton.addEventListener(
        "click",
        async function () {

            try {

                bgMusic.volume = 1.0;

                await bgMusic.play();

                console.log(
                    "Background music started."
                );

            } catch (error) {

                console.error(
                    "Music could not start:",
                    error
                );

            }


            if (startScreen) {

                startScreen.classList.add(
                    "hidden"
                );

            }

        }
    );

}



/* =========================================
   SLIDESHOW ELEMENTS
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

const devotionalVideo =
    document.getElementById(
        "devotionalVideo"
    );


let currentSlide = 0;

let autoSlideTimer = null;



/* =========================================
   IMPORTANT SLIDE NUMBERS
========================================= */

/*
   Slide 0 = Ram
   Slide 1 = Ganapati
   Slide 2 = 1.jpeg
   Slide 3 = 2.jpeg
   Slide 4 = 3.jpeg
   Slide 5 = Video
   Slide 6 = Final collage
*/

const VIDEO_SLIDE = 5;

const FINAL_SLIDE = 6;



/* =========================================
   CREATE DOTS
========================================= */

slides.forEach(
    function (slide, index) {

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
            function () {

                goToSlide(index);

            }
        );


        slideDots.appendChild(dot);

    }
);



/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    slides.forEach(
        function (slide, i) {

            slide.classList.toggle(
                "active",
                i === index
            );

        }
    );


    const dots =
        document.querySelectorAll(".dot");


    dots.forEach(
        function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index
            );

        }
    );


    /*
       Stop video when we leave
       the video slide.
    */

    if (
        devotionalVideo &&
        index !== VIDEO_SLIDE
    ) {

        devotionalVideo.pause();

    }

}



/* =========================================
   GO TO SLIDE
========================================= */

function goToSlide(index) {

    if (
        index < 0 ||
        index >= slides.length
    ) {

        return;

    }


    /*
       Stop current timer first.
    */

    clearInterval(
        autoSlideTimer
    );


    currentSlide = index;


    showSlide(currentSlide);



    /* =====================================
       VIDEO SLIDE
    ====================================== */

    if (
        currentSlide === VIDEO_SLIDE
    ) {

        /*
           Start video from beginning.
        */

        if (devotionalVideo) {

            devotionalVideo.currentTime = 0;


            /*
               Try autoplay.
               Browser may block it.
            */

            devotionalVideo.play().catch(
                function () {

                    console.log(
                        "Video autoplay blocked. Press play."
                    );

                }
            );

        }


        /*
           VERY IMPORTANT:
           No 5-second timer here.
        */

        return;

    }



    /* =====================================
       FINAL COLLAGE
    ====================================== */

    if (
        currentSlide === FINAL_SLIDE
    ) {

        /*
           Stop everything.
        */

        clearInterval(
            autoSlideTimer
        );

        return;

    }



    /* =====================================
       NORMAL IMAGE SLIDES
    ====================================== */

    startAutoSlide();

}



/* =========================================
   NEXT SLIDE
========================================= */

function nextSlide() {

    if (
        currentSlide <
        FINAL_SLIDE
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
   5 SECOND IMAGE SLIDESHOW
========================================= */

function startAutoSlide() {

    clearInterval(
        autoSlideTimer
    );


    /*
       Do not start timer on video
       or final collage.
    */

    if (
        currentSlide >= VIDEO_SLIDE
    ) {

        return;

    }


    autoSlideTimer =
        setInterval(
            function () {

                /*
                   If we reach the image
                   before video, go to video.
                */

                if (
                    currentSlide <
                    VIDEO_SLIDE
                ) {

                    currentSlide++;

                    showSlide(
                        currentSlide
                    );


                    /*
                       If video has appeared,
                       stop the timer.
                    */

                    if (
                        currentSlide ===
                        VIDEO_SLIDE
                    ) {

                        clearInterval(
                            autoSlideTimer
                        );


                        /*
                           Start video.
                        */

                        if (
                            devotionalVideo
                        ) {

                            devotionalVideo
                                .currentTime = 0;

                            devotionalVideo
                                .play()
                                .catch(
                                    function () {

                                        console.log(
                                            "Press play to start video."
                                        );

                                    }
                                );

                        }

                    }

                }

            },
            5000
        );

}



/* =========================================
   VIDEO ENDED
========================================= */

if (devotionalVideo) {

    devotionalVideo.addEventListener(
        "ended",
        function () {

            console.log(
                "Video finished."
            );


            /*
               Go to final collage
               after complete video.
            */

            currentSlide =
                FINAL_SLIDE;


            showSlide(
                FINAL_SLIDE
            );


            /*
               Make sure slideshow
               stays stopped.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}



/* =========================================
   VIDEO PLAY
========================================= */

if (devotionalVideo) {

    devotionalVideo.addEventListener(
        "play",
        function () {

            /*
               Never allow the 5-second
               timer to interfere with video.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}



/* =========================================
   VIDEO PAUSE
========================================= */

if (devotionalVideo) {

    devotionalVideo.addEventListener(
        "pause",
        function () {

            /*
               Keep slideshow stopped
               while video is paused.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}



/* =========================================
   TOUCH / SWIPE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


if (slideshow) {

    slideshow.addEventListener(
        "touchstart",
        function (event) {

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
        function (event) {

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



/* =========================================
   HANDLE SWIPE
========================================= */

function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    if (swipeDistance < -50) {

        nextSlide();

    }


    else if (swipeDistance > 50) {

        previousSlide();

    }

}



/* =========================================
   KEYBOARD ARROWS
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight"
        ) {

            nextSlide();

        }


        else if (
            event.key === "ArrowLeft"
        ) {

            previousSlide();

        }

    }
);



/* =========================================
   INITIALIZE
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


    /*
       Random position
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
       Rose colors
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
       Falling speed
    */

    const duration =
        Math.random() * 5 + 6;


    petal.style.animationDuration =
        duration + "s";


    petal.style.animationDelay =
        Math.random() * 1.5 + "s";


    /*
       Rotation
    */

    petal.style.transform =
        `rotate(
            ${Math.random() * 360}deg
        )`;


    petal.style.opacity =
        Math.random() * 0.3 + 0.7;


    petalContainer.appendChild(
        petal
    );


    /*
       Remove after animation
    */

    setTimeout(
        function () {

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