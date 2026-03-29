(function () {
  function formatPrice(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(Number(value) || 0);
  }

  const seedPacks = [
    { qty: 1, multiplier: 1 },
    { qty: 2, multiplier: 1.95 },
    { qty: 3, multiplier: 2.85 },
    { qty: 10, multiplier: 9.2 },
    { qty: 20, multiplier: 17.6 },
  ];

  function buildSeedVariants(basePrice) {
    return seedPacks.map((pack) => ({
      id: String(pack.qty),
      label: `${pack.qty} ${pack.qty > 1 ? "graines" : "graine"}`,
      price: Math.round(basePrice * pack.multiplier * 10) / 10,
    }));
  }

  function withDefaults(product) {
    const variants =
      Array.isArray(product.variants) && product.variants.length
        ? product.variants
        : [{ id: "default", label: "Format unique", price: product.price }];
    const minPrice = Math.min(...variants.map((variant) => Number(variant.price) || 0));

    return {
      ...product,
      variants,
      page: `${product.slug}.html`,
      priceLabel: product.kind === "seed" || variants.length > 1 ? `des ${formatPrice(minPrice)}` : formatPrice(minPrice),
      metaTitle: `${product.name} | Le Sobeuhlier`,
      metaDescription: product.lead,
    };
  }

  const products = [
    withDefaults({
      id: "seed-bluedream",
      slug: "blue-dream",
      kind: "seed",
      family: "Graines",
      name: "Blue Dream",
      image: "bluedream.png",
      accent: "#4b83ff",
      initials: "BD",
      price: 4,
      variants: buildSeedVariants(4),
      summary: "Hybride claire, fruitee et facile a aimer des le premier regard.",
      lead: "Blue Dream pose une ambiance douce et lumineuse, avec une lecture simple et tres plaisante en interieur.",
      story:
        "C'est une graine qui donne une sensation d'equilibre. Elle bouge assez pour rester vivante, mais sans rendre la session fatigante a piloter. Son profil fruite et son allure aeree lui donnent tout de suite une place tres facile a aimer dans un catalogue premium.",
      use:
        "On la choisit souvent pour une culture qui veut rester fluide, propre et lisible, avec un rendu elegant sans complications inutiles.",
      highlights: [
        { title: "Profil", text: "Fruit doux, creme legere, sensation tres ronde." },
        { title: "Structure", text: "Silhouette aeree qui reste agreable a suivre." },
        { title: "Session", text: "Parfaite pour une routine souple et claire." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Hybride equilibree et facile a lire" },
        { label: "Point fort", value: "Vibe douce, propre et moderne" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-gsc",
      slug: "girl-scout-cookies",
      kind: "seed",
      family: "Graines",
      name: "Girl Scout Cookies",
      image: "gsc.png",
      accent: "#e09a41",
      initials: "GS",
      price: 4,
      variants: buildSeedVariants(4),
      summary: "Une selection dessert, dense et tres identitaire.",
      lead: "Girl Scout Cookies mise sur un registre sucre plus dense, plus gourmand et tres premium visuellement.",
      story:
        "Elle parle vite a celles et ceux qui aiment les varietes compactes avec une vraie signature. Le rendu est serre, propre, presque luxueux, et pousse naturellement vers un setup soigne.",
      use:
        "Tres bonne candidate si tu veux une graine qui a du style, de la presence et une vraie identite visuelle dans la box.",
      highlights: [
        { title: "Dessert", text: "Registre creme et sucre tres marque." },
        { title: "Format", text: "Structure compacte adaptee aux espaces plus serres." },
        { title: "Look", text: "Finition dense et sensation haut de gamme." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Compacte, gourmande, tres lisible" },
        { label: "Point fort", value: "Rendu dessert immediat" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-og",
      slug: "og-kush",
      kind: "seed",
      family: "Graines",
      name: "OG Kush",
      image: "og.png",
      accent: "#4daa61",
      initials: "OG",
      price: 5.5,
      variants: buildSeedVariants(5.5),
      summary: "Le grand classique kush au caractere net et assume.",
      lead: "OG Kush reste une valeur sure quand on veut un classique direct, stable et parfaitement identifiable.",
      story:
        "Tout dans cette genetique inspire le controle et la reference. Son port plus serre, son identite plus franche et son rendu plus dense en font une base rassurante pour celles et ceux qui veulent aller a l'essentiel.",
      use:
        "A privilegier si tu recherches une culture plus compacte, un style kush pur et une lecture sans ambiguite.",
      highlights: [
        { title: "Origine", text: "Une reference kush qui parle tout de suite." },
        { title: "Port", text: "Gabarit plus compact et bien tenu." },
        { title: "Lecture", text: "Classique, stable et sans bruit autour." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Reference kush, port compact" },
        { label: "Point fort", value: "Classique tres clair" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-white",
      slug: "white-widow",
      kind: "seed",
      family: "Graines",
      name: "White Widow",
      image: "white.png",
      accent: "#a7b3c4",
      initials: "WW",
      price: 5.5,
      variants: buildSeedVariants(5.5),
      summary: "Une icone resineuse qui inspire confiance tres vite.",
      lead: "White Widow reste une grande reference, facile a situer et tres agreable a integrer dans une routine simple.",
      story:
        "Elle garde ce statut de classique parce qu'elle combine une vraie lisibilite de culture et une presence immediate. Elle donne envie de rester sobre dans le setup et de laisser le vegetal prendre la parole.",
      use:
        "Excellent choix si tu veux une valeur connue, equilibree et proprement finie dans une box bien tenue.",
      highlights: [
        { title: "Classique", text: "Une reference qui rassure au premier coup d'oeil." },
        { title: "Rendu", text: "Presence lumineuse et finition resineuse." },
        { title: "Equilibre", text: "Routine simple, lecture intuitive." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Equilibre et clarte de culture" },
        { label: "Point fort", value: "Reference resineuse tres connue" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-lights",
      slug: "northern-lights",
      kind: "seed",
      family: "Graines",
      name: "Northern Lights",
      image: "lights.png",
      accent: "#5d73f5",
      initials: "NL",
      price: 7,
      variants: buildSeedVariants(7),
      summary: "Une vibe calme, reguliere et sereine du debut a la fin.",
      lead: "Northern Lights joue la carte du calme, de la regularite et d'une culture qui respire.",
      story:
        "Elle seduit par son absence de drama. C'est le type de graine qui s'inscrit parfaitement dans une routine propre: peu de complications inutiles, un rythme stable et une sensation de controle tranquille.",
      use:
        "Bonne option si tu veux une session sereine, lisible et facile a tenir sans surcharger ton espace ni ton esprit.",
      highlights: [
        { title: "Ambiance", text: "Registre doux, calme et tres regulier." },
        { title: "Croissance", text: "Lecture simple et progression rassurante." },
        { title: "Routine", text: "Ideale pour une cadence stable." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Calme, reguliere, douce" },
        { label: "Point fort", value: "Session sans friction" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-diesel",
      slug: "sour-diesel",
      kind: "seed",
      family: "Graines",
      name: "Sour Diesel",
      image: "diesel.png",
      accent: "#d95b54",
      initials: "SD",
      price: 7,
      variants: buildSeedVariants(7),
      summary: "Un profil plus vif, plus nerveux et tres expressif.",
      lead: "Sour Diesel apporte plus d'energie, plus de relief et une personnalite olfactive tres nette.",
      story:
        "Elle est interessante quand tu veux sortir des profils trop sages. On sent vite un caractere plus vertical, plus tendu, avec une identite qui imprime toute la session.",
      use:
        "A choisir si tu recherches une genetique qui bouge, qui raconte quelque chose et qui donne du relief au setup.",
      highlights: [
        { title: "Energie", text: "Profil plus nerveux avec vraie tension aromatique." },
        { title: "Allure", text: "Port vivant, plus aerien et plus tendu." },
        { title: "Presence", text: "Une identite qui marque vite la session." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Vif, expressif, plus nerveux" },
        { label: "Point fort", value: "Signature aromatique forte" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-gelato",
      slug: "gelato",
      kind: "seed",
      family: "Graines",
      name: "Gelato",
      image: "gelato.png",
      accent: "#cd78ae",
      initials: "GE",
      price: 9,
      variants: buildSeedVariants(9),
      summary: "Le choix moderne, dessert et tres desire.",
      lead: "Gelato assume un cote contemporain, gourmand et visuellement tres soigne.",
      story:
        "Cette selection parle a celles et ceux qui aiment les hybrides modernes avec un vrai rendu premium. Elle a ce petit luxe discret qui donne envie d'ouvrir la box juste pour le plaisir de regarder.",
      use:
        "Parfaite si tu veux un profil dessert, une allure tres actuelle et une plante qui apporte de la desirabilite au setup.",
      highlights: [
        { title: "Dessert", text: "Registre sucre avec une vraie signature moderne." },
        { title: "Look", text: "Finitions denses et perception premium." },
        { title: "Equilibre", text: "Hybride pense pour plaire vite et fort." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Moderne, gourmande, premium" },
        { label: "Point fort", value: "Look tres soigne" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-haze",
      slug: "amnesia-haze",
      kind: "seed",
      family: "Graines",
      name: "Amnesia Haze",
      image: "haze.png",
      accent: "#57b4ab",
      initials: "AH",
      price: 9,
      variants: buildSeedVariants(9),
      summary: "Une allure plus sativa, plus ouverte et tres lumineuse.",
      lead: "Amnesia Haze ouvre l'espace avec une silhouette plus etiree et une impression de mouvement tres nette.",
      story:
        "Elle seduit quand tu veux une plante qui respire et qui prend sa place. C'est une genetique qui demande de penser hauteur, air et lumiere comme un ensemble coherent.",
      use:
        "A privilegier si tu aimes les sessions plus ouvertes, plus lumineuses, avec un vegetal qui raconte bien son chemin dans le volume.",
      highlights: [
        { title: "Volume", text: "Port elance qui aime respirer." },
        { title: "Lumiere", text: "Tres a l'aise dans un setup clair et ouvert." },
        { title: "Signature", text: "Vraie sensation sativa au premier regard." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Sativa expressive et ouverte" },
        { label: "Point fort", value: "Mouvement visuel fort" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-cake",
      slug: "wedding-cake",
      kind: "seed",
      family: "Graines",
      name: "Wedding Cake",
      image: "cake.png",
      accent: "#b9815b",
      initials: "WC",
      price: 11,
      variants: buildSeedVariants(11),
      summary: "Une variete dessert, dense et presque luxueuse.",
      lead: "Wedding Cake installe une sensation dessert tres dense avec une vraie presence haut de gamme.",
      story:
        "Elle attire par son rendu serre, son style gourmand et cette impression de matiere. C'est une selection qui donne envie d'avoir une box impeccable, presque comme un ecrin.",
      use:
        "Tres interessante si tu veux une variete qui combine desirabilite, densite et un registre plus patissier.",
      highlights: [
        { title: "Profil", text: "Dessert riche avec une vraie finition gateau." },
        { title: "Densite", text: "Construction plus serree et tres visuelle." },
        { title: "Premium", text: "Presence haut de gamme des la lecture." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Dense, dessert, premium" },
        { label: "Point fort", value: "Presence visuelle forte" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "seed-purple",
      slug: "purple-kush",
      kind: "seed",
      family: "Graines",
      name: "Purple Kush",
      image: "purple.png",
      accent: "#8e6df7",
      initials: "PK",
      price: 14,
      variants: buildSeedVariants(14),
      summary: "La touche couleur, ambience et memoire visuelle.",
      lead: "Purple Kush joue la couleur et l'ambiance avec un rendu visuel memorisable et plus enveloppant.",
      story:
        "Elle a ce charme immediat qui transforme la session en objet de contemplation. Quand on cherche une graine plus esthetique, plus ronde et plus memorable au regard, elle apporte un vrai plus.",
      use:
        "A choisir si tu aimes les tons profonds, les profils plus doux et une culture qui mise aussi sur l'emotion visuelle.",
      highlights: [
        { title: "Couleur", text: "Teintes marquees et rendu plus theatrale." },
        { title: "Ambiance", text: "Sensation douce, ronde et enveloppante." },
        { title: "Souvenir", text: "Une variete qui reste en tete visuellement." },
      ],
      specs: [
        { label: "Format", value: "Packs 1, 2, 3, 10 ou 20 graines" },
        { label: "Style", value: "Couleur, douceur, presence visuelle" },
        { label: "Point fort", value: "Impact esthetique fort" },
        { label: "France", value: "Graine de collection" },
      ],
    }),
    withDefaults({
      id: "gear-tapis",
      slug: "tapis-chauffant",
      kind: "gear",
      family: "Materiel",
      name: "Tapis chauffant",
      image: "tapis.png",
      accent: "#d95b54",
      initials: "TC",
      variants: [
        { id: "5w", label: "5W", price: 9.9 },
        { id: "20w", label: "20W", price: 19.9 },
      ],
      summary: "La base thermique simple qui change le debut d'une session.",
      lead: "Un bon depart se joue souvent sous la plante, pas seulement au-dessus d'elle.",
      story:
        "Ce tapis chauffant apporte une base thermique plus stable sous semis, petits pots ou plateaux. Il cree une zone racinaire plus accueillante, surtout quand la piece reste fraiche.",
      use:
        "Petit accessoire, gros impact: il rend un debut de session plus calme, plus regulier et plus facile a lire au quotidien.",
      highlights: [
        { title: "Chaleur", text: "Apport doux et continu sous la base du pot." },
        { title: "Demarrage", text: "Tres utile pour les semis et les lancements." },
        { title: "Simplicite", text: "Mise en place rapide sans setup complexe." },
      ],
      specs: [
        { label: "Puissance", value: "5W ou 20W" },
        { label: "Usage", value: "Semis, petits pots, plateaux" },
        { label: "Style", value: "Souple, discret, facile a poser" },
        { label: "Atout", value: "Stabilise la zone racinaire" },
      ],
    }),
    withDefaults({
      id: "gear-led300",
      slug: "lampe-led-300w",
      kind: "gear",
      family: "Materiel",
      name: "Lampe LED 300W",
      image: "lampe300.png",
      accent: "#d88b38",
      initials: "L3",
      price: 39.9,
      summary: "Le bon compromis entre compacite, puissance utile et simplicite.",
      lead: "La LED 300W vise le bon equilibre pour une petite surface bien pilotee.",
      story:
        "Elle convient parfaitement aux boxes compactes quand on veut une lumiere propre sans partir sur un materiel trop imposant. Elle structure vite la box et pose une sensation serieuse des le premier jour.",
      use:
        "Ideale pour une premiere installation, une petite tente ou un espace qui a besoin d'une rampe claire, pratique et rassurante.",
      highlights: [
        { title: "Eclairage", text: "300W dans un format simple a suspendre." },
        { title: "Surface", text: "Pensee pour petites et moyennes boxes." },
        { title: "Usage", text: "Parfaite pour aller a l'essentiel." },
      ],
      specs: [
        { label: "Puissance", value: "300W" },
        { label: "Spectre", value: "Complet pour usage interieur" },
        { label: "Format", value: "Compact et facile a integrer" },
        { label: "Positionnement", value: "Petites surfaces" },
      ],
    }),
    withDefaults({
      id: "gear-led720",
      slug: "lampe-led-720w",
      kind: "gear",
      family: "Materiel",
      name: "Lampe LED 720W",
      image: "lampe720.png",
      accent: "#f2b44a",
      initials: "L7",
      price: 249.9,
      summary: "La rampe qui donne une presence immediate au setup.",
      lead: "La LED 720W pose un niveau superieur d'intensite et une vraie stature au-dessus de la canopee.",
      story:
        "On est sur une piece pensee pour tenir une surface large et installer un sentiment de puissance maitrisee. C'est la lampe qui structure toute la partie haute de la box et qui donne un rendu beaucoup plus pro.",
      use:
        "A choisir si tu veux couvrir large, garder de la reserve et construire une installation plus ambitieuse sans bricolage.",
      highlights: [
        { title: "Puissance", text: "720W pour une intensite beaucoup plus serieuse." },
        { title: "Couverture", text: "Adaptee aux zones larges et plus exigeantes." },
        { title: "Setup", text: "Ancre tout de suite une box plus premium." },
      ],
      specs: [
        { label: "Puissance", value: "720W" },
        { label: "Surface", value: "Grandes zones et setups ambitieux" },
        { label: "Format", value: "Rampe large, presence premium" },
        { label: "Positionnement", value: "Installation plus avancee" },
      ],
    }),
    withDefaults({
      id: "gear-tente",
      slug: "tente-60x60x120",
      kind: "gear",
      family: "Materiel",
      name: "Tente 60x60x120",
      image: "tente.png",
      accent: "#4b83ff",
      initials: "TE",
      price: 99.9,
      summary: "La base compacte qui transforme vite un coin libre en vrai setup.",
      lead: "Cette tente compacte transforme un petit espace en environnement de culture propre et coherent.",
      story:
        "Son format 60x60x120 cm permet de rester discret, facile a caser et visuellement net. C'est souvent la meilleure facon de poser un cadre stable autour de la lumiere, de l'air et de la routine.",
      use:
        "Parfaite si tu veux une base ordonnee, refermee sur elle-meme, qui aide toute l'installation a rester lisible.",
      highlights: [
        { title: "Format", text: "60x60x120 cm pour un coin compact." },
        { title: "Controle", text: "Permet de mieux gerer air et ambiance." },
        { title: "Base", text: "Vrai point de depart d'un setup propre." },
      ],
      specs: [
        { label: "Dimensions", value: "60 x 60 x 120 cm" },
        { label: "Interieur", value: "Surface reflechissante" },
        { label: "Montage", value: "Rapide et discret" },
        { label: "Positionnement", value: "Formats compacts" },
      ],
    }),
    withDefaults({
      id: "gear-sac",
      slug: "pot-en-sac",
      kind: "gear",
      family: "Materiel",
      name: "Pot en sac",
      image: "sac.png",
      accent: "#9b7a57",
      initials: "PS",
      variants: [
        { id: "18x15", label: "3x 18x15", price: 9.9 },
        { id: "40x35", label: "3x 40x35", price: 19.9 },
      ],
      summary: "Des contenants souples, respirants et tres faciles a vivre.",
      lead: "Les pots en sac apportent une solution legere, respirante et tres simple a integrer dans une box.",
      story:
        "Le textile laisse mieux circuler l'air autour de la zone racinaire et offre une alternative souple aux pots rigides. C'est un choix malin quand on veut quelque chose de leger, simple a deplacer et visuellement propre.",
      use:
        "Bon reflexe si tu cherches un contenant discret, respirant et agreable a manipuler au quotidien.",
      highlights: [
        { title: "Respiration", text: "Texture textile qui laisse mieux respirer la base." },
        { title: "Formats", text: "Deux tailles utiles selon ton volume." },
        { title: "Pratique", text: "Leger, pliable et facile a ranger." },
      ],
      specs: [
        { label: "Formats", value: "3x 18x15 ou 3x 40x35" },
        { label: "Matiere", value: "Textile respirant" },
        { label: "Usage", value: "Culture souple et mobile" },
        { label: "Atout", value: "Leger et simple a vivre" },
      ],
    }),
    withDefaults({
      id: "gear-scrog",
      slug: "scrog-2x5m",
      kind: "gear",
      family: "Materiel",
      name: "SCROG 2x5m",
      image: "scrog.png",
      accent: "#4daa61",
      initials: "SC",
      price: 9.9,
      summary: "Le filet simple qui met de l'ordre dans la canopee.",
      lead: "Le filet SCROG aide a calmer le chaos et a dessiner une canopee beaucoup plus propre.",
      story:
        "C'est un accessoire tres simple, mais il apporte tout de suite plus d'ordre dans la facon dont la plante occupe l'espace. En guidant la hauteur et la repartition, il rend la lecture du dessus bien plus nette.",
      use:
        "Tres utile si tu veux une box mieux organisee, plus plate, plus lisible et plus facile a piloter visuellement.",
      highlights: [
        { title: "Maillage", text: "Organise visuellement la canopee." },
        { title: "Guidage", text: "Repartit mieux les points de croissance." },
        { title: "Lecture", text: "Rend le dessus plus propre et plus clair." },
      ],
      specs: [
        { label: "Taille", value: "2 x 5 m" },
        { label: "Usage", value: "Guidage et repartition de la canopee" },
        { label: "Pose", value: "Souple et simple a decouper" },
        { label: "Atout", value: "Ordre visuel immediat" },
      ],
    }),
    withDefaults({
      id: "gear-thermo",
      slug: "thermometre-numerique",
      kind: "gear",
      family: "Materiel",
      name: "Thermometre numerique",
      image: "the.png",
      accent: "#11a8b9",
      initials: "TH",
      price: 4.9,
      summary: "Le petit outil qui clarifie tout le climat de la box.",
      lead: "Le thermometre numerique est discret, mais il change tout dans la comprehension du climat.",
      story:
        "Avoir une lecture immediate de la temperature, c'est eviter beaucoup de suppositions inutiles. Cet objet accompagne tres bien une routine simple: on observe, on lit, on corrige legerement.",
      use:
        "Parfait pour installer un controle doux de l'ambiance et transformer une intuition floue en information utile.",
      highlights: [
        { title: "Climat", text: "Lecture simple de la temperature." },
        { title: "Reflexe", text: "Permet des ajustements plus rapides." },
        { title: "Format", text: "Leger, discret et facile a placer." },
      ],
      specs: [
        { label: "Lecture", value: "Numerique et immediate" },
        { label: "Usage", value: "Suivi simple de la temperature" },
        { label: "Format", value: "Petit et leger" },
        { label: "Atout", value: "Clarifie la routine" },
      ],
    }),
    withDefaults({
      id: "gear-hydro",
      slug: "kit-hydroponique-36",
      kind: "gear",
      family: "Materiel",
      name: "Kit hydroponique 36 trous",
      image: "hydro.png",
      accent: "#0d8c5a",
      initials: "HY",
      price: 99.9,
      summary: "Le systeme dense et propre qui fait entrer dans une logique plus technique.",
      lead: "Le kit hydro 36 ouvre la porte a une installation dense, ordonnee et tres graphique.",
      story:
        "Il donne tout de suite une autre allure a la culture, avec une logique de trous, de circulation et de repetition qui cree un langage plus systemique. C'est plus engageant qu'un simple accessoire: on sent tout de suite le changement de niveau.",
      use:
        "A considerer si tu veux gagner en densite, en structure et en sensation de systeme complet dans ton espace.",
      highlights: [
        { title: "Hydro", text: "Entre dans une logique de culture plus systemique." },
        { title: "Densite", text: "36 emplacements dans un ensemble tres ordonne." },
        { title: "Presence", text: "Donne un vrai caractere technique au setup." },
      ],
      specs: [
        { label: "Capacite", value: "36 trous" },
        { label: "Univers", value: "Hydroponie compacte" },
        { label: "Format", value: "Dense et bien ordonne" },
        { label: "Atout", value: "Change la perception du setup" },
      ],
    }),
  ];

  const byId = Object.fromEntries(products.map((product) => [product.id, product]));
  const bySlug = Object.fromEntries(products.map((product) => [product.slug, product]));

  window.KULTIV_SHOP_DATA = {
    checkoutUrl: "https://checkout.revolut.com/pay/8334b7ae-f185-4f92-98ca-50d145abf55b",
    products,
    seeds: products.filter((product) => product.kind === "seed"),
    gear: products.filter((product) => product.kind === "gear"),
    byId,
    bySlug,
    formatPrice,
    findById(id) {
      return byId[id] || null;
    },
    findBySlug(slug) {
      return bySlug[slug] || null;
    },
  };
})();
