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
        event.target.classList.add('tabheader__item_active');
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

const endDate = new Date(2021, 2, 20, 0, 0, 0);
//const openModalTimer = setTimeout(openModal, 5000);

const timeUpdaterInterval = setInterval(()=>{
    const currentDate = new Date();
    let difference = endDate - currentDate;
    if (difference <= 999)
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

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        document.querySelector('.modal').style.display = 'none';
    }
});

document.addEventListener('click',(event)=>{
    if (event.target.classList.contains('modal__close')){
        document.querySelector('#formCall').reset();
        formCall.classList.remove('not_displayed');
        document.querySelector('.modal').style.display = 'none';
        if (document.querySelector('.thanks')) document.querySelector('.thanks').remove();
        if (document.querySelector('.status')) document.querySelector('.status').remove();
    }

});

// Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    postData(item);
});

const fetchPostData = async (url, objectData) => {
  const response = await fetch (url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectData)
  });
  return await response;
};

function postData (form) {
    form.addEventListener('submit', (e) => {

        e.preventDefault();

        let loadingSpinner = document.createElement('img');
        loadingSpinner.classList.add('status');
        loadingSpinner.src = message.loading;
        form.appendChild(loadingSpinner);

        let thanksDiv = document.createElement('div');
        thanksDiv.classList.add('modal__title');
        thanksDiv.classList.add('thanks');
        let modalClose = document.createElement('div');
        modalClose.classList.add('modal__close');
        modalClose.innerText = '×';

        const formData = new FormData(form);
        const object = Object.fromEntries(formData.entries());

        let modalContent = document.querySelector(".modal__content");
        fetchPostData('http://localhost:3000/requests', object)
            .then((response) => {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                thanksDiv.innerText = message.success;
                form.reset();
                setTimeout(() => {
                    loadingSpinner.remove();
                }, 5000);
            } else {
                thanksDiv.innerText = message.failure;
            }
            return response.json();
        })
            .then(data => {
                formCall.classList.add('not_displayed');
                modalContent.append(thanksDiv);
            })
            .catch((error) => {
                console.log('An error occurred:');
                console.log(error);
            })
            .finally(()=> {
            modalContent.append(modalClose);
        });
        const formCall = document.getElementById('formCall');
    });
}

const numberTo0x = (number) => {
    return (number < 10 ? '0' : '') + number;
};

fetch('http://localhost:3000/slides', {
    method: 'GET'
})
    .then(response => {
        return response.json()
    })
    .then(data => {
        sliderCarouselFunction(data);
    })
    .catch(e => console.log(e));

const nextSliderDiv = document.querySelector('.offer__slider-next');
const prevSliderDiv = document.querySelector('.offer__slider-prev');
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
slidesWrapper.style.display = 'flex';
slidesWrapper.style.overflow = 'hidden';
const slidesNavigation = document.createElement('ul');

const highlightSliderDot = (dotIndex) => {
    for (let child of slidesNavigation.children){
        child.style.opacity = '0.5';
    }
    slidesNavigation.children[dotIndex].style.opacity = '0.9';
};

const sliderCarouselFunction = (slides) => {

    let slidesNavigationListItems = [];
    slidesNavigation.classList.add('carousel-indicators');
    slides.src.forEach((element, index) => {
        const slidesNavigationElement = document.createElement('li');
        slidesNavigationElement.classList.add('dot');
        slidesNavigationElement.addEventListener("click", (event) => {
            slidesNavigationListItems.forEach((item, index)=>{
                item.style.opacity = '0.5';
            });
            slidesNavigationElement.style.opacity = '0.9';
        });
        slidesNavigationListItems.push(slidesNavigationElement);
        slidesNavigation.append(slidesNavigationElement);
    });
    slidesWrapper.append(slidesNavigation);

    const currentSlideNumber = document.querySelector('#current');
    currentSlideNumber.innerText = numberTo0x(1);
    document.querySelector('#total').innerText = numberTo0x(slides.src.length);
    let slideDiv = document.querySelector('.offer__slide');
    slideDiv.style.display = 'flex';
    slidesNavigationListItems[0].style.opacity = '0.9';


    slides.src.forEach((slideSrc) => {
        const slide = document.createElement('div');
        const slideImg = document.createElement('img');
        slide.classList.add('just__slide');
        slideImg.src = slideSrc;
        slide.append(slideImg);
        slideDiv.append(slide);
    });

    slidesWrapper.append(slideDiv);
    const firstSlide = slideDiv.firstElementChild.cloneNode(true);
    const lastSlide = slideDiv.lastElementChild.cloneNode(true);
    slideDiv.append(firstSlide);
    slideDiv.prepend(lastSlide);


    let slidesArray = document.querySelectorAll('.just__slide');
    let index = 1;
    let slideWidth = slidesArray[index].clientWidth;
    slideDiv.style.transform = `translateX(${-slideWidth * index}px)`;

    slideDiv.addEventListener('transitionend', () => {
        slideDiv = document.querySelector('.offer__slide');

        if (index > slides.src.length ){
            slideDiv.style.transition = 'none'
            slideDiv.style.transform = `translateX(${-slideWidth}px)`;
            index = 1;
        }
        if (index <= 0 ){
            slideDiv.style.transition = 'none'
            slideDiv.style.transform = `translateX(${-slideWidth * slides.src.length}px)`;
            index = slides.src.length;
        }

        currentSlideNumber.innerText = numberTo0x(index);
    });

    nextSliderDiv.addEventListener('click',  (event) => {
        slideDiv = document.querySelector('.offer__slide');
        if (index > slides.src.length ) return;
        index++;
        slideDiv.style.transition = '0.5s'
        slideDiv.style.transform = `translateX(${-slideWidth * index}px)`;
        if (index > slides.src.length){
            highlightSliderDot(0);
        } else {
            currentSlideNumber.innerText = numberTo0x(index);
            highlightSliderDot(index - 1);
        }
    });

    prevSliderDiv.addEventListener('click',(event) => {
        slideDiv = document.querySelector('.offer__slide');
        if (index < 1 ) return;
        index--;
        slideDiv.style.transition = '0.5s'
        slideDiv.style.transform = `translateX(${-slideWidth * index}px)`;
        if (index < 1){
            highlightSliderDot(slides.src.length - 1);
        }else{
            currentSlideNumber.innerText = numberTo0x(index);
            highlightSliderDot(index - 1);
        }
    });
};


