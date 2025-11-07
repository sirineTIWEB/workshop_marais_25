import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";
import { ScrollSmoother } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js/+esm";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    // latence comparé au réel smooth
    smooth: 1.5,
    // parallax
    effects: true,
    // adaptation mobile
    smoothTouch: 0.1
});

// Video fade out and scale down effect
gsap.to('#loading-video-layer', {
    opacity: 0.3,
    scale: 0.8,
    scrollTrigger: {
        trigger: '#loading-video-layer',
        start: "25%",
        scrub: true,
        markers: true
    }
});

// gsap.to('#loading-video-layer', {
//     scale: 0.94,
//     ease: "power2.inOut",
//     scrollTrigger: {
//         trigger: '#loading-video-layer',
//         start: "center 45%",
//         scrub: true,
//         markers: false
//     }
// });

// First vertical section fades in as video fades out
// gsap.from('.head', {
//     // ease: "power4.inOut",
//     opacity: 1,
//     scrollTrigger: {
//         trigger: '#loading-video-layer',
//         start: "center 45%",
//         scrub: true,
//         markers: false
//     }
// });


gsap.to(".parent-horz", {
    // negative (bcs from left) la largeur total avec les enfants minus le window vp
    x: () => -(document.querySelector('.parent-horz').scrollWidth - window.innerWidth),
    scrollTrigger: {
        trigger: ".parent-horz",
        // 1st value = element , 2nd value = vwpt -> top of the element reach top of vp
        start: "top top",
        end: () => `+=${document.querySelector('.parent-horz').scrollWidth}`,
        // scrub = scrollable
        scrub: true,
        pin: true
    }
});


ScrollTrigger.create({
  trigger: "#progressbar",
  pin: "#progressbar",
  pinSpacing: false,
  start: "top top",
  end: () => `${document.querySelector('.footer').offsetTop}`,
  markers: false // Pour débugger, vous pouvez l'enlever après
});