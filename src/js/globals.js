const stepStatuses = {
    showOnlyPrompt: 'showOnlyPrompt',
    loadingResults: 'loadingResults',
    showingResults: 'showingResults',
}

const templateEmptyStep = {
    element: null,
    collapsed: false,
    status: stepStatuses.showOnlyPrompt,
    prompt: {
        text: ``,
    },
    results: {
        title: '',
        paragraphs: [
            {text: ``,},
        ]
    },
    steps: [],
};