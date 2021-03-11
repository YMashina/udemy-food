tabItems = document.querySelectorAll('.tabheader__item');
tabContentItems = document.querySelectorAll('.tabcontent');
tabs = {
    fitnessTabheader : 'fitnessTabcontent',
    eliteTabheader: 'eliteTabcontent',
    vegetarianTabheader: 'vegetarianTabcontent',
    balanceTabheader: 'balancedTabcontent',
};
tabItems.forEach((tabItem)=>{
    tabItem.addEventListener('click',(event)=>{
        console.log(event.target.classList);
        event.target.classList.add('tabheader__item_active');
        console.log(event.target.classList);
        tabItems.forEach((element) => {
            if (element !== event.target && element.classList.contains('tabheader__item_active'))
                element.classList.remove('tabheader__item_active');
        });
        tabContentItems.forEach((element) => {
            element.classList.add('not_displayed');
        });
        document.getElementById(tabs[event.target.id]).classList.remove('not_displayed');
    });
});

function scrollOpenModal () {
    if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight ){
        openModal();
        window.removeEventListener('scroll',scrollOpenModal);
    }
}

const openModal = () => {
    document.getElementById('modalContact').style.display = 'block';
    clearTimeout(openModalTimer);
};

const closeModal = () => {
    document.getElementById('modalContact').style.display = 'none';
};

document.getElementById('modalContactClose').addEventListener('click', () => {
    closeModal();
});

contactUsBtns = document.querySelectorAll('.btn_contact_us');
contactUsBtns.forEach((element)=>{
    element.addEventListener('click', (event) => {
        openModal();
    });
});

window.addEventListener('scroll', scrollOpenModal);

const endDate = new Date(2021, 4, 10, 10, 0, 0);
const openModalTimer = setTimeout(openModal, 5000);

const timeUpdaterInterval = setInterval(()=>{
    const currentDate = new Date();
    let difference = endDate - currentDate;
    if (difference === 0)
        clearInterval(timeUpdaterInterval);
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);
    document.getElementById('days').innerText = daysLeft.toString();
    document.getElementById('hours').innerText = hoursLeft.toString();
    document.getElementById('minutes').innerText = minutesLeft.toString();
    document.getElementById('seconds').innerText = secondsLeft.toString();
}, 1000);

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
                    <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`
        menuCardsContainer.append(menuCardElement);
    }
}

const fitnessMenuCard = new menuCard(
    'img/tabs/vegy.jpg',
    'Фитнес',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229 ).render();

const eliteMenuCard = new menuCard(
    'img/tabs/elite.jpg',
    'Премиум',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550 ).render();

const vegetarianMenuCard = new menuCard(
    'img/tabs/post.jpg',
    'Постное',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430 ).render();