const analyzeModelResults = ({completion}) => {
    const paragraphs = [];

    // error management
    if(completion.error) {
        paragraphs.push({text: completion.error.type});
        paragraphs.push({text: completion.error.code});
        paragraphs.push({text: completion.error.message});

        return paragraphs;
    }

    completion.choices[0].message.content.split(/\n+/).map(paragraph => paragraphs.push({text: paragraph}));

    return paragraphs;
}