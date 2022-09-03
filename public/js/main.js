const delBudget = document.querySelectorAll('.delBudget')
const delExpense = document.querySelectorAll('.delExpense')

const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(delExpense).forEach((el)=>{
    el.addEventListener('click', deleteExpense)
})

Array.from(delBudget).forEach((el)=>{
    el.addEventListener('click', deleteBudget)
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
