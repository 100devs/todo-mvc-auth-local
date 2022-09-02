const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteExpense)
})


async function deleteBudget(){
    const idFromJSFile = this.parentNode.dataset.id
    try{
        const response = await fetch('budget/delete', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': idFromJSFile
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
