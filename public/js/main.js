const deleteBtn = document.querySelectorAll('.del')
const changePrivacyBtn = document.querySelectorAll('.changePrivacy')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteDiary)
})

Array.from(changePrivacyBtn).forEach((el)=>{
    el.addEventListener('click', changePrivacy)
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

async function changePrivacy(){
    const diaryId = this.parentNode.dataset.id
    const private = this.parentNode.dataset.private === "true"
    console.log(`private value is ${private}`)
    console.log(`pirvate is a ${typeof(private)}`)
    try{
        const response = await fetch('diary/changePrivacy', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'diaryIdFromJSFile': diaryId,
                'private': !private,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}