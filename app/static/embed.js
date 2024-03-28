function taxSunClick(name, rank, id) {
    // console.log("taxSunClick!", name);
    let element = $(`button[id^="button-${name}"]`)[0];
    if (element) element.click();
};

function taxSunMouseOver(name, rank, id) {
    //console.log("taxSunHover!", name);
    let element = $(`button[id^="button-${name}"]`)[0];
    if (element) element.dispatchEvent(new MouseEvent("mouseover", {'view': window, 'bubbles': true, 'cancelable': true}));
};

function taxSunMouseOut(name, rank, id) {
    //console.log("taxSunHover!", name);
    let element = $(`button[id^="button-${name}"]`)[0];
    if (element) element.dispatchEvent(new MouseEvent("mouseout", {'view': window, 'bubbles': true, 'cancelable': true}));
};

const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
function simulateMouseClick(event){
    if (event.isTrusted) {
        let element = $(`path[id^=${event.target.getAttribute("taxName")}]`)[0];
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
    
}

const mouseOverEvent = ['mouseover'];
function simulateMouseOver(event){
    if (event.isTrusted) {
        let element = $(`path[id^=${event.target.getAttribute("taxName")}]`)[0];
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
}
const mouseOutEvent = ['mouseout'];
function simulateMouseOut(event){
    if (event.isTrusted) {
        let element = $(`path[id^=${event.target.getAttribute("taxName")}]`)[0];
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
}

let mouseOverEventVar = mouseOverEvent;

window.addEventListener('load', function() {
    var element = document.getElementById("Gammaproteobacteria_-_2");
    // simulateMouseClick(element);
    //simulateMouseOver(element);
    //setTimeout(() => {simulateMouseOut(element)}, 3000);
})