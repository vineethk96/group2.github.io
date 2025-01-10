document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('#side .nav-item');
  const categoryTitle = document.getElementById('category-title');
  const categoryDescription = document.getElementById('category-description');
  const birdGrid = document.querySelector('.bird-grid');
  const sidebarItems = document.querySelectorAll("#side .nav-item");
  const birdtypeImage = document.getElementById('birdtype-image'); 
  console.log(birdtypeImage.src);

  // 示例分类数据
  const categoryData = {
    Anseriformes: {
      description: 'Anseriformes are a class of waterfowl represented by ducks, geese, and swans, which are widely distributed in wetlands, lakes, rivers and other water environments around the world. They usually have streamlined bodies, webbed toes, suitable for swimming, flat beaks with filter feeding structures, and mainly feed on plants, aquatic insects and small organisms.',
      birdtypeImage: './images/navigation/Anseriformes.jpg', 
      birds: [
        { name: 'Anas platyrhynchos', image: './images/navigation/Anas_platyrhynchos.jpg', details: './details.html?birdId=bird1' },
        { name: 'Cygnus olor', image: './images/navigation/Cygnus_olor.jpg', details: './details.html?birdId=bird2' },
        { name: 'Ardea cinerea', image: './images/navigation/Ardea_cinerea.jpg', details: './details.html?birdId=bird3' },
      ],
    },
    Accipitriformes: {
      description: 'Accipitriformes are a group of birds of prey that include eagles, falcons, vultures, and are widely distributed around the world. They usually have sharp eyesight, powerful claws and beaks, which they use to catch and tear prey. Most Accipitriformes are carnivorous and prey on small mammals, birds, and reptiles.',
      birdtypeImage: './images/navigation/Accipitriformes.jpg',
      birds: [
        { name: 'Falco peregrinus', image: './images/navigation/Falco_peregrinus.jpg', details: './details.html?birdId=bird4' },
        { name: 'Milvus milvus', image: './images/navigation/Milvus_milvus.jpg', details: './details.html?birdId=bird5' },
      ],
    },
    Galliformes: {
      description: 'Galliformes is a group of ground-dwelling birds including pheasants, turkeys, guinea fowls, etc., which are widely distributed around the world, especially in temperate and tropical regions. They are usually large in size, with short wings and weak flying ability, and are adapted to ground activities. Phasianidae birds are herbivorous and omnivorous, feeding on seeds, fruits, plants and insects. Their habitats are mostly forests, grasslands and farmlands.',
      birdtypeImage: './images/navigation/Galliformes.jpg',
      birds: [
        { name: 'Phasianus colchicus', image: './images/navigation/Phasianus_colchicus.jpg', details: './details.html?birdId=bird6' },
        { name: 'Passer domesticus', image: './images/navigation/Passer_domesticus.jpg', details: './details.html?birdId=bird7' },
        { name: 'Scolopax rusticola', image: './images/navigation/Scolopax_rusticola.jpg', details: './details.html?birdId=bird8' },
      ],
    },
  };

  // 点击导航栏时，激活状态切换
  sidebarItems.forEach(item => {
    item.addEventListener("click", function () {
      // 移除所有导航项的激活状态
      sidebarItems.forEach(item => item.classList.remove("active-item"));
      
      // 为当前点击的导航项添加激活状态
      this.classList.add("active-item");
    });
  });

  navItems.forEach(item => {
    item.addEventListener("click", function () {
      const category = this.dataset.category; // 从 .nav-item 的 data-category 获取值
      const data = categoryData[category];

      // 移除所有导航项的激活状态
      navItems.forEach(navItem => navItem.classList.remove("active-item"));
      
      // 为当前点击的导航项添加激活状态
      this.classList.add("active-item");

      if (data) {
        // 更新分类信息
        categoryTitle.textContent = category;
        categoryDescription.textContent = data.description;
        birdtypeImage.src = data.birdtypeImage;

        // 渲染鸟类信息
        birdGrid.innerHTML = '';  // 清空当前的鸟类信息
        data.birds.forEach(bird => {
          const birdCard = document.createElement('div');
          birdCard.classList.add('bird-card');
          birdCard.innerHTML = `
            <img src="${bird.image}" alt="${bird.name}">
            <div class="content">
              <h5>${bird.name}</h5>
              <a href="${bird.details}" class="btn btn-outline-warning">More details</a>
            </div>
          `;
          birdGrid.appendChild(birdCard);
        });
      }
    });
  });
});
