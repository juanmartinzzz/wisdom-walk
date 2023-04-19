const state = {
    apiKey: getValueOrDefault({key: 'apiKey', defaultValue: null}),
    steps: [{
        element: null,
        collapsed: false,
        status: stepStatuses.showOnlyPrompt,
        prompt: {
            text: '',
        },
        results: {
            title: '',
            paragraphs: []
        },
        steps: [],
    }]
}