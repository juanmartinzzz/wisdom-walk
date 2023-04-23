const stepStatuses = {
    showOnlyPrompt: 'showOnlyPrompt',
    loadingResults: 'loadingResults',
    showingResults: 'showingResults',
}

const uiStyles = {
    cleanCards: 'Clean Cards',
    floatingWords: 'Floating Words',
    classicTypewritter: 'Classic Typewritter',
}

const templateEmptyMapInfo = {
    id: null,
    name: null,
}

const templateEmptyStep = {
    id: null,
    element: null,
    collapsed: false,
    status: stepStatuses.showOnlyPrompt,
    prompt: {
        text: ``,
    },
    results: {
        title: '',
        paragraphs: []
    },
    steps: [],
};