/* =====================================================
   ELEMENTS
===================================================== */

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const bgMusic = document.getElementById("bgMusic");

const slides = Array.from(
    document.querySelectorAll(".slide")
);

const slideshow = document.getElementById("slideshow");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideDots = document.getElementById("slideDots");

const devotionalVideo =
    document.getElementById("devotionalVideo");

const petalContainer =
    document.getElementById("petal-container");


/* =====================================================
   CHECK SLIDES
===================================================== */

console.log("Total slides:", slides.length);


/*
   Automatically find the video slide.

   This is better than using:
   const VIDEO_SLIDE = 5;

   because your page currently appears to have
   more than 7 slides.
*/

const VIDEO_SLIDE =
    slides.findIndex(function (slide) {
        return slide.classList.contains("video-slide");
    });


/*
   Final slide is always the last slide.
*/

const FINAL_SLIDE =
    slides.length - 1;


console.log(
    "Video slide index:",
    VIDEO_SLIDE
);

console.log(
    "Final slide index:",
    FINAL_SLIDE
);


/* =====================================================
   VARIABLES
===================================================== */

let currentSlide = 0;

let autoSlideTimer = null;

let slideshowStarted = false;


/* =====================================================
   CREATE DOTS
===================================================== */

if (slideDots) {

    slideDots.innerHTML = "";

    slides.forEach(function (slide, index) {

        const dot =
            document.createElement("button");

        dot.classList.add("dot");

        dot.setAttribute(
            "aria-label",
            "Go to slide " + (index + 1)
        );


        if (index === 0) {

            dot.classList.add("active");

        }


        dot.addEventListener(
            "click",
            function () {

                if (!slideshowStarted) {
                    return;
                }

                goToSlide(index);

            }
        );


        slideDots.appendChild(dot);

    });

}


/* =====================================================
   UPDATE DOTS
===================================================== */

function updateDots() {

    const dots =
        document.querySelectorAll(".dot");


    dots.forEach(function (dot, index) {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* =====================================================
   SHOW SLIDE
===================================================== */

function showSlide(index) {

    slides.forEach(function (slide, i) {

        if (i === index) {

            slide.classList.add("active");

        } else {

            slide.classList.remove("active");

        }

    });


    updateDots();


    /*
       If leaving video slide,
       stop the video.
    */

    if (
        devotionalVideo &&
        index !== VIDEO_SLIDE
    ) {

        devotionalVideo.pause();

    }

}


/* =====================================================
   START VIDEO
===================================================== */

function startVideo() {

    if (!devotionalVideo) {

        console.error(
            "ERROR: #devotionalVideo was not found."
        );

        return;

    }


    console.log(
        "Starting video automatically..."
    );


    /*
       Make sure video is muted.

       Muted autoplay is allowed much more
       reliably on mobile browsers.
    */

    devotionalVideo.muted = true;

    devotionalVideo.setAttribute(
        "muted",
        ""
    );

    devotionalVideo.playsInline = true;

    devotionalVideo.setAttribute(
        "playsinline",
        ""
    );


    /*
       Start from beginning.
    */

    try {

        devotionalVideo.currentTime = 0;

    } catch (error) {

        console.log(
            "Could not reset video:",
            error
        );

    }


    /*
       Play video.
    */

    const playPromise =
        devotionalVideo.play();


    if (playPromise !== undefined) {

        playPromise.then(function () {

            console.log(
                "✓ Video started automatically."
            );

        }).catch(function (error) {

            console.error(
                "✗ Video autoplay failed:",
                error
            );

        });

    }

}


/* =====================================================
   GO TO SLIDE
===================================================== */

function goToSlide(index) {

    if (!slideshowStarted) {
        return;
    }


    /*
       Prevent invalid slide number.
    */

    if (
        index < 0 ||
        index >= slides.length
    ) {

        return;

    }


    /*
       Stop current timer.
    */

    clearInterval(autoSlideTimer);


    /*
       Change current slide.
    */

    currentSlide = index;


    /*
       Display slide.
    */

    showSlide(currentSlide);


    /* =================================================
       VIDEO SLIDE
    ================================================= */

    if (
        VIDEO_SLIDE !== -1 &&
        currentSlide === VIDEO_SLIDE
    ) {

        console.log(
            "✓ Reached video slide."
        );


        clearInterval(autoSlideTimer);


        /*
           Small delay allows the slide to become
           visible before attempting playback.
        */

        setTimeout(function () {

            startVideo();

        }, 100);


        return;

    }


    /* =================================================
       FINAL SLIDE
    ================================================= */

    if (
        currentSlide === FINAL_SLIDE
    ) {

        console.log(
            "✓ Reached final slide."
        );


        clearInterval(autoSlideTimer);

        return;

    }


    /* =================================================
       NORMAL IMAGE SLIDE
    ================================================= */

    startAutoSlide();

}


/* =====================================================
   NEXT SLIDE
===================================================== */

function nextSlide() {

    if (!slideshowStarted) {
        return;
    }


    if (
        currentSlide < FINAL_SLIDE
    ) {

        goToSlide(
            currentSlide + 1
        );

    }

}


/* =====================================================
   PREVIOUS SLIDE
===================================================== */

function previousSlide() {

    if (!slideshowStarted) {
        return;
    }


    if (
        currentSlide > 0
    ) {

        goToSlide(
            currentSlide - 1
        );

    }

}


/* =====================================================
   NEXT BUTTON
===================================================== */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        function () {

            nextSlide();

        }
    );

}


/* =====================================================
   PREVIOUS BUTTON
===================================================== */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        function () {

            previousSlide();

        }
    );

}


