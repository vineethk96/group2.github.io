// 数据存储
const birdDetails = [
  {
    id: "bird1",
    name: "Anas platyrhynchos",
    description: "The Mallard Duck is one of the most widely distributed duck species, known for its versatile habitat and high adaptability.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> Mallard Duck",
      "<strong>Classification:</strong> Class Aves, Order Anseriformes, Family Anatidae.",
      "<strong>Size:</strong> Length 50-65 cm, wingspan 81-95 cm, weight approximately 1.2 kg.",
    ],
    habitat: [
      "<strong>Range:</strong> Widely distributed across North America, Europe, Asia, and Africa.",
      "<strong>Habitat:</strong> Found in lakes, rivers, wetlands, and man-made ponds.",
      "<strong>Migration:</strong> Some populations are migratory and migrate south for the winter.",
    ],
    behavior: [
      "<strong>Diet:</strong> Omnivorous, mainly feeding on aquatic plants, seeds, small invertebrates, and fish.",
      "<strong>Reproduction:</strong> Monogamous for the season, with the female independently incubating 6-14 eggs, incubation lasts about 28 days.",
      "<strong>Behavior:</strong> Highly adaptable, capable of both diving and surface feeding.",
    ],
    funFacts: [
      "The Mallard Duck has a high hybridization capacity, capable of interbreeding with other duck species (such as the Northern Pintail), which has affected some native populations in certain regions.",
    ],
    image: "./images/navigation/Anas_platyrhynchos.jpg",
  },
  
  {
    id: "bird2",
    name: "Cygnus olor",
    description: "The Mute Swan is a large waterfowl known for its graceful appearance and silent behavior, commonly found in Europe and North America.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> Mute Swan",
      "<strong>Classification:</strong> Class Aves, Order Anseriformes, Family Anatidae.",
      "<strong>Size:</strong> Length 125-160 cm, wingspan 200-240 cm, weight 7-14 kg.",
    ],
    habitat: [
      "<strong>Range:</strong> Native to Europe and Western Asia, now introduced to North America, Australia, and other regions.",
      "<strong>Habitat:</strong> Prefers freshwater lakes, wetlands, rivers, and still waters.",
      "<strong>Migration:</strong> Some populations are migratory, with short-distance migrations.",
    ],
    behavior: [
      "<strong>Diet:</strong> Primarily aquatic plants, also consuming seeds and small aquatic animals.",
      "<strong>Reproduction:</strong> Monogamous for life, with the female incubating 4-8 eggs, incubation lasts about 35 days.",
      "<strong>Behavior:</strong> Excellent swimmers, but heavy fliers that require a running start to take off.",
    ],
    funFacts: [
      "Although called the 'Mute Swan,' these swans are not completely mute; they emit a soft 'hissing' sound as a form of communication or warning.",
    ],
    image: "./images/navigation/Cygnus_olor.jpg",
  },

  {
    id: "bird3",
    name: "Ardea cinerea",
    description: "The Grey Heron is a large wader bird known for its long, slender body and hunting skills, making it an important member of wetland ecosystems.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> Grey Heron",
      "<strong>Classification:</strong> Class Aves, Order Ciconiiformes, Family Ardeidae.",
      "<strong>Size:</strong> Length 84-102 cm, wingspan 155-195 cm, weight 1-2 kg.",
    ],
    habitat: [
      "<strong>Range:</strong> Widely distributed across Europe, Asia, and Africa, with some populations migrating to warmer regions for the winter.",
      "<strong>Habitat:</strong> Prefers freshwater wetlands, rivers, lakes, marshes, and coastal waters.",
      "<strong>Migration:</strong> Some populations are migratory, migrating to southern regions during the winter months.",
    ],
    behavior: [
      "<strong>Diet:</strong> Mainly fish, but also feeds on amphibians, insects, and small mammals.",
      "<strong>Reproduction:</strong> Nests in tall trees, with the female laying 3-5 eggs, which are incubated by both parents. Incubation lasts 25-28 days.",
      "<strong>Behavior:</strong> Often seen standing still waiting for prey, capturing it with quick, precise movements.",
    ],
    funFacts: [
      "The Grey Heron is known for its patience when hunting, sometimes standing motionless for hours waiting for fish to come into range, which gives it a distinct and striking appearance in wetland environments.",
    ],
    image: "./images/navigation/Ardea_cinerea.jpg",
  },

  {
    id: "bird4",
    name: "Falco peregrinus",
    description: "The Peregrine Falcon is a bird of prey known for its incredible speed, reaching up to 240 mph in a dive, making it the fastest bird in the world. It preys on other birds, often hunting in mid-air with precision and skill.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> Peregrine Falcon",
      "<strong>Classification:</strong> Class Aves, Order Falconiformes, Family Falconidae.",
      "<strong>Size:</strong> Length 34-58 cm, wingspan 74-120 cm, weight 330-1,000 g.",
    ],
    habitat: [
      "<strong>Range:</strong> Found worldwide, excluding polar regions, often in cliffs, tall buildings, and bridges.",
      "<strong>Habitat:</strong>  Prefers open spaces like cliffs, coastal areas, and urban environments for nesting.",
      "<strong>Migration:</strong> Some populations migrate to warmer climates in winter, while others are year-round residents.",
    ],
    behavior: [
      "<strong>Diet:</strong> Mainly other birds, especially pigeons and ducks.",
      "<strong>Reproduction:</strong> Nests in high places such as cliffs or tall buildings, with the female laying 3-4 eggs. Incubation lasts 29-32 days.",
      "<strong>Behavior:</strong> Known for high-speed hunting dives, often from high altitudes, using sharp talons to capture prey mid-flight.",
    ],
    funFacts: [
      "The Peregrine Falcon holds the record for the fastest bird, reaching speeds of 240 mph in a dive, a remarkable feat in the animal kingdom.",
    ],
    image: "./images/navigation/Falco_peregrinus.jpg",
  },

  {
    id: "bird5",
    name: "Milvus milvus ",
    description: "The Red Kite is a large raptor with a striking forked tail, known for its graceful flight. It primarily feeds on carrion and small mammals, often seen soaring in the sky searching for food.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> Red Kite",
      "<strong>Classification:</strong> Class Aves, Order Accipitriformes, Family Accipitridae.",
      "<strong>Size:</strong> Length 60-70 cm, wingspan 175-195 cm, weight 800-1,400 g.",
    ],
    habitat: [
      "<strong>Range:</strong> Native to Europe, particularly the UK, and is also found in parts of Asia.",
      "<strong>Habitat:</strong>  Prefers woodlands, open farmland, and coastal regions.",
      "<strong>Migration:</strong>  Some populations migrate south during the winter, while others remain in their breeding areas year-round.",
    ],
    behavior: [
      "<strong>Diet:</strong> Carrion, small mammals, birds, and occasionally reptiles.",
      "<strong>Reproduction:</strong> Nests in tall trees, with the female laying 2-3 eggs. Incubation lasts around 30 days.",
      "<strong>Behavior:</strong> Known for its graceful flight, often soaring high in the sky with minimal wing movement, searching for food.",
    ],
    funFacts: [
      "The Red Kite is easily recognized by its forked tail, which it uses to steer with incredible precision while flying.",
    ],
    image: "./images/navigation/Milvus_milvus.jpg",
  },

  {
    id: "bird6",
    name: "Phasianus colchicus",
    description: "The Common Pheasant is a brightly colored bird found across Europe and Asia, often seen in grasslands and woodlands. The males are known for their vibrant plumage and long tail feathers.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> Common Pheasant",
      "<strong>Classification:</strong> Class Aves, Order Galliformes, Family Phasianidae.",
      "<strong>Size:</strong>  Length 50-90 cm, wingspan 70-100 cm, weight 900-1,500 g.",
    ],
    habitat: [
      "<strong>Range:</strong> Native to Asia, but widely introduced across Europe and other parts of the world.",
      "<strong>Habitat:</strong>  Prefers open grasslands, farmlands, and woodlands.",
      "<strong>Migration:</strong>  Typically non-migratory, but some populations may move to lower altitudes in winter.",
    ],
    behavior: [
      "<strong>Diet:</strong> Mainly seeds, grains, and insects.",
      "<strong>Reproduction:</strong> Nests on the ground, with the female laying 8-15 eggs. Incubation lasts around 23 days.",
      "<strong>Behavior:</strong> Males are known for their territorial calls and vivid displays of plumage to attract mates.",
    ],
    funFacts: [
      "The male Common Pheasant is easily recognizable by its colorful plumage, including iridescent green and purple feathers and a long, distinctive tail.",
    ],
    image: "./images/navigation/Phasianus_colchicus.jpg",
  },

  {
    id: "bird7",
    name: "Passer domesticus",
    description: "The House Sparrow is a small, ubiquitous bird found in urban and suburban areas. It has adapted well to human environments and is often seen in cities and towns.",
    basicInfo: [
      "<strong>Vernacular Name:</strong> House Sparrow",
      "<strong>Classification:</strong> Class Aves, Order Passeriformes, Family Passeridae.",
      "<strong>Size:</strong> Length 16-18 cm, wingspan 25-30 cm, weight 24-40 g.",
    ],
    habitat: [
      "<strong>Range:</strong> Found across Europe, Asia, and parts of North America.",
      "<strong>Habitat:</strong> Prefers urban and rural areas, particularly near human settlements.",
      "<strong>Migration:</strong>  Generally non-migratory, though some populations may move locally during winter.",
    ],
    behavior: [
      "<strong>Diet:</strong> Seeds, grains, and small insects.",
      "<strong>Reproduction:</strong> Nests in cavities, building nests from twigs, grass, and other materials. The female lays 3-7 eggs.",
      "<strong>Behavior:</strong> Known for its adaptability to human environments, often found around homes, farms, and cities.",
    ],
    funFacts: [
      "The House Sparrow is one of the most common and widespread birds in the world, often seen in large flocks.",
    ],
    image: "./images/navigation/Passer_domesticus.jpg",
  },

  {
    id: "bird8",
    name: "Scolopax rusticola",
    description: "The Woodcock is a medium-sized wader known for its long, straight bill and cryptic plumage. It is often found in woodlands and wetlands, where it forages for earthworms.",
    basicInfo: [
      "<strong>Vernacular Name:</strong>  Woodcock",
      "<strong>Classification:</strong> Class Aves, Order Charadriiformes, Family Scolopacidae.",
      "<strong>Size:</strong> Length 32-37 cm, wingspan 55-60 cm, weight 350-500 g.",
    ],
    habitat: [
      "<strong>Range:</strong> Found across Europe, Asia, and parts of North Africa.",
      "<strong>Habitat:</strong> Prefers woodland edges, wetlands, and dense vegetation.",
      "<strong>Migration:</strong> Some populations migrate, while others remain in their breeding areas year-round.",
    ],
    behavior: [
      "<strong>Diet:</strong> Earthworms, small invertebrates, and plant material.",
      "<strong>Reproduction:</strong>  Nests on the ground, with the female laying 3-4 eggs. Incubation lasts about 23-25 days.",
      "<strong>Behavior:</strong> Known for its cryptic plumage that helps it blend into its woodland habitat, making it difficult to spot.",
    ],
    funFacts: [
      "The Woodcock is known for its elaborate courtship display, where the male performs a series of aerial flights to attract a mate.",
    ],
    image: "./images/navigation/Scolopax_rusticola.jpg",
  },
];

