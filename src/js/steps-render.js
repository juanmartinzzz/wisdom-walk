// TODO: move to generic file, since method is used by all sections
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

const getNextStepActionButton = ({step, promptAction = null, promptBaseText, iconSvgId}) => {
    const title = promptAction && promptActionInstructions[promptAction].elementTitle;

    const nextStepActionButton = createElementWithAttributes({type: 'div', attributes: {class: 'action', title}});
    
    nextStepActionButton.addEventListener('click', () => addChildStep({step, promptAction, promptBaseText}));

    nextStepActionButton.appendChild(getIconSvg({id: iconSvgId}));

    return nextStepActionButton;
}

const getResultBody = ({step}) => {
    const body = createElementWithAttributes({type: 'div', attributes: {class: 'body'}});

    step.results.paragraphs.map(paragraph => {
        const paragraphElement = createElementWithAttributes({type: 'div', attributes: {class: 'paragraph', innerText: paragraph.text}});

        body.appendChild(paragraphElement);

        if(step.steps[0] && (!step.steps[0].results.paragraphs || step.steps[0].results.paragraphs.length === 0)) {
            return;
        }

        const promptBaseText = paragraph.text;

        const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});      
        const newStepUserDefined = getNextStepActionButton({step, promptAction: promptActions.userDefined, iconSvgId: iconSvgIds.messageIcon});
        const newStep = getNextStepActionButton({step, promptAction: promptActions.expand, promptBaseText, iconSvgId: iconSvgIds.continueIcon});
        const newStepSimpleWords = getNextStepActionButton({step, promptAction: promptActions.simpleWords, promptBaseText, iconSvgId: iconSvgIds.babyIcon});
        const newStepTimeline = getNextStepActionButton({step, promptAction: promptActions.historicalTimeline, promptBaseText, iconSvgId: iconSvgIds.clockIcon});
        const newStepBulletPoints = getNextStepActionButton({step, promptAction: promptActions.bulletPoints, promptBaseText, iconSvgId: iconSvgIds.bulletsIcon});

        [newStep, newStepSimpleWords, newStepBulletPoints, newStepTimeline, newStepUserDefined].map(element => actions.appendChild(element));
        paragraphElement.appendChild(actions);
    })

    return body;
}

const getResultFooter = ({step}) => {
    const promptBaseText = step.results.paragraphs.map(p => p.text).join(' ');

    const footer = createElementWithAttributes({type: 'div', attributes: {class: 'footer'}});
    const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
    const newStepUserDefined = getNextStepActionButton({step, promptAction: promptActions.userDefined, iconSvgId: iconSvgIds.messageIcon});
    const newStep = getNextStepActionButton({step, promptAction: promptActions.expand, promptBaseText, iconSvgId: iconSvgIds.continueIcon});
    const newStepSimpleWords = getNextStepActionButton({step, promptAction: promptActions.simpleWords, promptBaseText, iconSvgId: iconSvgIds.babyIcon});
    const newStepTimeline = getNextStepActionButton({step, promptAction: promptActions.historicalTimeline, promptBaseText, iconSvgId: iconSvgIds.clockIcon});
    const newStepBulletPoints = getNextStepActionButton({step, promptAction: promptActions.bulletPoints, promptBaseText, iconSvgId: iconSvgIds.bulletsIcon});

    [newStep, newStepSimpleWords, newStepBulletPoints, newStepTimeline, newStepUserDefined].map(element => actions.appendChild(element));
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