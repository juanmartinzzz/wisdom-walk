const updateApiKey = ({target}) => {
    // TODO: validate actual format of an OpenAI api key
    if(target.value.length < 20) {
        return;
    }

    state.apiKey = storeAndReturn({key: 'apiKey', value: target.value});

    console.log({state});
}