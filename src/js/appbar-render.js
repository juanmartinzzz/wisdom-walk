const formElements = {
    apiKey: null,
    appTheme: ['one', 'two'],
    colourTheme: ['light', 'dark'],
    testingMode: true,
    uiStyle: uiStyles.cleanCards,
};

const getFormFromJson = ({configObject, formElements, className}) => {
    const form = createElementWithAttributes({type: 'div', attributes: {class: className}});
    console.log({configObject});
    
    // if there is configuration for the form elements themselves, use that instead of the configObject itself
    object = formElements ? formElements : configObject;

    Object.keys(object).map(key => {
        // TODO: make it smarter and create a textarea of other input types depending on the property's value
        const field = createElementWithAttributes({type: 'div', attributes: {name: key, value: object[key]}});
        const label = createElementWithAttributes({type: 'label', attributes: {for: key, innerText: key}});

        let input;
        const inputTypeMap = {
            boolean: 'checkbox',
            number: 'number',
            string: 'text',
            object: 'text',
        };
        // Create the appropriate input type
        if (!Array.isArray(object[key])) {
            input = createElementWithAttributes({type: 'input', attributes: {type: inputTypeMap[typeof object[key]], name: key, value: object[key] ? object[key] : ''}});
        } else if (Array.isArray(object[key])) {
            input = createElementWithAttributes({type: 'select', attributes: {name: key, value: object[key] ? object[key] : ''}});
            object[key].map(option => input.appendChild(createElementWithAttributes({type: 'option', attributes: {value: option, innerText: option}})));
        }

        input.addEventListener('change', ({target}) => changeConfig({target, object: configObject, key}));

        [label, input].map(element => field.appendChild(element));
        form.appendChild(field);
    });

    return form;
}

const getMainMenu = () => {
    const options = createElementWithAttributes({type: 'div'});
    const normal = createElementWithAttributes({type: 'div'});
    const advancedSpacer = createElementWithAttributes({type: 'div', attributes: {innerHTML: '<br />'}});
    const advancedTitle = createElementWithAttributes({type: 'div', attributes: {innerText: 'Advanced'}});
    const advanced = createElementWithAttributes({type: 'div'});

    normal.appendChild(getFormFromJson({configObject: state.config, formElements: formElements, className: 'fields'}));
    advanced.appendChild(getFormFromJson({configObject: state.config.advanced, className: 'fields'}));

    [normal, advancedSpacer, advancedTitle, advanced].map(element => options.appendChild(element));

    return options;
}

const getImportButton = () => {

}

const renderAppbar = () => {
    const appbar = document.getElementById('appbar');
    appbar.innerHTML = '';

    if (state.ui.appbar.status === appbarStatuses.showMainMenu) {
        appbar.classList.add(appbarStatuses.showMainMenu);
    } else {
        appbar.classList.remove(appbarStatuses.showMainMenu);
    }

    const icons = createElementWithAttributes({type: 'div', attributes: {class: 'icons'}});
    const mainMenuButton = createElementWithAttributes({type: 'div'});
    const mainMenu = createElementWithAttributes({type: 'div', attributes: {class: 'mainMenu'}});
    const importMapButton = createElementWithAttributes({type: 'div'});
    
    mainMenuButton.addEventListener('click', toggleOpenMainMenu);
    importMapButton.addEventListener('click', importMap);
    
    mainMenu.appendChild(getMainMenu());
    mainMenuButton.appendChild(getIconSvg({id: 'configIcon'}));
    importMapButton.appendChild(getIconSvg({id: 'importIcon'}));
    [mainMenuButton, importMapButton].map(element => icons.appendChild(element));
    [icons, mainMenu].map(element => appbar.appendChild(element));
}

renderAppbar();