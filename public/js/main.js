const deleteBtn = document.querySelectorAll('.del')
const updateBtn = document.querySelectorAll('.update')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteDiary)
})

Array.from(updateBtn).forEach((el)=>{
    el.addEventListener('click', updateDiary)
})

async function deleteDiary(){
    const diaryId = this.parentNode.dataset.id
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

async function updateDiary(){
    const diaryId = this.parentNode.dataset.id
    try{
        console.log(`id is ${diaryId}`)
        const response = await fetch('diary/updateDiary', {
            method: 'put',
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