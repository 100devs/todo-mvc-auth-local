const deleteBtn = document.querySelectorAll('.delete')


//do not uncomment these 2 lines below! for some reason this import method breaks swiper :x
// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
    //   loopFillGroupWithBlank: true,

    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

//the toggle for flipping the card
const card = document.querySelectorAll('.card_inner');

card.forEach(element =>{
    element.addEventListener('click',  (e) => {
        element.classList.toggle('is-flipped');
    });
})
//the toggle for flipping the card
    
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteCard)
})


async function deleteCard(){
    const cardId = this.parentNode.dataset.id
    try{
        const response = await fetch('/cards/deleteCard', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'cardToDelete': cardId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

