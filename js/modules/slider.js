function slider() {
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
}

export default slider;