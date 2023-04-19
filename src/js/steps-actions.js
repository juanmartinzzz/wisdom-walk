const addChildStep = ({step}) => {
    step.steps.unshift({...templateEmptyStep});

    renderSteps();
}

const generateResults = async ({step}) => {
    if('' === step.prompt.text.trim()) {
        return;
    }

    step.results.paragraphs = [];
    step.status = stepStatuses.loadingResults;
    renderSteps();
    
    // Call model API to generate results
    const completion = await getCompletion({prompt: step.prompt.text});
    step.results.paragraphs = analyzeModelResults({completion});
    
    step.status = stepStatuses.showingResults;
    
    renderSteps();
}

const updatePromptText = ({step, target}) => {
    // TODO: adjust height of textarea (target) by its contents, 
    // up to a maximum of N rows (after which content will be scrollable)

    step.prompt.text = target.value;
}

const toggleCollapseStep = ({step}) => {
    step.collapsed = !step.collapsed;
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