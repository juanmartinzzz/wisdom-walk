const setAttributes = ({element, attributes = {}}) => {
    Object.keys(attributes).map(attribute => {
        if(attribute === 'innerText') {
            element.innerText = attributes[attribute];
            return;
        }
        if(attribute === 'innerHTML') {
            element.innerHTML = attributes[attribute];
            return;
        }
        element.setAttribute(attribute, attributes[attribute]);
    })
}

/**
 * 
 * @param {*} param0 
 * @returns {HTMLElement}
 */
const createElementWithAttributes = ({type, attributes}) => {
    const newElement = document.createElement(type);

    setAttributes({element: newElement, attributes});
    
    return newElement;
}

const createElementAndAppend = ({parent, type, attributes}) => {
    const newElement = document.createElement(type);

    setAttributes({element: newElement, attributes});
    
    parent.appendChild(newElement);
}