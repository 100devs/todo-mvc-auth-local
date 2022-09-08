const formEl = document.querySelector('form');
const companyNameEl = document.querySelector('#name');
const phoneNumberEl = document.querySelector('#phone');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const companyId = formEl.dataset.id;
    const response = await fetch('/companies/edit', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        companyIdFromJSFile: companyId,
        companyName: companyNameEl.value,
        phoneNumber: phoneNumberEl.value,
      }),
    });
    const data = await response.json();
    console.log(data);

    // redirected at the end
    window.location = '/companies';
  } catch (err) {
    console.log(err);
  }
});
('/edit/:companyId');
