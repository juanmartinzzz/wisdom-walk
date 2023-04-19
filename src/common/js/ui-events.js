const expandersAndCollapsersEvents = () => {
    const collapsibles = Array.from(document.getElementsByClassName('collapsible'));

    collapsibles.map(collapsible => {
        const expanders = Array.from(collapsible.getElementsByClassName('expand'));
        const collapsers = Array.from(collapsible.getElementsByClassName('collapse'));

        expanders.map(expander => expander.addEventListener('click', () => {
            updateState({object: {ui:{[collapsible.id]:{collapsed: false}}}});
        }))
        
        collapsers.map(expand => expand.addEventListener('click', () => {
            updateState({object: {ui:{[collapsible.id]:{collapsed: true}}}});
        }))
    })
}

const stateTextareaEvents = () => {
    const stateTextarea = document.getElementById('state');
    stateTextarea.addEventListener('blur', ({target}) => state = JSON.parse(target.value));
}

const uiTriggers = () => {
    stateTextareaEvents();
    expandersAndCollapsersEvents();
}

uiTriggers();