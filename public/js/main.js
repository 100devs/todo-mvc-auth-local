const delBtn = document.querySelectorAll('.del')
const editBtn = document.querySelectorAll('.edit')
const likeBtn = document.querySelectorAll('.like')
const dislikeBtn = document.querySelectorAll('.dislike')

Array.from(delBtn).forEach((el) => {el.addEventListener('click', deleteMessage)})

Array.from(editBtn).forEach((el) => {el.addEventListener('click', editMessage)})

Array.from(likeBtn).forEach((el) => {el.addEventListener('click', like)})

Array.from(dislikeBtn).forEach((el) => {el.addEventListener('click', dislike)})

async function deleteMessage(){
    const messageId = this.parentNode.dataset.id
    try{
        const response = await fetch('messages/deleteMessage', {
            method: 'delete',
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

async function editMessage(){
    const messageId = this.parentNode.dataset.id
    const message = document.getElementById('#message')
    try{
        const response = await fetch('messages/editMessage', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'messageId': messageId,
                'message': message
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function like(){
    const messageId = this.parentNode.parentNode.dataset.id
    console.log(messageId)
    try{
        const response = await fetch('messages/like', {
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

async function dislike(){
    const messageId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('messages/dislike', {
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