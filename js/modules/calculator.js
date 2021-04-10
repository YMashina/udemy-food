function calculator() {
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
}

export default calculator;