let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let age = document.querySelector('#age');
const femaleGender = document.querySelector('#gender').firstElementChild;
const calculatorResult = document.querySelector('.calculating__result').querySelector('span');
const physicalActivity = [
    1.2,
    1.375,
    1.55,
    1.725,
    1.9,
];

if (localStorage.getItem('weight'))
    weight.value = localStorage.getItem('weight');
if (localStorage.getItem('height'))
    height.value = localStorage.getItem('height');
if (localStorage.getItem('age'))
    age.value = localStorage.getItem('age');
if (localStorage.getItem('gender') === 'male'){
    femaleGender.classList.remove('calculating__choose-item_active');
    femaleGender.nextElementSibling.classList.add('calculating__choose-item_active');
}
if (localStorage.getItem('activityType')){
    const type = Number(localStorage.getItem('activityType'));
    let typeIndex = 0;
    for (let activityType of document.querySelector('#physicalActivityType').children){
        activityType.classList.remove('calculating__choose-item_active');
        if (type === typeIndex)
            activityType.classList.add('calculating__choose-item_active');
        typeIndex++;
    }
}
if (localStorage.getItem('result'))
    calculatorResult.innerText = localStorage.getItem('result');


const updateCalculatorResult = () => {
    let result;
    let type;
    let typeIndex = 0;
    for (let activityType of document.querySelector('#physicalActivityType').children){
        if (activityType.classList.contains('calculating__choose-item_active')){
            type = typeIndex;
            break;
        }
        typeIndex++;
    }
    let weight = document.querySelector('#weight').value.replace(/[^0-9]/g, '');
    let height = document.querySelector('#height').value.replace(/[^0-9]/g, '');
    let age = document.querySelector('#age').value.replace(/[^0-9]/g, '');
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('age', age);
    localStorage.setItem('activityType', type);
    if (femaleGender.classList.contains('calculating__choose-item_active'))
        localStorage.setItem('gender', 'female');
    else
        localStorage.setItem('gender', 'male');
    if (!(weight !== '' && height !== '' && age !== '' ))
        return 0;
    if (femaleGender.classList.contains('calculating__choose-item_active')){
        result = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * physicalActivity[type];
    }else{
        result = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * physicalActivity[type];
    }
    if (!isNaN(result)){
        localStorage.setItem('result', Math.round(result).toString());
        return Math.round(result);
    }
    else
        return 0;
};


let parametersArray = [height, weight, age];
parametersArray.forEach((parameter)=>{
    parameter.addEventListener('input', ()=>{
        parameter.value = parameter.value.replace(/[^0-9]/g, '');
        calculatorResult.innerText = updateCalculatorResult().toString();
    });

});

const calculatorChooseItems = document.querySelectorAll('.calculating__choose-item');
calculatorChooseItems.forEach((element) => {
    if (element.id !== 'height' && element.id !== 'weight' && element.id !== 'age'){
        element.addEventListener('click', ()=>{
            for (let child of element.parentElement.children){
                child.classList.remove('calculating__choose-item_active');
            }
            element.classList.add('calculating__choose-item_active');
            calculatorResult.innerText = updateCalculatorResult().toString();
        });
    }
});



