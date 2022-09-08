const deleteBtn = document.querySelectorAll('.del');
const companyItem = document.querySelectorAll('span.not');
const companyComplete = document.querySelectorAll('span.completed');
const editBtn = document.querySelectorAll('.edit');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteCompany);
});

Array.from(editBtn).forEach((el) => {
  el.addEventListener('click', editCompany);
});

Array.from(companyItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(companyComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

async function deleteCompany() {
  const companyId = this.parentNode.dataset.id;
  try {
    const response = await fetch('companies/deleteCompany', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        companyIdFromJSFile: companyId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

function editCompany() {
  const companyId = this.parentNode.dataset.id;
  window.location = `companies/edit/${companyId}`;
  //   try {
  //     const response = await fetch(`companies/edit/${companyId}`);
  //     console.log(response);
  //     // const data = await response.json()
  //     // console.log(data)
  //     // location.reload()
  //   } catch (err) {
  //     console.log(err);
  //   }
}

async function markComplete(e) {
  // guard clause to not trigger markcomplete on button clicks
  if (e.target.parentNode.nodeName === 'BUTTON') return null;

  try {
    const companyId = this.parentNode.dataset.id;
    const response = await fetch('companies/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        companyIdFromJSFile: companyId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete(e) {
  // guard clause to not trigger markcomplete on button clicks
  if (e.target.parentNode.nodeName === 'BUTTON') return null;

  const companyId = this.parentNode.dataset.id;
  try {
    const response = await fetch('companies/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        companyIdFromJSFile: companyId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
