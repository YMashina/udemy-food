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

const endDate = new Date(2021, 2, 20, 0, 0, 0);
const openModalTimer = setTimeout(openModal, 5000);

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
    console.log(data);
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
    console.log(data)
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
        if (document.querySelector('.thanks')) remove();
        if (document.querySelector('.status')) remove();
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

function postData(form) {
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



