(function () {
  const SHOP_ASSET_VERSION = "20260329-shop-5";
  const dataset = window.KULTIV_SHOP_DATA;
  const store = window.KultivStoreKit;

  if (!dataset || !store) {
    return;
  }

  const seedGrid = document.getElementById("seed-grid");
  const gearGrid = document.getElementById("gear-grid");
  const cartFeedback = document.querySelector("[data-cart-feedback]");

  function productCard(product) {
    const firstVariant = product.variants[0];
    const shopImage = `shopthumbs/${product.image}?v=${SHOP_ASSET_VERSION}`;
    return `
      <article class="catalog-card" data-kind="${product.kind}">
        <a class="catalog-media" href="${product.page}" aria-label="${product.name}" style="--card-image:url('${shopImage}')">
          <img src="${shopImage}" alt="${product.name}" loading="lazy" />
        </a>

        <div class="catalog-meta">
          <div class="catalog-copy">
            <strong><a href="${product.page}">${product.name}</a></strong>
            <span>${product.priceLabel}</span>
          </div>

          <div class="catalog-actions">
            <a class="catalog-link" href="${product.page}">Voir</a>
            <button class="catalog-add" type="button" data-add-to-cart="${product.id}" data-variant-id="${firstVariant.id}" aria-label="Ajouter ${product.name}">
              +
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    if (seedGrid) {
      seedGrid.innerHTML = dataset.seeds.map(productCard).join("");
    }
    if (gearGrid) {
      gearGrid.innerHTML = dataset.gear.map(productCard).join("");
    }
  }

  window.addEventListener("kultiv-cart-change", () => {
    if (cartFeedback && !cartFeedback.textContent) {
      cartFeedback.textContent = "";
    }
  });

  render();
})();
