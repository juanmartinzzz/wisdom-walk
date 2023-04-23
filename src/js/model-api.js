const testingMessageContents = [`Lorem Ipsum Adventures, more like Borem Ipsum Adventures, am I right? This game is about as exciting as watching paint dry on a wall. The graphics are dull, the gameplay is sluggish, and the storyline is non-existent. You play as a blank character who goes around doing meaningless tasks for no reason. I've had more fun playing tic-tac-toe with my baby brother when he was 3 months old.
I don't know who thought this game was a good idea, but they need to go back to primary school. There's no challenge, no thrill, no excitement. It's just a mindless button-mashing exercise with no payoff. You know a game is bad when the loading screens are more interesting than the actual gameplay.
The only redeeming quality of Lorem Ipsum Adventures is its soundtrack, and even that gets old after five minutes. The music is the only thing that keeps you from falling asleep while playing this snoozefest. I'd rather listen to my grandmother snore for an hour.
If you're looking for a game that will keep you engaged and entertained, look elsewhere. This game is about as exciting as a root canal.`,
`In "Lorem Ipsum Adventures," the player is presented with a vast world to explore, full of possibilities and secrets. The game's attention to detail is remarkable, with each pixel and sound carefully crafted to create a cohesive and immersive experience. The player is invited to unravel the mysteries of this world at their own pace, and to savor every moment of the journey.
The storyline of "Lorem Ipsum Adventures" is a testament to the creativity of its developers. It weaves together elements of fantasy, adventure, and introspection into a rich tapestry of narrative. The player is confronted with questions of identity, purpose, and destiny, as they traverse a landscape that is both familiar and strange. The game's ending is both satisfying and poignant, leaving the player with a sense of wonder and awe at the depth of the human imagination.`,
`Playing "Lorem Ipsum Adventures" is not just a game, it's a transformative experience that will unlock the secret to happiness. Every moment spent in this world is a step towards self-discovery and enlightenment.
Through the challenges presented in "Lorem Ipsum Adventures," you will learn to overcome adversity and find joy in the journey.
The game's vibrant world will ignite your senses and inspire you to live life to the fullest.`,
`Short answer in only one paragraph simulated here for testing purposes.`];

// ChatGPT config
// TODO: move to state and add UI advanced options to modify
const config = {
    role: 'user',
    temperature: 0.7,
    model: 'gpt-3.5-turbo',
    completionsEndpoint: 'https://api.openai.com/v1/chat/completions',
}

const getCompletion = async ({ prompt }) => {
    if (state.config.testingMode) {
        return { choices: [{ message: { content: testingMessageContents[Math.floor(Math.random() * testingMessageContents.length)]} }] };
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