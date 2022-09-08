const deleteBtn = document.querySelectorAll('.del')
// const updateBtn = document.querySelectorAll('.update')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteDiary)
})


async function deleteDiary(){
    const diaryId = this.parentNode.dataset.id
    console.log(`id is ${diaryId}`)
    try{
        const response = await fetch('diary/deleteDiary', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'diaryIdFromJSFile': diaryId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function updateDiary(){
//     const diaryId = this.parentNode.parentNode.dataset.id
//     console.log(`value is ${this.parentNode}`)
//     try{
//         const response = await fetch('diary/updateDiary', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'diaryIdFromJSFile': diaryId,
//                 'diary': ''
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }