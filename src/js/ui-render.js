const udpateThemes = () => {
    document.getElementById('appTheme').href = `src/css/${state.config.appTheme}.css`;
    document.getElementById('colourTheme').href = `src/css/${state.config.colourTheme}.css`;
}

udpateThemes();