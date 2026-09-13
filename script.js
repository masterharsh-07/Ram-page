/* =========================================
   MUSIC
========================================= */

const startScreen =
    document.getElementById("startScreen");

const startButton =
    document.getElementById("startButton");

const bgMusic =
    document.getElementById("bgMusic");


/*
    Music starts only after the visitor
    interacts with the welcome screen.

    This is necessary because mobile browsers
    normally block sound autoplay.
*/

if (startButton && bgMusic) {

    startButton.addEventListener(
        "click",
        async function () {

            try {

                /*
                    Set volume.
                */

                bgMusic.volume = 1.0;


                /*
                    Start music.
                */

                await bgMusic.play();


                console.log(
                    "Music started successfully."
                );


                /*
                    Hide welcome screen.
                */

                if (startScreen) {

                    startScreen.classList.add(
                        "hidden"
                    );

                }

            }

            catch (error) {

                console.error(
                    "Music could not start:",
                    error
                );


                /*
                    Still open webpage if
                    browser refuses audio.
                */

                if (startScreen) {

                    startScreen.classList.add(
                        "hidden"
                    );

                }

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


/* Current slide */

let currentSlide = 0;


/* Timer */

let autoSlideTimer;


/* =========================================
   CREATE SLIDE DOTS
========================================= */

slides.forEach(
    (slide, index) => {

        const dot =
            document.createElement("button");


        dot.classList.add("dot");


        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );


        /*
            First dot active.
        */

        if (index === 0) {

            dot.classList.add(
                "active"
            );

        }


        /*
            Dot click.
        */

        dot.addEventListener(
            "click",
            function () {

                currentSlide = index;

                showSlide(
                    currentSlide
                );


                /*
                    Continue autoplay if
                    not on final collage.
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

    }
);


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    /*
        Activate selected slide.
    */

    slides.forEach(
        (slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        }
    );


    /*
        Update dots.
    */

    const dots =
        document.querySelectorAll(
            ".dot"
        );


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

    /*
        Don't go beyond final slide.
    */

    if (
        currentSlide <
        slides.length - 1
    ) {

        currentSlide++;

        showSlide(
            currentSlide
        );


        /*
            Stop automatically at
            final Ram + Ganapati collage.
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

        showSlide(
            currentSlide
        );


        /*
            If visitor goes back from
            final collage, autoplay resumes.
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
        function () {

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
        function () {

            previousSlide();

        }
    );

}


/* =========================================
   AUTO SLIDESHOW
========================================= */

function startAutoSlide() {

    clearInterval(
        autoSlideTimer
    );


    autoSlideTimer =
        setInterval(
            function () {

                /*
                    Stop at final collage.
                */

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
   RESET AUTOPLAY
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


/*
    Finger touches screen.
*/

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


    /*
        Finger leaves screen.
    */

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


    /*
        Swipe LEFT
        → Next slide
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
        Swipe RIGHT
        → Previous slide
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
    function (event) {

        /*
            Right arrow
        */

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextSlide();


            if (
                currentSlide <
                slides.length - 1
            ) {

                resetAutoSlide();

            }

        }


        /*
            Left arrow
        */

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


/*
    Create one rose petal.
*/

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
        Random horizontal position.
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
        Different rose shades.
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
        Random falling speed.
    */

    const duration =
        Math.random() * 5 + 6;


    petal.style.animationDuration =
        duration + "s";


    /*
        Random starting delay.
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
        Random transparency.
    */

    petal.style.opacity =
        Math.random() * 0.3 + 0.7;


    /*
        Add petal to page.
    */

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


/* =========================================
   CONTINUOUS PETALS
========================================= */

setInterval(
    createPetal,
    350
);


/*
    Create some petals immediately
    when page opens.
*/

for (
    let i = 0;
    i < 18;
    i++
) {

    createPetal();

}