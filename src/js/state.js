const state = {
    map: {
        id: null,
        name: null,
        steps: [],
    },
    id: getValueOrDefault({key: 'id'})||storeAndReturn({key: 'id', value: `map-${Math.floor(Math.random()*99999999999999)}`}),
    config: JSON.parse(getValueOrDefault({key: 'config', defaultValue: JSON.stringify({
        apiKey: null,
        theme: 'light',
        testingMode: false,
        uiStyle: uiStyles.cleanCards,
    })})),
    // I think steps could now be set to null here, since rendering process now retrieves steps from localStorage
    steps: JSON.parse(getValueOrDefault({key: getValueOrDefault({key: 'id'}), defaultValue: JSON.stringify([templateEmptyStep])})),
    mapsInfo: JSON.parse(getValueOrDefault({key: 'mapsInfo'})||storeAndReturn({key: 'mapsInfo', value: JSON.stringify([{...templateEmptyMapInfo, id: getValueOrDefault({key: 'id'}), name: 'First mind map'}])})),
    ui: {
        stepToFocusId: null,
        stepToFocusElement: null,
    }
}