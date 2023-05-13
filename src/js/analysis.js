// TODO: centralize what to do whenever an error is received
const manageError = () => {
}

const analyzeMapNameResults = ({completion}) => {
    // error management
    if(completion.error) {
        const results = [];

        results.push(completion.error.type);
        results.push(completion.error.code);
        results.push(completion.error.message);

        return results.join(' - ');
    }

    // Split result into words, and limit to maximum 8 words
    return completion.choices[0].message.content.split(' ').slice(0,7).join(' ');
    
}

const analyzeModelResults = ({completion}) => {
    const paragraphs = [];

    // error management
    if(completion.error) {
        paragraphs.push({text: completion.error.type});
        paragraphs.push({text: completion.error.code});
        paragraphs.push({text: completion.error.message});

        return paragraphs;
    }

    completion.choices[0].message.content.split(/\n+/).map(paragraph => {
        const paragraphStartingWhitespacesDoubled = paragraph.replace('  ', '    ');
        paragraphs.push({text: paragraphStartingWhitespacesDoubled});
    });

    return paragraphs;
}