const showSummary = document.querySelectorAll('showTitle')

Array.from(showSummary).forEach((el)=>{
    el.addEventListener('click', showBio)
})

function showBio(click){
    const showId = this.parentNode.dataset.id
    if(click.target.dataset-id.contains(`${showId}`)){
		document.querySelector('#showInfo').classList.toggle('hidden')
	}else{
		alert("Wrong!");
	}
}



