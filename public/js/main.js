const deleteBtn = document.querySelectorAll('.del')
const groceryItem = document.querySelectorAll('span.not')
const groceryComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteGrocery)
})

Array.from(groceryItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(groceryComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteGrocery(){
    const groceryId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceries/deleteGrocery', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'groceryIdFromJSFile': groceryId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const groceryId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceries/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'groceryIdFromJSFile': groceryId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const groceryId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceries/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'groceryIdFromJSFile': groceryId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}