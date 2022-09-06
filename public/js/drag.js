
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        //console.log('drag start')
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        //console.log('drag over');

        const afterElement = getDragAfterElement(container, e.clientY) 
        console.log(afterElement);

         //only one element will have the class 'dragging'
         const draggable = document.querySelector('.dragging')

        if (afterElement == null) {
            container.appendChild(draggable)

        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

/**========== DETERMINE WHERE TO PUT ELEMENT============== */

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')] //get every element, that is not currently dragging

    return draggableElements.reduce((closest, child) => { //y is the possition of the cursor
        const box = child.getBoundingClientRect() 
        //console.log(box);

        const offset = y - box.top - box.height / 2  //get top and height of the box diveded by 2
        // console.log(offset);

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
    
}


