const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const companyId = this.parentNode.dataset.id
    try{
        const response = await fetch('companies/deleteCompany', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'companyIdFromJSFile': companyId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(e){
    // guard clause to not trigger markcomplete on button clicks 
    if(e.target.parentNode.nodeName === "BUTTON" ) return null

    try{
        const companyId = this.parentNode.dataset.id
        const response = await fetch('companies/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'companyIdFromJSFile': companyId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(e){
    // guard clause to not trigger markcomplete on button clicks 
    if(e.target.parentNode.nodeName === "BUTTON" ) return null
    
    const companyId = this.parentNode.dataset.id
    try{
        const response = await fetch('companies/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'companyIdFromJSFile': companyId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}