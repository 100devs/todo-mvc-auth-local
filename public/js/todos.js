// const addbtn = document.querySelectorAll('button')

// Array.from(addbtn).forEach((el)=>{
//     el.addEventListener('click', addShow)
// })

// async function addShow(){
//     const showId = this.parentNode.dataset.show.id
//     try{
//         const response = await fetch('todos/createTodo', {
//             method: 'POST',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'showID': showId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }



