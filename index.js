let isDragging = false;

document.addEventListener('mousedown', function(event) {

    let dragElement = event.target.closest('.draggable');
    if (!dragElement || !this.contains(dragElement)) return;
    event.preventDefault();
    dragElement.ondragstart = function() {
        return false;
    };
    let shiftX, shiftY;
    startDrag(dragElement, event.clientX, event.clientY);

    function onMouseUp(event) {
        finishDrag(event);
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
    }

    function startDrag(element, clientX, clientY) {
        if(isDragging) {
            return;
        }
        isDragging = true;

        document.addEventListener('mousemove', onMouseMove);
        element.addEventListener('mouseup', onMouseUp);

        shiftX = clientX - element.getBoundingClientRect().left;
        shiftY = clientY - element.getBoundingClientRect().top;

        element.style.width = 'inherit';
        element.style.position = 'fixed';

        moveAt(clientX, clientY);
    }

    function finishDrag(event) {
        if(!isDragging) {
            return;
        }
        isDragging = false;
        dragElement.hidden = true;
        dragElement.style.display = '';

        add(event, dragElement);
        removed(event, dragElement);

        dragElement.style.position = 'inherit';
        dragElement.style.width = '100%';
        dragElement.style.maxWidth = '1000px';
        dragElement.hidden = false;

        document.removeEventListener('mousemove', onMouseMove);
        dragElement.removeEventListener('mouseup', onMouseUp);
    }

    function moveAt(clientX, clientY) {
        let newX = clientX - shiftX;
        let newY = clientY - shiftY;

        dragElement.style.left = newX + 'px';
        dragElement.style.top = newY + 'px';
    }

    function add(event, dragElement) {
        var elem = document.elementFromPoint(event.clientX, event.clientY);
        if(event.target.closest('.button') && elem.closest('.place-zone')){
            var placeElement = dragElement.children[1].cloneNode(true);
            placeElement.style.display = 'block';
            elem.appendChild(placeElement);
        }
        if(event.target.closest('.place-zone') && elem.closest('.place-zone')){
            var carryElement = dragElement.cloneNode(true);
            dragElement.remove();
            carryElement.style.display = 'block';
            carryElement.hidden = false;
            carryElement.style.position = 'inherit';
            carryElement.style.width = '100%';
            carryElement.style.maxWidth = '1000px';
            elem.appendChild(carryElement);
        }
    }
    function removed(event, dragElement) {
        var elem = document.elementFromPoint(event.clientX, event.clientY);
        if(event.target.closest('.place-zone') && elem.closest('.trash')){
            dragElement.remove();
        }
    }
});