// 根据鸟类 ID 动态加载数据
function loadBirdDetails(birdId) {
  const bird = birdDetails.find((b) => b.id === birdId);

  if (bird) {
    // 更新页面内容
    document.querySelector(".bird-image").src = bird.image;
    document.querySelector(".bird-name").textContent = bird.name;
    document.querySelector(".bird-description").textContent = bird.description;

    document.querySelector(".basic-info").innerHTML = bird.basicInfo
      .map((info) => `<li>${info}</li>`)
      .join("");
    document.querySelector(".habitat-info").innerHTML = bird.habitat
      .map((info) => `<li>${info}</li>`)
      .join("");
    document.querySelector(".behavior-info").innerHTML = bird.behavior
      .map((info) => `<li>${info}</li>`)
      .join("");
    document.querySelector(".fun-facts-info").innerHTML = bird.funFacts
      .map((fact) => `<li>${fact}</li>`)
      .join("");
  }
}

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const birdId = urlParams.get("birdId");

  if (birdId) {
    loadBirdDetails(birdId);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const favoriteButton = document.querySelector(".favorite-btn");

  // 检查收藏状态（从 localStorage 中读取）
  const birdId = new URLSearchParams(window.location.search).get("birdId");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorites.includes(birdId)) {
    favoriteButton.classList.add("active"); // 设置为已收藏状态
  }

  // 点击事件
  favoriteButton.addEventListener("click", () => {
    const isFavorited = favoriteButton.classList.toggle("active");

    if (isFavorited) {
      // 添加到收藏列表
      if (!favorites.includes(birdId)) {
        favorites.push(birdId);
      }
    } else {
      // 从收藏列表中移除
      const index = favorites.indexOf(birdId);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }

    // 更新到 localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });
});
