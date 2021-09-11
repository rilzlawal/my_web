// Page transition

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
      setTimeout(() => {
          done();
      }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline({defaults:{ duration: .65, ease: "circ.easeInOut", opacity: 0, stagger: {each: .01, from: "start" } }})
  tl.to(".line div", { y: '100%'});  
  tl.to("img", { opacity: 0, y: 15, }, "=-.85");  
}

function contentAnimation() {
  var tl = gsap.timeline({ defaults: {duration: .65, opacity: 0, ease: "circ.easeInOut", stagger: {each: .01, from: "end" } }})
  tl.from("img", { y: 15 });
  tl.from(".line div", { y: '100%' });
}


$(function () {
  barba.init({
      sync: true,
      transitions: [
          {
              async leave(data) {
                  const done = this.async();
                  pageTransition();
                  await delay(2000);
                  done();
              },

              async enter(data) {
                  contentAnimation();
              },

              async once(data) {
                  contentAnimation();
              },
          },
      ],
  });
});

// Mouse effect

var cursor = $(".cursor"), follower = $(".cursor-follower");
var posX = 0, posY = 0;
var mouseX = 0, mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
  
  TweenMax.set(follower, {
      css: {    
      left: posX - 12,
      top: posY - 12
      }
  });
  
  TweenMax.set(cursor, {
      css: {    
      left: mouseX,
      top: mouseY
      }
  });
}
});
