import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

let lastScrollY = 0;
let ticking = false;

ScrollTrigger.create({
  onUpdate: (self) => {
    const currentScrollY = self.scroll();
    const scrollDiff = currentScrollY - lastScrollY;

    // Only trigger if scroll difference is significant (more responsive)
    if (Math.abs(scrollDiff) > 5) {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Scrolling down - hide navbar
          if (scrollDiff > 0 && currentScrollY > 50) {
            gsap.to(".navbar", {
              y: "-100%",
              duration: 0.2,
              ease: "power1.inOut"
            });
          }
          // Scrolling up - show navbar
          else if (scrollDiff < 0) {
            gsap.to(".navbar", {
              y: 0,
              duration: 0.2,
              ease: "power1.inOut"
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    lastScrollY = currentScrollY;
  }
});
