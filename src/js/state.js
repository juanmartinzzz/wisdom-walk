const state = {
    id: getValueOrDefault({key: 'id'})||storeAndReturn({key: 'id', value: `map-${Math.floor(Math.random()*99999999999999)}`}),
    config: JSON.parse(getValueOrDefault({key: 'config', defaultValue: JSON.stringify({
        apiKey: null,
        theme: 'light',
        uiStyle: uiStyles.cleanCards,
    })})),
    steps: JSON.parse(getValueOrDefault({key: 'steps', defaultValue: JSON.stringify([templateEmptyStep])})),
}