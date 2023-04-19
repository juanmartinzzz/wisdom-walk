const getIconSvg = ({id}) => {
    return document.getElementById(id).cloneNode(true);
}

const getPrompt = ({step}) => {
    const prompt = createElementWithAttributes({type: 'div', attributes: {class: 'prompt'}});
    const textarea = createElementWithAttributes({type: 'textarea', attributes: {rows: '1', innerHTML: step.prompt.text}});
    const sendIconSvg = getIconSvg({id: 'sendIcon'});

    textarea.addEventListener('change', ({target}) => updatePromptText({step, target}));

    sendIconSvg.addEventListener('click', () => {
        generateResults({step});
    });

    [textarea, sendIconSvg].map(element => prompt.appendChild(element));

    return prompt;
}

const getRightLaneSearch = ({step}) => {
    const search = createElementWithAttributes({type: 'div', attributes: {class: 'search'}});
    const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
    const actionToggleCollapseColumn = createElementWithAttributes({type: 'div', attributes: {class: 'action', innerText: 'column'}});
    const actionToggleCollapseColumnAndToTheRight = createElementWithAttributes({type: 'div', attributes: {class: 'action', innerText: 'following columns'}});
    [actionToggleCollapseColumn, actionToggleCollapseColumnAndToTheRight].map(element => actions.appendChild(element));
    [actions].map(element => search.appendChild(element));

    actionToggleCollapseColumn.addEventListener('click', () => toggleCollapseColumn({step}));
    actionToggleCollapseColumnAndToTheRight.addEventListener('click', () => toggleCollapseColumnAndToTheRight({step}));

    return search;
}

const getResultHeader = ({step}) => {
    const header = createElementWithAttributes({type: 'div', attributes: {class: 'header'}});
    const title = createElementWithAttributes({type: 'div', attributes: {class: 'title', innerText: step.prompt.text}});
    const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
    const actionExpand = createElementWithAttributes({type: 'div', attributes: {class: 'action'}});
    const actionRemove = createElementWithAttributes({type: 'div', attributes: {class: 'action'}});
    
    actionExpand.addEventListener('click', () => toggleCollapseStep({step}));
    actionRemove.addEventListener('click', () => removeStep({step}));
    
    actionExpand.appendChild(getIconSvg({id: 'expandIcon'}));
    actionRemove.appendChild(getIconSvg({id: 'removeIcon'}));
    [actionRemove, actionExpand].map(element => actions.appendChild(element));
    [title, actions].map(element => header.appendChild(element));
    
    return header;
}

const getResultBody = ({step}) => {
    const body = createElementWithAttributes({type: 'div', attributes: {class: 'body'}});

    step.results.paragraphs.map(paragraph => {
        const paragraphElement = createElementWithAttributes({type: 'div', attributes: {class: 'paragraph', innerText: paragraph.text}});
        const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
        const newStepBasedOnParagraph = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Learn more about this'}});
        const newStepBasedOnParagraphMainAreas = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Generate a list of the main areas of this subject'}});
        const newStepBasedOnParagraphUserDefined = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Learn more about this, by writing your own question or prompt'}});

        newStepBasedOnParagraph.addEventListener('click', () => addChildStep({step}));
        newStepBasedOnParagraphMainAreas.addEventListener('click', () => addChildStep({step}));
        newStepBasedOnParagraphUserDefined.addEventListener('click', () => addChildStep({step}));
        [newStepBasedOnParagraph, newStepBasedOnParagraphMainAreas, newStepBasedOnParagraphUserDefined].map(element => actions.appendChild(element));
        paragraphElement.appendChild(actions);
        body.appendChild(paragraphElement);
    })

    return body;
}

const getResultFooter = ({step}) => {
    const footer = createElementWithAttributes({type: 'div', attributes: {class: 'footer'}});
    const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
    const action1 = createElementWithAttributes({type: 'div', attributes: {class: 'action', innerText: 'New step'}});

    action1.addEventListener('click', () => addChildStep({step}));
    
    [action1].map(element => actions.appendChild(element));
    footer.appendChild(actions);

    return footer;
}

const getStep = ({step}) => {
    const stepElement = createElementWithAttributes({type: 'div', attributes: {class: `step ${step.status} ${(step.collapsed ? 'collapsed' : '')}`}});
    
    // Only add 'prompt' section if step does not have child steps 
    if(!(step.steps && step.steps.length > 0)) {
        [getPrompt({step})].map(element => stepElement.appendChild(element));
    }
    
    // Build 'results' section
    const results = createElementWithAttributes({type: 'div', attributes: {class: 'results'}});
    [getResultHeader({step}), getResultBody({step}), getResultFooter({step})].map(element => results.appendChild(element));
    [results].map(element => stepElement.appendChild(element));

    return stepElement;
}

const getSteps = ({steps}) => {
    return steps.map(step => {
        const double = createElementWithAttributes({type: 'div', attributes: {class: 'double'}});
        
        // Build the left lane (contains only the current step)
        const leftLane = createElementWithAttributes({type: 'div', attributes: {class: 'lane'}});
        leftLane.appendChild(getStep({step}));
        
        // Build the right lane (contains a search section, and all its child steps)
        const rightLane = createElementWithAttributes({type: 'div', attributes: {class: 'lane'}});
        if(step.steps && step.steps.length > 0) {
            rightLane.appendChild(getRightLaneSearch({step}));
            getSteps({steps: step.steps}).map(childStep => rightLane.appendChild(childStep));
        }

        [leftLane, rightLane].map(element => double.appendChild(element));
        
        return double;
    })
}

const renderSteps = () => {
    const map = document.getElementById('map');
    
    map.innerHTML = '';
    const steps = getSteps({steps: state.steps});
    steps.map(step => map.appendChild(step));

    // TODO: save steps to the cloud if the User is logged
    // Only if steps render, save them to local storage
    storeAndReturn({key: 'steps', value: JSON.stringify(state.steps)});

}

renderSteps();