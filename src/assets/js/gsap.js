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
    scale: 0.9,
    scrollTrigger: {
        trigger: '#loading-video-layer',
        start: "25%",
        scrub: true,
        markers: false
    }
});

gsap.from('.slide', {
    opacity:0,
    duration: 0.7,
    autoAplha: 0,
    y: 100,
    stagger: 0.1,
    ease: "power3.out",

    scrollTrigger: {
        trigger: '#loading-video',
        start: "20%",
        restart: true,
        markers: false
    }
})

gsap.from('.slide2', {
    opacity:0,
    duration: 0.7,
    autoAplha: 0,
    y: 100,
    stagger: 0.1,
    ease: "power3.out",

    scrollTrigger: {
        trigger: '.slide2',
        start: "top 90%",
        restart: true,
        markers: false
    }
})

gsap.from('.slide3', {
    opacity:0,
    duration: 0.7,
    autoAplha: 0,
    y: 100,
    stagger: 0.1,
    ease: "power3.out",

    scrollTrigger: {
        trigger: '.slide3',
        start: "top 90%",
        restart: true,
        markers: false
    }
})

gsap.from('.slide4', {
    opacity:0,
    duration: 0.7,
    autoAplha: 0,
    y: 100,
    stagger: 0.1,
    ease: "power3.out",

    scrollTrigger: {
        trigger: '.slide4',
        start: "top 90%",
        restart: true,
        markers: true
    }
})

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

ScrollTrigger.create({
  trigger: "#tritonyVideo",
  start: "bottom center",
//   once: true,
  onEnter: () => {
    document.getElementById('tritonyVideo').play();
  }
});

// Smooth hover scale effect for plan image using jQuery and GSAP
$('img[src="assets/img/plan.png"]').hover(
  function() {
    // On mouse enter
    gsap.to(this, {
      scale: 2,
      duration: 0.6,
      ease: "power2.out"
    });
  },
  function() {
    // On mouse leave
    gsap.to(this, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  }
);

gsap.from('.slide5', {
    opacity:0,
    duration: 0.7,
    autoAplha: 0,
    y: 100,
    stagger: 0.1,
    ease: "power3.out",
 
    scrollTrigger: {
        trigger: '.slide5',
        start: "20%",
        restart: true,
        markers: false
    }
})

// gsap.from('.slide6', {
//     opacity: 0,
//     duration: 0.7,
//     autoAlpha: 0,
//     y: 100,  // Utilisez 'x' au lieu de 'y' pour un mouvement horizontal
//     ease: "power3.out",
 
//     scrollTrigger: {
//         trigger: '.slide6',
//         start: "left center",  // Position horizontale de départ

//         horizontal: true,      // Active le mode horizontal
//         scrub: true,          // Lie l'animation au scroll (optionnel)
//         markers: true,
//     }
// })


gsap.from('.slide6', {
    opacity:0,
    duration: 0.7,
    // autoAplha: 0,
    y: 100,
    stagger: 0.1,
    ease: "power3.out",
 
    scrollTrigger: {
        trigger: '.slide6',
        start: "20%",
        restart: true,
        markers: true
    }
})