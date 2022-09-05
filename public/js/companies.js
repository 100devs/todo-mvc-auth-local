const deleteCompanyBtn = document.querySelectorAll(".del-company");

Array.from(deleteCompanyBtn).forEach((el) => {
  el.addEventListener("click", deleteCompany);
});


// @route   DELETE /companies/:id

async function deleteCompany() {
  const nodeId = this.parentNode.dataset.id;
  console.log(nodeId)
  try {
    const response = await fetch("companies/delete", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: nodeId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
