function forms() {
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
}

module.exports = forms;