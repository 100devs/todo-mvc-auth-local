const deleteBtn = document.querySelectorAll('.del')
const diaryEntry = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteDiary)
})

Array.from(diaryEntry).forEach((el)=>{
    el.addEventListener('click', updateDiary)
})

Array.from(diaryComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
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