// Vue.js App
const app = Vue.createApp({
  data() {
    return {
      // sourdough
      sourdoughPrice: 15.0,
      halfSourdoughPrice: 8.0,
      // specialty bread
      specialtyBreadPrice: 18.0,
      halfSpecialtyBreadPrice: 10.0,
      // misc
      sourDiscardMiscPrice: 3.0,
      packSourDiscardMiscPrice: 5.0,
      // starter
      starterKitPrice: 12.0,
      // about section
      isHidden: false,
      storyText:
        "Small batch sourdough baked fresh every morning. Crafted with organic flour, water, salt, and time.",
    };
  },
  methods: {
    learnMore() {
      this.storyText =
        "Hello, my name is Brigitta. Baking has always had a special place in my heart. Lately my focus has been bread, especially sourdough, for 2 reasons. Growing up my grandma would always bake fresh bread and other sourdough treats that don't raise my mom's blood sugar (she is diabetic). I named my starter Crystal, hence the name Crystal's Sourdough. I hope you all love my bread as much as I do!";
      this.isHidden = true;
      if (window.jQuery) {
        $("#learnMoreBtn").hide();
      }
    },
  },
});

// Mount the Vue app to the body element
app.mount("body");

// Back to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 50) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