/* =====================================================
   AUTOMATIC SLIDESHOW
===================================================== */

function startAutoSlide() {

    /*
       Clear old timer.
    */

    clearInterval(autoSlideTimer);


    /*
       Don't start before Darshan button.
    */

    if (!slideshowStarted) {
        return;
    }


    /*
       Don't start timer on video.
    */

    if (
        VIDEO_SLIDE !== -1 &&
        currentSlide >= VIDEO_SLIDE
    ) {

        return;

    }


    /*
       Don't start timer on final slide.
    */

    if (
        currentSlide >= FINAL_SLIDE
    ) {

        return;

    }


    console.log(
        "Automatic slideshow started."
    );


    /*
       Change every 5 seconds.
    */

    autoSlideTimer = setInterval(
        function () {

            /*
               If final slide reached,
               stop everything.
            */

            if (
                currentSlide >= FINAL_SLIDE
            ) {

                clearInterval(
                    autoSlideTimer
                );

                return;

            }


            /*
               Move to next slide.
            */

            currentSlide++;


            console.log(
                "Changing to slide:",
                currentSlide + 1
            );


            showSlide(
                currentSlide
            );


            /* =========================================
               VIDEO REACHED
            ========================================== */

            if (
                VIDEO_SLIDE !== -1 &&
                currentSlide === VIDEO_SLIDE
            ) {

                console.log(
                    "✓ Video slide reached automatically."
                );


                clearInterval(
                    autoSlideTimer
                );


                /*
                   Give browser a moment to display
                   the video slide.
                */

                setTimeout(function () {

                    startVideo();

                }, 100);


                return;

            }


            /* =========================================
               FINAL SLIDE
            ========================================== */

            if (
                currentSlide === FINAL_SLIDE
            ) {

                clearInterval(
                    autoSlideTimer
                );

                return;

            }

        },
        5000
    );

}


/* =====================================================
   DARSHAN BUTTON
===================================================== */

