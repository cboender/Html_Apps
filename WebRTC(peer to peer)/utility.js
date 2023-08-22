function getElement(Id) {
    return document.getElementById(Id);
}

function getElementByAttribute(attrName, attrVal, parent) {
	parent = parent || document;
	var selector = '[' + attrName + '="' + attrVal + '"]';
    return parent.querySelector(selector);
}

function setStyle(elem, style, value) {
     elem.style[style] = value;
}

function addClass(elem, className) {
	elem.classList.add(className);
}
function removeClass(elem, className) {
	elem.classList.remove(className);
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

function getJSON(data) {
    var json;
    if (data.toJSON) {
        json = data.toJSON();
    } else {
        json = data;
    }
    return json;
}

 function copy(inputId) {
	//Get data
	var input = getElement(inputId);
	
	if (input.nodeName == 'TEXTAREA' || input.nodeName == 'INPUT') {
		input.select();
		document.execCommand('copy');
		return;
	}
	
	var text = input.innerHTML;
	var tf = document.createElement("input");
	  
	tf.value = text
	tf.type='text';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(tf);
	tf.select();
	document.execCommand('copy');
	body.removeChild(tf); 
}

function paste(inputId) {
	var input = getElement(inputId);
	navigator.clipboard.readText().then(text => input.innerHTML = text);
}