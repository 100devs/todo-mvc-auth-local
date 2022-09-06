const deleteBtn = document.querySelectorAll('.del')
const likeBtn = document.querySelectorAll('.like')
const dislikeBtn = document.querySelectorAll('.dislike')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteMessage)
})

Array.from(likeBtn).forEach((el)=>{
    el.addEventListener('click', markLiked)
})

Array.from(dislikeBtn).forEach((el)=>{
    el.addEventListener('click', markUnliked)
})

async function deleteMessage(){
    const messageId = this.parentNode.dataset.id
    try{
        const response = await fetch('messages/deleteMessage', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'messageId': messageId,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markLiked(){
    const messageId = this.parentNode.dataset.id
    try{
        const response = await fetch('messages/markLiked', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'messageId': messageId,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnliked(){
    const messageId = this.parentNode.dataset.id
    try{
        const response = await fetch('messages/markUnliked', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'messageId': messageId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}