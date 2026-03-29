(function () {
  const PRODUCT_ASSET_VERSION = "20260329-product-2";
  const dataset = window.KULTIV_SHOP_DATA;
  const store = window.KultivStoreKit;

  if (!dataset || !store) {
    return;
  }

  const root = document.getElementById("product-root");
  if (!root) {
    return;
  }

  const slug = root.getAttribute("data-product-slug");
  const product = dataset.findBySlug(slug);

  if (!product) {
    root.innerHTML = `
      <section class="hero">
        <div class="shell">
          <div class="section-card">
            <strong>Produit introuvable</strong>
            <p class="helper">Retourne sur le catalogue pour ouvrir une fiche valide.</p>
            <div class="button-row">
              <a class="button" href="shop.html">Voir le shop</a>
              <a class="button-ghost" href="index3.html">Retour au site</a>
            </div>
          </div>
        </div>
      </section>
    `;
    return;
  }

  function renderVariants() {
    return product.variants
      .map(
        (variant, index) => `
          <label>
            <input
              data-variant-input
              type="radio"
              name="variant"
              value="${variant.id}"
              ${index === 0 ? "checked" : ""}
            />
            <span>${variant.label} · ${dataset.formatPrice(variant.price)}</span>
          </label>
        `
      )
      .join("");
  }

  function renderHighlights() {
    return product.highlights
      .map(
        (item) => `
          <article class="feature-card">
            <strong>${item.title}</strong>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  }

  function renderSpecs() {
    return product.specs
      .map(
        (item) => `
          <article class="spec-card">
            <strong>${item.label}</strong>
            <span>${item.value}</span>
          </article>
        `
      )
      .join("");
  }

  const productImage = `${product.image}?v=${PRODUCT_ASSET_VERSION}`;

  root.innerHTML = `
    <section class="hero">
      <div class="shell">
        <div class="product-hero">
          <div class="product-copy">
            <span class="eyebrow">${product.family}</span>
            <h1>${product.name}</h1>
            <p>${product.lead}</p>
            <div class="tag-list" style="margin-top: 22px;">
              <span class="tag">${product.kind === "seed" ? "Graines de collection" : "Materiel"}</span>
              <span class="tag">${product.priceLabel}</span>
              <span class="tag">${product.summary}</span>
            </div>
          </div>

          <div class="product-visual" style="--product-image:url('${productImage}')">
            <img src="${productImage}" alt="${product.name}" loading="eager" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell product-layout">
        <div class="product-story">
          <div class="section-card">
            <span class="eyebrow">Presentation</span>
            <p style="margin-top: 18px;">${product.story}</p>
          </div>

          <div class="feature-grid">${renderHighlights()}</div>

          <div class="section-card">
            <span class="eyebrow">Pourquoi ce produit</span>
            <p style="margin-top: 18px;">${product.use}</p>
          </div>

          <div class="spec-grid">${renderSpecs()}</div>
        </div>

        <aside class="sticky-card" data-product-root>
          <span class="eyebrow">Acheter</span>
          <div class="product-price-big" id="product-price">${dataset.formatPrice(product.variants[0].price)}</div>
          <p class="helper" style="margin-top: 14px;">Selectionne ton format puis ajoute directement au panier web.</p>

          <div class="variant-list" data-variant-host style="margin-top: 18px;">
            ${renderVariants()}
          </div>

          <div class="button-row" style="margin-top: 20px;">
            <button class="button" type="button" id="product-add" data-add-to-cart="${product.id}" data-variant-id="${product.variants[0].id}">Ajouter au panier</button>
            <a class="button-ghost" href="shop.html">Voir le shop</a>
          </div>

          <div class="feedback" data-cart-feedback style="margin-top: 14px;"></div>
          <p class="helper" style="margin-top: 14px;">Le panier est partage avec le shop web et le checkout sur index3.html.</p>
        </aside>
      </div>
    </section>
  `;

  const priceNode = document.getElementById("product-price");
  const addButton = document.getElementById("product-add");
  const radios = Array.from(root.querySelectorAll("[data-variant-input]"));

  function syncVariant() {
    const active = radios.find((radio) => radio.checked) || radios[0];
    const variant = dataset.findById(product.id)?.variants.find((entry) => entry.id === active.value) || product.variants[0];
    priceNode.textContent = dataset.formatPrice(variant.price);
    addButton.setAttribute("data-variant-id", variant.id);
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", syncVariant);
  });

  syncVariant();
})();
