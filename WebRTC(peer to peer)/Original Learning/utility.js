function getElement(Id) {
    return document.getElementById(Id);
}


var color = false;
function print(text, includeDate) {
    if (includeDate == undefined) {
        includeDate = true;
    }  
    var messageDiv = getElement("message");
    var output = document.createElement('div');
    color = !color;

    if (color) {
        setStyle(output, 'backgroundColor', '#77CCFF');
    }
    
    setStyle(output, 'min-height', '18px');
    //setStyle(output, 'white-space', 'nowrap');
    
    if (includeDate) {
        text = getFormattedDate(new Date()) + ": " + text;
    }
    output.innerHTML = text;
    messageDiv.appendChild(output);
}

function setStyle(elem, style, value) {
     elem.style[style] = value;
}

function getFormattedDate(date) {
    var options = {
        hour12 : false,
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }
    
    return date.toLocaleString('en',options);
}