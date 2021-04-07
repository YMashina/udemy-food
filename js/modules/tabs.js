function tabs (){
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
}

module.exports = tabs;