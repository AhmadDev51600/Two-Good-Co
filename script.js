
// ------------scroll trigger and locomotive js code---------------
function locomotiveTrigger() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

    
}
locomotiveTrigger()

// ------------nav bar animation -------------------

function navbarAnimation() {
    
    gsap.to("#left-nav svg",{
        transform: "translateY(-100%)",
    scrollTrigger:{
        trigger:"#page1",
        scroller: ".main",
        start: "top 0",
        end : "top -5%",
        scrub:true,
    }
})
gsap.to("#right-nav #links",{
    transform: "translateY(-100%)",
    opacity:0,
    scrollTrigger:{
        trigger:"#page1",
        scroller: ".main",
        start: "top 0",
        end : "top -5%",
        scrub:true,
    }
})

}
navbarAnimation()

// --------------video play button----------------------------

function videoconplaybtn() {
    var vidcon = document.querySelector("#vid-container")
    var play = document.querySelector("#play")

    vidcon.addEventListener("mouseenter", function () {
        gsap.to(play, {
            scale: 1,
            opacity: 1,
        })
    })
    vidcon.addEventListener("mouseleave", function () {
        gsap.to(play, {
            scale: 0,
            opacity: 0,
        })
    })
    vidcon.addEventListener("mousemove", function (dets) {
        gsap.to(play, {
            left: dets.x -50,
            top: dets.y,

        })
    })

}
videoconplaybtn()

// ---------------------heading 1 and vid animation ------------------------

function headinganimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.2

    })
    gsap.from("#page1 #vid-container", {
        scale: 0.8,
        opacity: 0,
        delay: 1.3,
        duration: 0.5,

    })
}
headinganimation() 


// ---------------cursor animaion------------------


  function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x,
        top: dets.y,
      });
    });

    document.querySelectorAll(".product").forEach(function (elem) {
      elem.addEventListener("mouseenter", function () {
        gsap.to("#cursor", {
          transform: "translate(-50%,-50%) scale(1)",
        });
      });
      elem.addEventListener("mouseleave", function () {
        gsap.to("#cursor", {
          transform: "translate(-50%,-50%) scale(0)",
        });
      });
    });
  }
  cursorAnimation();
