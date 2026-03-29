(function () {
  const CART_KEY = "kultiv_web_cart_v1";
  const SHIPPING_KEY = "kultiv_web_shipping_v1";

  function safeParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function getDataset() {
    return window.KULTIV_SHOP_DATA || null;
  }

  function loadCart() {
    const cart = safeParse(localStorage.getItem(CART_KEY), []);
    return Array.isArray(cart) ? cart.filter((item) => item && item.productId && item.variantId) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    notify(cart);
  }

  function loadShippingInfo() {
    const fallback = { address: "", city: "", postalCode: "", country: "" };
    const info = safeParse(localStorage.getItem(SHIPPING_KEY), fallback);
    return info && typeof info === "object" ? { ...fallback, ...info } : fallback;
  }

  function saveShippingInfo(info) {
    localStorage.setItem(SHIPPING_KEY, JSON.stringify({ ...loadShippingInfo(), ...info }));
  }

  function getProduct(productId) {
    const dataset = getDataset();
    return dataset ? dataset.findById(productId) : null;
  }

  function getVariant(product, variantId) {
    if (!product || !Array.isArray(product.variants) || !product.variants.length) {
      return null;
    }
    return product.variants.find((variant) => variant.id === variantId) || product.variants[0];
  }

  function getDefaultVariantId(product) {
    return Array.isArray(product?.variants) && product.variants.length ? product.variants[0].id : "default";
  }

  function buildCartItem(productId, variantId, qty) {
    const product = getProduct(productId);
    if (!product) {
      return null;
    }
    const variant = getVariant(product, variantId);
    if (!variant) {
      return null;
    }

    return {
      key: `${product.id}:${variant.id}`,
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      image: product.image,
      qty: Math.max(1, Number(qty) || 1),
      optionLabel: variant.label,
      unitPrice: Number(variant.price) || 0,
      totalPrice: (Number(variant.price) || 0) * Math.max(1, Number(qty) || 1),
      kind: product.kind,
      slug: product.slug,
      page: product.page,
    };
  }

  function addToCart(productId, variantId, qty = 1) {
    const product = getProduct(productId);
    if (!product) {
      return null;
    }

    const finalVariantId = variantId || getDefaultVariantId(product);
    const nextCart = loadCart();
    const key = `${productId}:${finalVariantId}`;
    const existing = nextCart.find((item) => item.key === key);

    if (existing) {
      existing.qty += Math.max(1, Number(qty) || 1);
      existing.totalPrice = existing.qty * existing.unitPrice;
    } else {
      const item = buildCartItem(productId, finalVariantId, qty);
      if (!item) {
        return null;
      }
      nextCart.push(item);
    }

    saveCart(nextCart);
    return nextCart.find((item) => item.key === key) || null;
  }

  function setQty(key, qty) {
    const nextQty = Math.max(1, Number(qty) || 1);
    const cart = loadCart().map((item) => {
      if (item.key !== key) {
        return item;
      }
      return {
        ...item,
        qty: nextQty,
        totalPrice: nextQty * (Number(item.unitPrice) || 0),
      };
    });
    saveCart(cart);
  }

  function removeFromCart(key) {
    const cart = loadCart().filter((item) => item.key !== key);
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartSummary() {
    const cart = loadCart();
    const count = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    const total = cart.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);
    return { cart, count, total };
  }

  function renderBadges() {
    const summary = getCartSummary();
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = String(summary.count);
    });
    document.querySelectorAll("[data-cart-total]").forEach((node) => {
      node.textContent = (window.KULTIV_SHOP_DATA && window.KULTIV_SHOP_DATA.formatPrice(summary.total)) || `${summary.total} EUR`;
    });
  }

  function notify(cart) {
    renderBadges();
    window.dispatchEvent(
      new CustomEvent("kultiv-cart-change", {
        detail: {
          cart,
          summary: getCartSummary(),
        },
      })
    );
  }

  function bindGlobalAddButtons() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-add-to-cart]");
      if (!button) {
        return;
      }

      const productId = button.getAttribute("data-add-to-cart");
      const variantId =
        button.getAttribute("data-variant-id") ||
        button.closest("[data-variant-host]")?.querySelector("[data-variant-input]:checked")?.value ||
        button.closest("[data-product-root]")?.querySelector("[data-variant-input]:checked")?.value ||
        "";

      const added = addToCart(productId, variantId, 1);
      if (!added) {
        return;
      }

      const target = document.querySelector("[data-cart-feedback]");
      if (target) {
        target.textContent = `${added.name} ajoute au panier`;
        window.setTimeout(() => {
          if (target.textContent === `${added.name} ajoute au panier`) {
            target.textContent = "";
          }
        }, 2200);
      }
    });
  }

  bindGlobalAddButtons();
  renderBadges();

  window.KultivStoreKit = {
    CART_KEY,
    SHIPPING_KEY,
    loadCart,
    saveCart,
    loadShippingInfo,
    saveShippingInfo,
    getProduct,
    getVariant,
    getDefaultVariantId,
    buildCartItem,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    getCartSummary,
    renderBadges,
  };
})();
