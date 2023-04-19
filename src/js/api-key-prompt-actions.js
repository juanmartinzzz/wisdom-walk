const updateApiKey = ({target}) => {
    // TODO: validate actual format of an OpenAI api key
    if(target.value.length < 20) {
        return;
    }

    state.config.apiKey = target.value;
    storeAndReturn({key: 'config', value: JSON.stringify(state.config)});

    renderApiKeyPrompt();
}