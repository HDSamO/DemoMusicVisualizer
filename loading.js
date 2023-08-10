window.addEventListener('load', () => {
    const loadingScreen = document.getElementById("loading")
    const loadingTimeline = gsap.timeline({repeat:-1, yoyo: true});
    loadingTimeline.from(".circle", {duration: 1, opacity: 0, y: "random(-150,150)", stagger: 0.25});
    loadingTimeline.to(".circle", {duration: 1, opacity: 0, x: 100});
    loadingTimeline.to("#loading", { opacity: 0, duration: 0.5
        , onComplete: () => {
      loadingScreen.remove();
    }

  });
  gsap.to(".combo", {duration: 0.1,  x: "-100vw", zIndex:0});

});