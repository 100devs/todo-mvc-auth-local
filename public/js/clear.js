const allInputs = document.querySelectorAll('.postInput')
const clearButton = document.querySelector('#clear').addEventListener('click', clearAllInputs)

function clearAllInputs() {
    console.log('Clear!')
    allInputs.forEach(input => {
        document.getElementById(input.id).value = null
        console.log(input)
    })
}