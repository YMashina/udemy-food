function modal() {
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

  const openModalTimer = setTimeout(openModal, 5000);

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

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      document.querySelector('.modal').style.display = 'none';
    }
  });

  document.addEventListener('click',(event)=>{
    if (event.target.classList.contains('modal__close')){
      document.querySelector('#formCall').reset();
      const formCall = document.getElementById('formCall');
      formCall.classList.remove('not_displayed');
      document.querySelector('.modal').style.display = 'none';
      if (document.querySelector('.thanks')) document.querySelector('.thanks').remove();
      if (document.querySelector('.status')) document.querySelector('.status').remove();
    }

  });
}

module.exports = modal;