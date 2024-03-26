function taxSunClick(name, rank, id) {
    //console.log("taxSunClick!", name);
};

function taxSunHover(name, rank, id) {
    //console.log("taxSunHover!", name);
};

const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
function simulateMouseClick(element){
    mouseClickEvents.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        )
    );
}

const mouseOverEvent = ['mouseover'];
function simulateMouseOver(element){
    mouseOverEvent.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        )
    );
}
const mouseOutEvent = ['mouseout'];
function simulateMouseOut(element){
    mouseOutEvent.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        )
    );
}

window.addEventListener('load', function() {
    var element = document.getElementById("Gammaproteobacteria_-_2");
    // simulateMouseClick(element);
    //simulateMouseOver(element);
    //setTimeout(() => {simulateMouseOut(element)}, 3000);
})