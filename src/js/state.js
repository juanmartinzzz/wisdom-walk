const state = {
    map: {
        id: null,
        name: null,
        steps: [],
    },
    id: getValueOrDefault({key: 'id'})||storeAndReturn({key: 'id', value: `map-${Math.floor(Math.random()*99999999999999)}`}),
    config: JSON.parse(getValueOrDefault({key: 'config', defaultValue: JSON.stringify({
        apiKey: null,
        appTheme: 'one',
        colourTheme: 'light',
        testingMode: true,
        uiStyle: uiStyles.cleanCards,
        advanced: {
            role: 'user',
            temperature: 0.7,
            model: 'gpt-3.5-turbo',
            endpoint: 'https://api.openai.com/v1/chat/completions',
        }
    })})),
    maps: JSON.parse(getValueOrDefault({key: 'maps'})||storeAndReturn({key: 'maps', value: JSON.stringify(templateEmptyMaps)})),
    // I think steps could now be set to null here, since rendering process now retrieves steps from localStorage
    steps: JSON.parse(getValueOrDefault({key: getValueOrDefault({key: 'id'}), defaultValue: JSON.stringify([templateEmptyStep])})),
    ui: {
        appbar: {
            status: null,
        },
        stepToFocusId: null,
        stepToFocusElement: null,
    }
}