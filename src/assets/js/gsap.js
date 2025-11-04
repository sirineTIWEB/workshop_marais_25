import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

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
