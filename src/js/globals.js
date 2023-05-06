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
    historicalTimeline: 'historicalTimeline',
}

const promptActionInstructions = {
    [promptActions.expand]: {before: `Provide more detailed information about the main topic or topics treated in the following text
---------- 
---------- 
`, after: ``, elementTitle: 'Get more info about this.'},
    [promptActions.userDefined]: {before: ``, after: ``, elementTitle: 'Learn more by writing your own question or prompt.'},
    [promptActions.bulletPoints]: {before: `Using bullet points, list the main areas or subdivisions of each one of the main topics in the following text
----------
----------
`, after: ``, elementTitle: 'List the main subdivisions or areas of the topic.'},
    [promptActions.simpleWords]: {before: `Re-write the main idea or ideas in the following text using very simple words, as if explaining the meaning of the text to a child
----------
----------
`, after: ``, elementTitle: 'Simplify the language of this answer.'},
    [promptActions.historicalTimeline]: {before: `List all relevant events related to the main topic that the following text talks about, in chronological order, including dates wherever possible
----------
----------
`, after: ``, elementTitle: 'List in chronological order the main events related to the topic in this paragraph.'}
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