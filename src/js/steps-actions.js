const filterSteps = ({step, idToDelete}) => {
    if(!step.steps || step.steps.lenght === 0) {
        return;
    }

    const newSteps = step.steps.filter(childStep => (childStep.id !== idToDelete));
    newSteps.map(childStep => filterSteps({step: childStep, idToDelete}));

    step.steps = newSteps;
}

const removeStep = ({step}) => {
    const idToDelete = step.id;

    state.steps.map(childStep => filterSteps({step: childStep, idToDelete}));

    renderSteps();
}

const setStepToFocus = ({step}) => {
    state.ui.stepToFocusId = step.id;
}

const addChildStep = ({step, promptBaseText, promptAction}) => {
    // Don't add children while first child has no results
    if(step.steps[0] && (!step.steps[0].results.paragraphs || step.steps[0].results.paragraphs.length === 0)) {
        return;
    }

    // Deep clone template for a new Step
    const newStep = JSON.parse(JSON.stringify(templateEmptyStep));
    
    // Set initial step values
    newStep.id = `step-${Math.floor(Math.random() * 999999999999999)}`;
    newStep.depth = (step.depth + 1);

    // Set app focus on the new Step
    setStepToFocus({step: newStep});

    step.steps.unshift(newStep);

    if(promptBaseText) {
        newStep.prompt.text = getPromptText({promptBaseText, promptAction});

        generateResults({step: newStep});
    }

    renderSteps();
}

const generateResults = async ({step}) => {
    if('' === step.prompt.text.trim()) {
        return;
    }

    // Focus on the step where results will be generated
    setStepToFocus({step})

    step.results.paragraphs = [];
    step.status = stepStatuses.loadingResults;
    renderSteps();

    // Call model API to generate results
    const completion = await getCompletion({prompt: step.prompt.text});
    step.results.paragraphs = analyzeModelResults({completion});

    step.status = stepStatuses.showingResults;

    // If the step is the initial step of its map
    const currentStepIsInitialStepOfMap = (step.depth === 0);
    if(currentStepIsInitialStepOfMap) {
        ensureMapIsSaved({id: state.id, prompt: step.prompt});
    }

    renderSteps();
}

const updatePromptText = ({step, target}) => {
    // TODO: adjust height of textarea (target) by its contents, 
    // up to a maximum of N rows (after which content will be scrollable)

    step.prompt.text = target.value;
}

const toggleCollapseStep = ({step}) => {
    step.collapsed = !step.collapsed;
    setStepToFocus({step});

    renderSteps();
}

const toggleCollapseColumn = ({step}) => {
    if(!step.steps || step.steps.length === 0) {
        return;
    }

    const shouldBeCollapsed = !(step.steps[0].collapsed)
    step.steps.map(step => step.collapsed = shouldBeCollapsed);

    renderSteps();
}

const collapseChildren = ({step, shouldBeCollapsed}) => {
    if(!step.steps || step.steps.lenght === 0) {
        return;
    }

    step.steps.map(step => {
        step.collapsed = shouldBeCollapsed;
        collapseChildren({step, shouldBeCollapsed});
    });
}

const toggleCollapseColumnAndToTheRight = ({step}) => {
    if(!step.steps || step.steps.lenght === 0) {
        return;
    }

    const shouldBeCollapsed = !(step.steps[0].collapsed)

    collapseChildren({step, shouldBeCollapsed});
    renderSteps();
}