// ChatGPT config
// TODO: move to state and add UI advanced options to modify
const config = {
    role: 'user',
    temperature: 0.7,
    testingMode: false,
    model: 'gpt-3.5-turbo',
    completionsEndpoint: 'https://api.openai.com/v1/chat/completions',
}

const getCompletion = async ({ prompt }) => {
    if (config.testingMode) {
        return { choices: [{ message: { content: 'Immediate response generated for test mode. Made longer so that it simulates the typical length of a true response from the model. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum.' } }] };
    }

    const content = prompt;
    const response = await fetch(config.completionsEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model,
            // temperature: config.temperature,
            messages: [{ role: config.role, content }]
        })
    });

    const data = await response.json();
    console.log({ data });

    return data;
}
