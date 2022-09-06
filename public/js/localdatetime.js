const dateFields = document.querySelectorAll('.date')

dateFields.forEach(dateField => {
    dateField.innerHTML = new Date(dateField.innerHTML).toLocaleString('en-us')
})