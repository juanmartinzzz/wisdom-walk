const renderApiKeyPrompt = () => {
    const apiKeyPrompt = document.getElementById('apiKeyPrompt');
    apiKeyPrompt.classList.add('hidden');
    apiKeyPrompt.innerHTML = '';
    
    if(state.config.apiKey) {
        return;
    }

    apiKeyPrompt.classList.remove('hidden');
    const instructions = createElementWithAttributes({ type: 'div', attributes: { id: 'instructions', innerText: 'Please input your Open AI Api Key'}});
    const link = createElementWithAttributes({ type: 'a', attributes: { href: 'https://www.youtube.com/watch?v=_vEJ07K0VPs', target:'_blank', innerText: 'Here\'s how to get it' } });
    const videoIconSvg = document.getElementById('videoIcon').cloneNode(true);
    const input = createElementWithAttributes({ type: 'input', attributes: { value: state.config.apiKey||'', placeholder: 'sk-gahyjfwrFar7m1D8G44JKOPlbgUKlCYyUeREpLOfPcE0oxx2' } });

    input.addEventListener('change', updateApiKey);

    link.prepend(videoIconSvg);
    instructions.appendChild(link);
    [instructions, input].map(element => apiKeyPrompt.appendChild(element));
}

renderApiKeyPrompt();