import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

// Store the current ScrollTrigger instance
let loadingScrollTrigger = null;

// Loading screen with video - controlled by cookie.js
window.initLoadingScreen = function(isMinimized = false) {

    // Remove existing loading screen if present
    $('#loading-screen-wrapper, #loading-nav').remove();

    // Kill existing ScrollTrigger if present
    if (loadingScrollTrigger) {
        loadingScrollTrigger.kill();
        loadingScrollTrigger = null;
    }

    // Create wrapper section 100vh with overflow hidden on top
    const $wrapper = $(`<section id="loading-screen-wrapper" class="relative h-screen w-full overflow-hidden"></section>`);

    // Layer 1: Video (background) - 60vh or 100vh depending on state
    const videoHeight = isMinimized ? '60vh' : '100vh';
    const $videoLayer = $(`
        <div id="loading-video-layer" class="absolute top-0 left-0 w-full z-10 bg-black" style="height: ${videoHeight};">
            <video
                id="loading-video"
                class="w-full h-full object-cover"
                autoplay
                muted
                loop
                playsinline>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <button id="replay-btn" class="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded transition-opacity duration-300" style="opacity: ${isMinimized ? '1' : '0'}; pointer-events: ${isMinimized ? 'auto' : 'none'};">
                Replay
            </button>
        </div>
    `);

    // Layer 2: Navigation (on top) - fictive for now, hidden initially
    const navOpacity = isMinimized ? '1' : '0';
    const $navLayer = $(`
        <nav id="loading-nav" class="absolute top-0 left-0 w-full z-20 p-4 transition-opacity duration-300" style="opacity: ${navOpacity};">
            <div class="text-white">Navigation ici (fictive)</div>
        </nav>
    `);

    // Assemble layers
    $wrapper.append($videoLayer);
    $wrapper.append($navLayer);

    // Insert before first section
    $('body').prepend($wrapper);

    // Prevent scrolling up beyond top and horizontal scroll
    $('body').css({
        'overflow-x': 'hidden',
        'overflow-y': 'auto'
    });

    // Set initial height using GSAP
    if (isMinimized) {
        gsap.set('#loading-video-layer', { height: '60vh' });
        gsap.set('#loading-nav', { opacity: 1 });
    } else {
        gsap.set('#loading-video-layer', { height: '100vh' });
        gsap.set('#loading-nav', { opacity: 0 });
    }

    // Only create ScrollTrigger animation if not already minimized
    if (!isMinimized) {
        // Animation 1: Video shrinks from 100vh to 60vh
        ScrollTrigger.create({
            trigger: '#loading-video-layer',
            start: 'top top',
            end: '+=500', // Scroll distance needed to complete animation
            scrub: true, // Smooth scrubbing, links animation to scrollbar
            animation: gsap.to('#loading-video-layer', {
                height: '60vh', // Shrink from 100vh to 60vh
            })
        });

        // Animation 2: Nav appears when video bottom is 30vh from viewport bottom
        // When video is at 60vh, its bottom is at 60vh from top = 40vh from bottom
        // We want nav to appear when bottom is at 30vh from bottom
        // So when video shrinks to 70vh (100vh - 30vh)
        loadingScrollTrigger = ScrollTrigger.create({
            trigger: '#loading-video-layer',
            start: 'bottom bottom-=30vh', // When bottom of video is 30vh from bottom of viewport
            end: '+=200', // Short animation duration
            scrub: true,
            animation: gsap.to('#loading-nav', {
                opacity: 1, // Fade in navigation
            })
        });
    }

    // Replay button functionality - expand back to full screen
    $('#replay-btn').on('click', function() {
        // Hide replay button
        $(this).css({
            'opacity': '0',
            'pointer-events': 'none'
        });

        // Kill all ScrollTriggers to allow manual animation
        ScrollTrigger.getAll().forEach(st => st.kill());
        loadingScrollTrigger = null;

        // Animate the video layer back to full screen AND hide nav
        gsap.to('#loading-video-layer', {
            height: '100vh',
            duration: 0.7,
            ease: 'power2.inOut',
        });
        gsap.to('#loading-nav', {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Recreate ScrollTriggers for next interaction
                setTimeout(() => {
                    // Animation 1: Video shrinks
                    ScrollTrigger.create({
                        trigger: '#loading-video-layer',
                        start: 'top top',
                        end: '+=500',
                        scrub: true,
                        animation: gsap.to('#loading-video-layer', {
                            height: '60vh',
                        })
                    });

                    // Animation 2: Nav appears when video bottom is 30vh from bottom
                    loadingScrollTrigger = ScrollTrigger.create({
                        trigger: '#loading-video-layer',
                        start: 'bottom bottom-=30vh',
                        end: '+=200',
                        scrub: true,
                        animation: gsap.to('#loading-nav', {
                            opacity: 1,
                        })
                    });
                }, 500);
            }
        });
    });
};

// Function to show replay button (called from cookie.js)
window.showReplayButton = function() {
    $('#replay-btn').css({
        'opacity': '1',
        'pointer-events': 'auto'
    });
};
