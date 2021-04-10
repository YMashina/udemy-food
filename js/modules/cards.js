function cards() {
  const menuCardsContainer = document.getElementById('menuCardsContainer');

  class menuCard {
    constructor(image, name, description, price) {
      this.image = image;
      this.name = name;
      this.description = description;
      this.price = price;
    }

    render () {
      const menuCardElement = document.createElement('div');
      menuCardElement.classList.add('menu__item');
      menuCardElement.innerHTML = `<img src="${this.image}">
                    <h3 class="menu__item-subtitle">${this.name}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`
      menuCardsContainer.append(menuCardElement);
    }
  }

  const createMenuCards = (data) => {
    data.forEach(({img, title, descr, price})=>{
      new menuCard(img, title, descr, price).render();
    });
  };

  let menuObj;

  fetch('http://localhost:3000/menu', {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      menuObj = data;
      createMenuCards(data);
    })
    .catch(e => console.log(e));
}

export default cards;