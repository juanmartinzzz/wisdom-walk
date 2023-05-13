const iconSvgIds = {
    babyIcon : 'babyIcon',
    clockIcon : 'clockIcon',
    messageIcon : 'messageIcon',
    bulletsIcon : 'bulletsIcon',
    continueIcon : 'continueIcon',
}

const appbarStatuses = {
    showMainMenu: 'showMainMenu',
}

const promptActions = {
    expand: 'expand',
    userDefined: 'userDefined',
    simpleWords: 'simpleWords',
    bulletPoints: 'bulletPoints',
    suggestTitle: 'suggestTitle',
    historicalTimeline: 'historicalTimeline',
}

const promptActionInstructions = {
    [promptActions.suggestTitle]: {before: `Provide a very short title of maximum 5 words for the following prompt
----------
`, after: ``},
    [promptActions.expand]: {before: `expand and provide detailed information about this
---------- 
`, after: ``, elementTitle: 'Get more detailed info about this.'},
    [promptActions.userDefined]: {before: ``, after: ``, elementTitle: 'Learn more by writing your own question or prompt.'},
    [promptActions.bulletPoints]: {before: `For the main topic or topics treated in the following text, list their main areas or subdivisions using bullet points
----------
`, after: ``, elementTitle: 'List the main subdivisions or areas of the topic.'},
    [promptActions.simpleWords]: {before: `Re-write the main idea or ideas in the following text using very simple words, as if explaining them to a child
----------
`, after: ``, elementTitle: 'Simplify the language of this answer.'},
    [promptActions.historicalTimeline]: {before: `For the main topic or topics treated in the following text, list all relevant events in chronological order including dates if possible
----------
`, after: ``, elementTitle: 'List in chronological order the main events related to this.'}
}

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

const templateEmptyMaps = [];

const templateEmptyStep = {
    id: null,
    depth: 0,
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