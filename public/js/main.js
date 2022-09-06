const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const upVoteTrip = document.querySelector('#green')
const downVoteTrip = document.querySelector('#red')

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
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
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
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
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
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

let btn1 = document.querySelector('#green');
let btn2 = document.querySelector('#red');


upVoteTrip.addEventListener('click', function(vote) {
    console.log('clicked')
    this.style = 'pointer-events:none'
    downVoteTrip.style ='pointer-events:auto'
    if (downVoteTrip.classList.contains('red')) {
        downVoteTrip.classList.remove('red');
    } 

  this.classList.toggle('green');
  

});

downVoteTrip.addEventListener('click', function(vote) {
    console.log('clicked')
    this.style = 'pointer-events:none'
    upVoteTrip.style ='pointer-events:auto'
    
    if (upVoteTrip.classList.contains('green')) {
        upVoteTrip.classList.remove('green');
    } 
  this.classList.toggle('red');
  
});


async function vote(){ 
    try {
    let trip = await Trip.find({_id: req.body.btn})
    let check=
    trip.forEach((trip) => {
    check = trip.vote.includes(req.user._id)})
        if(!check){
        await Trip.findOneAndUpdate(
            {userId: req.user._id},
            {$push: {
            vote: req.user._id, 
            new: true,
            runValidators: true, 
            }
        })
            {
            
            await Trip.findOneAndUpdate(
            {userId: req.user._id},
            {$pull: {
            
            vote: req.user._id,
            new: true,
            runValidators: true,
            }})
        console.log(data)
        location.reload()
    }}} catch (err) {
        console.log(err)
    }
}
