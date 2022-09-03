const delBudget = document.querySelectorAll('.delBudget')
const delExpense = document.querySelectorAll('.delExpense')

const updExpense = document.querySelectorAll('.updExpense')

const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(delExpense).forEach((el)=>{
    el.addEventListener('click', deleteExpense)
})

Array.from(delBudget).forEach((el)=>{
    el.addEventListener('click', deleteBudget)
})

Array.from(updExpense).forEach((el)=>{
    el.addEventListener('click', updateExpense)
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
    const id = this.parentNode.dataset.id
    console.log(id)
    try{
        const response = await fetch(`expenses/update/${id}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'amount': 10 // THIS SHOULD BE THE AMOUNT GIVEN BY USER
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}