if (startButton) {

    startButton.addEventListener(
        "click",
        async function () {

            /*
               Prevent multiple clicks.
            */

            if (slideshowStarted) {
                return;
            }


            slideshowStarted = true;


            console.log(
                "✓ Darshan started."
            );


            /* =========================================
               START BACKGROUND MUSIC
            ========================================== */

            if (bgMusic) {

                try {

                    bgMusic.volume = 1.0;

                    await bgMusic.play();


                    console.log(
                        "✓ Background music started."
                    );

                }

                catch (error) {

                    console.log(
                        "Background music could not start:",
                        error
                    );

                }

            }


            /* =========================================
               HIDE START SCREEN
            ========================================== */

            if (startScreen) {

                startScreen.classList.add(
                    "hidden"
                );

            }


            /* =========================================
               START FROM FIRST SLIDE
            ========================================== */

            currentSlide = 0;


            showSlide(
                currentSlide
            );


            /*
               Start 5-second slideshow.
            */

            startAutoSlide();

        }
    );

}


/* =====================================================
   VIDEO EVENTS
===================================================== */

if (devotionalVideo) {


    /*
       Video loaded.
    */

    devotionalVideo.addEventListener(
        "loadeddata",
        function () {

            console.log(
                "✓ video.mp4 loaded successfully."
            );

        }
    );


    /*
       Video started playing.
    */

    devotionalVideo.addEventListener(
        "playing",
        function () {

            console.log(
                "✓ Video is playing."
            );

        }
    );


    /*
       Video failed.
    */

    devotionalVideo.addEventListener(
        "error",
        function () {

            console.error(
                "✗ Could not load video.mp4."
            );

        }
    );


    /*
       Video ended.
    */

    devotionalVideo.addEventListener(
        "ended",
        function () {

            console.log(
                "✓ Video finished."
            );


            clearInterval(
                autoSlideTimer
            );


            /*
               Go directly to final collage.
            */

            currentSlide =
                FINAL_SLIDE;


            showSlide(
                FINAL_SLIDE
            );


            /*
               Keep final slide displayed.
            */

            clearInterval(
                autoSlideTimer
            );

        }
    );

}


/* =====================================================
   SWIPE SUPPORT
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


if (slideshow) {


    slideshow.addEventListener(
        "touchstart",
        function (event) {

            if (!slideshowStarted) {
                return;
            }


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

            if (!slideshowStarted) {
                return;
            }


            touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchEndX - touchStartX;


            /*
               Swipe left = next.
            */

            if (distance < -50) {

                nextSlide();

            }


            /*
               Swipe right = previous.
            */

            else if (distance > 50) {

                previousSlide();

            }

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (!slideshowStarted) {
            return;
        }


        if (
            event.key === "ArrowRight"
        ) {

            nextSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousSlide();

        }

    }
);


/* =====================================================
   INITIAL STATE
===================================================== */

if (slides.length > 0) {

    currentSlide = 0;

    showSlide(0);

}


/*
   IMPORTANT:
   Do NOT call startAutoSlide() here.

   Slideshow starts only after:
   "दर्शनासाठी स्पर्श करा"
*/


/* =====================================================
   ROSE PETALS
===================================================== */

function createPetal() {

    if (!petalContainer) {
        return;
    }


    const petal =
        document.createElement("div");


    petal.classList.add(
        "petal"
    );


    /*
       Random position.
    */

    petal.style.left =
        Math.random() * 100 + "vw";


    /*
       Random size.
    */

    const size =
        Math.random() * 9 + 12;


    petal.style.width =
        size + "px";


    petal.style.height =
        size * 1.45 + "px";


    /*
       Rose colors.
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
       Falling speed.
    */

    const duration =
        Math.random() * 5 + 6;


    petal.style.animationDuration =
        duration + "s";


    /*
       Random delay.
    */

    petal.style.animationDelay =
        Math.random() * 1.5 + "s";


    /*
       Random rotation.
    */

    petal.style.transform =
        `rotate(
            ${Math.random() * 360}deg
        )`;


    /*
       Transparency.
    */

    petal.style.opacity =
        Math.random() * 0.3 + 0.7;


    petalContainer.appendChild(
        petal
    );


    /*
       Remove after animation.
    */

    setTimeout(
        function () {

            petal.remove();

        },
        (duration + 2) * 1000
    );

}


/* =====================================================
   START ROSE PETALS
===================================================== */

setInterval(
    createPetal,
    350
);


for (
    let i = 0;
    i < 18;
    i++
) {

    createPetal();

}