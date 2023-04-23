const getIconSvg = ({id}) => {
    return document.getElementById(id).cloneNode(true);
}

const getPromptTextarea = ({value}) => {
    const textarea = createElementWithAttributes({type: 'textarea', attributes: {style: `height: auto;`, innerHTML: value}});
    // textarea.style.height = `${textarea.scrollHeight}px`;

    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    });

    // const rows = (textarea.value.split("\n").length < 10) ? textarea.value.split("\n").length : 10;
    // textarea.setAttribute('rows', rows);

    return textarea;
}

const getPrompt = ({step}) => {
    const prompt = createElementWithAttributes({type: 'div', attributes: {class: 'prompt'}});
    const textarea = getPromptTextarea({value: step.prompt.text})
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

        body.appendChild(paragraphElement);

        if(step.steps[0] && (!step.steps[0].results.paragraphs || step.steps[0].results.paragraphs.length === 0)) {
            return;
        }

        const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
        const newStepBasedOnParagraph = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Learn more about this paragraph.'}});
        const newStepBasedOnParagraphMainAreas = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Generate a list of the main areas of this subject.'}});
        const newStepBasedOnParagraphUserDefined = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Learn more about this paragraph, by writing your own question or prompt.'}});

        newStepBasedOnParagraph.addEventListener('click', () => addChildStep({step, promptText: `${paragraph.text} ------- expand about each of the topics in the text`}));
        newStepBasedOnParagraphMainAreas.addEventListener('click', () => addChildStep({step, promptText: `${paragraph.text} ------- using bullet points, tell me what are the main areas or subdivisions of the topic that the text talks about, and give me information about each one of them`}));
        newStepBasedOnParagraphUserDefined.addEventListener('click', () => addChildStep({step}));

        newStepBasedOnParagraph.appendChild(getIconSvg({id: 'continueIcon'}));
        newStepBasedOnParagraphMainAreas.appendChild(getIconSvg({id: 'bulletsIcon'}));
        newStepBasedOnParagraphUserDefined.appendChild(getIconSvg({id: 'messageIcon'}));
        [newStepBasedOnParagraph, newStepBasedOnParagraphMainAreas, newStepBasedOnParagraphUserDefined].map(element => actions.appendChild(element));
        paragraphElement.appendChild(actions);
    })

    return body;
}

const getResultFooter = ({step}) => {
    const footer = createElementWithAttributes({type: 'div', attributes: {class: 'footer'}});
    const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
    const newStepUserDefined = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Learn more about this topic, by writing your own question or prompt.'}});
    const newStepSimpleWords = createElementWithAttributes({type: 'div', attributes: {class: 'action', title: 'Simplify the language of this answer.'}});

    newStepUserDefined.addEventListener('click', () => addChildStep({step}));
    newStepSimpleWords.addEventListener('click', () => addChildStep({step, promptText: `${step.results.paragraphs.map(p => p.text).join(' ')} ------- can you re-write this idea using simple words, as if you were explaining it to a child?`}));

    newStepUserDefined.appendChild(getIconSvg({id: 'messageIcon'}));
    newStepSimpleWords.appendChild(getIconSvg({id: 'babyIcon'}));
    [newStepSimpleWords, newStepUserDefined].map(element => actions.appendChild(element));
    footer.appendChild(actions);

    return footer;
}

const getStep = ({step}) => {
    const stepElement = createElementWithAttributes({type: 'div', attributes: {class: `step ${step.status} ${(step.collapsed ? 'collapsed' : '')}`}});

    // If this step should be brought into view (i.e. was the last one created)
    if(step.id === state.ui.stepToFocusId) {
        state.ui.stepToFocusElement = stepElement;
    }

    // Build results section
    const results = createElementWithAttributes({type: 'div', attributes: {class: 'results'}});
    
    [getResultHeader({step})].map(element => results.appendChild(element));

    // Add prompt section if step does not have child steps 
    if(!(step.steps && step.steps.length > 0)) {
        [getPrompt({step})].map(element => results.appendChild(element));
    }
    [getResultBody({step}), getResultFooter({step})].map(element => results.appendChild(element));
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

const scrollStepIntoView = () => {
    if(!state.ui.stepToFocusElement) {
        return;
    }

    state.ui.stepToFocusElement.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"});
}

const setTexareasHeight = () => {
    const maxHeightInPixels = 80;

    Array.from(document.getElementsByTagName('textarea')).map(textarea => {
        textarea.style.height = 'auto'; 
        textarea.style.height = `${(textarea.scrollHeight < maxHeightInPixels) ? textarea.scrollHeight : maxHeightInPixels}px`;
    });
}

const renderSteps = () => {
    const map = document.getElementById('map');
    map.innerHTML = '';
    
    const steps = getSteps({steps: state.steps});
    steps.map(step => map.appendChild(step));

    // Operations that need to be done after elements render
    scrollStepIntoView();
    setTexareasHeight();

    // TODO: save steps to the cloud if the User is logged
    // Only if steps render, save them to local storage
    storeAndReturn({key: state.id, value: JSON.stringify(state.steps)});

}