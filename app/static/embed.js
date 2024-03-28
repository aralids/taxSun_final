function taxSunClick(name, rank, id) {
    //console.log("taxSunClick!", name);
};

function taxSunHover(name, rank, id) {
    //console.log("taxSunHover!", name);
};

const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
function simulateMouseClick(str){
    let element = $(`path[id^="${str}"]`)[0];
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
function simulateMouseOver(str){
    let element = $(`path[id^="${str}"]`)[0];
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
function simulateMouseOut(str){
    let element = $(`path[id^="${str}"]`)[0];
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