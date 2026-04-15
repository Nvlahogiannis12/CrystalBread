// Vue.js App
const app = Vue.createApp({
  data() {
    return {
      items: [],
      cartCount: 0,
      showCartDot: false,
      // about section
      isHidden: false,
      storyText:
        "Small batch sourdough baked fresh every morning. Crafted with organic flour, water, salt, and time.",
    };
  },
  mounted() {
    const cartModal = document.getElementById("cartModal");
    if (cartModal) {
      cartModal.addEventListener("show.bs.modal", () => {
        this.showCartDot = false;
      });
    }
  },
  created() {
    fetch("items.json")
      .then((response) => response.json())
      .then((data) => {
        this.items = data.map((item, index) => ({
          ...item,
          id: item.name
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-_]/g, ""),
          quantity: 1,
          inCart: 0,
        }));
      })
      .catch((error) => console.error("Error loading JSON:", error));
  },
  computed: {
    cartItems() {
      return this.items.filter((item) => Number(item.inCart) > 0);
    },

    cartItemIds() {
      return this.cartItems.reduce((ids, item) => {
        for (let i = 0; i < Number(item.inCart); i += 1) {
          ids.push(item.id);
        }
        return ids;
      }, []);
    },

    orderSummary() {
      if (this.cartItems.length === 0) return "Cart Empty";

      const items = this.cartItems
        .map((item) => `${item.name} — Quantity: ${item.inCart}`)
        .join("\n");

      return `${items}

Total Items: ${this.cartCount}
Total Price: $${(this.cartCount * 15).toFixed(2)}`;
    },
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
    addToCart(item) {
      const requested = Number(item.quantity) || 1;
      const maxOrder = Number(item.maxOrder) || 1;
      const remaining = maxOrder - (Number(item.inCart) || 0);

      if (remaining <= 0) {
        alert(
          `You already have the maximum amount of ${item.name} in your cart.`,
        );
        return;
      }

      const quantityToAdd = Math.min(requested, remaining);
      this.cartCount += quantityToAdd;
      item.inCart += quantityToAdd;
      item.quantity = Math.min(item.quantity, remaining);

      if (quantityToAdd < requested) {
        alert(
          `Only ${quantityToAdd} more ${item.name} can be added. Maximum ${maxOrder} per order.`,
        );
      }
      //else {
      //   alert(`${quantityToAdd} × ${item.name} added to the cart.`);
      // }

      if (quantityToAdd > 0) {
        this.showCartDot = true;
      }
    },
    removeFromCart(item) {
      if (item.inCart <= 0) {
        return;
      }
      item.inCart -= 1;
      this.cartCount = Math.max(this.cartCount - 1, 0);
    },
    clearCart() {
      this.items.forEach((item) => {
        item.inCart = 0;
      });
      this.cartCount = 0;
      this.showCartDot = false;
    },
  },
});

// Mount the Vue app to the body element
app.mount("body");

// Back to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (!backToTopBtn) {
    return;
  }

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
