const delBudget = document.querySelectorAll('.delBudget')
const delExpense = document.querySelectorAll('.delExpense')

const updExpense = document.querySelectorAll('.updExpense')
const updBudget = document.querySelectorAll('.updBudget')

// const todoItem = document.querySelectorAll('span.not')
// const todoComplete = document.querySelectorAll('span.completed')

Array.from(delExpense).forEach((el)=>{
    el.addEventListener('click', deleteExpense)
})

Array.from(delBudget).forEach((el)=>{
    el.addEventListener('click', deleteBudget)
})

Array.from(updExpense).forEach((el)=>{
    el.addEventListener('click', updateExpense)
})

Array.from(updBudget).forEach((el)=>{
    el.addEventListener('click', updateBudget)
})

async function deleteBudget(){
    const id = this.parentNode.dataset.id
    try{
        const response = await fetch('budget/delete', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'idFromJSFile': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteExpense(){
   
    const id = this.parentNode.dataset.id
    console.log(id)
    try{
        const response = await fetch('expenses/delete', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'idFromJSFile': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function updateExpense(){
    console.log('updateExpense is running')

    const updateExpenseDialog = document.querySelector('#updateExpenseDialog')
    const newAmount = updateExpenseDialog.querySelector('#newAmount')
    const saveNewAmountBtn = updateExpenseDialog.querySelector('#saveNewAmountBtn')

    // show modal window
    updateExpenseDialog.showModal();

    // Save the new amount
    newAmount.addEventListener('change', () => {
        saveNewAmountBtn.value = newAmount.value;
    });

    // create a put request only after the dialog is closed and has a value
    updateExpenseDialog.addEventListener('close', async () => {
        const id = this.parentNode.dataset.id // since it's an arrow function, the value of 'this' is borrowed from the nearest outer function - updateBudget
        // if no value was provided and saved, or cancel button pressed, the dialog returnValue is empty string and the request is not made
        if (updateExpenseDialog.returnValue) {
            try {
                const response = await fetch(`expenses/update/${id}`, {
                    method: 'put',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        'amount': updateExpenseDialog.returnValue
                    })
                })
                const data = await response.json()
                console.log(data)
                location.reload()
            } catch(err) {
                console.log(err)
            }
        }
    })
}

async function updateBudget(){
    console.log('updateBudget is running');

    const updateBudgetDialog = document.querySelector('#updateBudgetDialog')
    const newInitialAmount = updateBudgetDialog.querySelector('#newInitialAmount')
    const saveNewInitialAmountBtn = updateBudgetDialog.querySelector('#saveNewInitialAmountBtn')

    // show modal window
    updateBudgetDialog.showModal();

    // Save the new amount
    newInitialAmount.addEventListener('change', () => {
        saveNewInitialAmountBtn.value = newInitialAmount.value;
    });

    // create a put request only after the dialog is closed and has a value
    updateBudgetDialog.addEventListener('close', async () => {
        const id = this.parentNode.dataset.id // since it's an arrow function, the value of 'this' is borrowed from the nearest outer function - updateBudget
        // if no value was provided and saved, or cancel button pressed, the dialog returnValue is empty string and the request is not made
        if (updateBudgetDialog.returnValue) {
            try {
                const response = await fetch(`budget/update/${id}`, {
                    method: 'put',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        'newInitialAmount': updateBudgetDialog.returnValue
                    })
                })
                const data = await response.json()
                console.log(data)
                location.reload()
            } catch(err) {
                console.log(err)
            }
        }
    })
}
