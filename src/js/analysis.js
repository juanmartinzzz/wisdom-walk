const analyzeModelResults = ({completion}) => {
    const paragraphs = [];

    // error management
    if(completion.error) {
        paragraphs.push({text: completion.error.type});
        paragraphs.push({text: completion.error.code});
        paragraphs.push({text: completion.error.message});

        return paragraphs;
    } 

    // TODO: slipt the message.content into different paragraphs by detecting endlines or other special characters in the response
    [1].map(item => paragraphs.push({text: completion.choices[0].message.content}));

    return paragraphs;
}