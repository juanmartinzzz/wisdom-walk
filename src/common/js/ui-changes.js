/**
 * #state element's value gets updated with 
 */
const updateStateTextarea = () => {
    const stateTextarea = document.getElementById('state');
    if(!stateTextarea || (stateTextarea === document.activeElement)) {
        return;
    } 
    
    stateTextarea.value = JSON.stringify(state, null, 2);
}

const updateElementsVisibility = () => {
    // Get the name of all properties in state.ui that have innerText
    const uiPropertiesWithShow = Object.keys(state.ui).filter(property => state.ui[property].hasOwnProperty('show'));
    
    // If there is a matching element with id, change its innerText
    uiPropertiesWithShow.map(property => {
        const element = document.getElementById(property);
        if(!element) {
            return;
        }

        state.ui[property].show ? element.classList.remove('hidden') : element.classList.add('hidden');
    })
}

const updateElementsTexts = () => {
    // Get the name of all properties in state.ui that have innerText
    const uiPropertiesWithInnerText = Object.keys(state.ui).filter(property => state.ui[property].hasOwnProperty('innerText'));

    // If there is a matching element with id, change its innerText
    uiPropertiesWithInnerText.map(property => {
        const element = document.getElementById(property);
        if(!element) {
            return;
        }

        element.innerText = state.ui[property].innerText;
    })
}

/**
 * .collapsible elements and any .collapse children are hidden or shown 
 * depending on the value of the `collapsed` property found in state.ui.<element-id>
 */
const updateCollapsibles = () => {
    const collapsibles = Array.from(document.getElementsByClassName('collapsible'));
    
    collapsibles.map(collapsible => {
        try {
            const isCollapsed = state.ui[collapsible.id].collapsed;
    
            // remove all collapse-related classes
            collapsible.classList.remove('expanded');
            collapsible.classList.remove('collapsed');
            
            // set class collapsed/expanded depending on state
            if(isCollapsed) {
                collapsible.classList.add('collapsed');
            } else {
                collapsible.classList.add('expanded');
            }
    
            // children if class .collapses and .expands
            collapsers = Array.from(collapsible.getElementsByClassName('collapse'));
            expanders = Array.from(collapsible.getElementsByClassName('expand'));
            // hide or show depending on whether the parent is collapsed
            collapsers.map(collapsing => isCollapsed ? collapsing.classList.add('hidden') : collapsing.classList.remove('hidden'))
            expanders.map(collapsing => isCollapsed ? collapsing.classList.remove('hidden') : collapsing.classList.add('hidden'))
        } catch(e) {}
    })
}

const uiChanges = () => {
    updateStateTextarea();

    updateCollapsibles();

    updateElementsVisibility();

    updateElementsTexts();

    setTimeout(uiChanges, 500);
}

uiChanges();