const getFormFromJson = ({object, className}) => {
    const form = createElementWithAttributes({type: 'div', attributes: {class: className}});

    Object.keys(object).map(key => {
        if(object[key] && typeof object[key] === 'object') {
            return;
        }

        // TODO: make it smarter and create a textarea of other input types depending on the property's value
        const field = createElementWithAttributes({type: 'div', attributes: {name: key, value: object[key]}});
        const input = createElementWithAttributes({type: 'input', attributes: {name: key, value: object[key] ? object[key] : ''}});
        const label = createElementWithAttributes({type: 'label', attributes: {for: key, innerText: key}});

        if (typeof object[key] === "boolean") {
            input.setAttribute("type", "checkbox");
            input.checked = object[key];
        } else if (typeof object[key] === "number") {
            input.setAttribute("type", "number");
        } else if (typeof object[key] === "string") {
            input.setAttribute("type", "text");
        }

        input.addEventListener('change', ({target}) => changeConfig({target, object, key}));

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

    normal.appendChild(getFormFromJson({object: state.config, className: 'fields'}));
    advanced.appendChild(getFormFromJson({object: state.config.advanced, className: 'fields'}));

    [normal, advancedSpacer, advancedTitle, advanced].map(element => options.appendChild(element));

    return options;
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
    
    mainMenuButton.addEventListener('click', toggleOpenMainMenu);
    
    mainMenu.appendChild(getMainMenu());
    mainMenuButton.appendChild(getIconSvg({id: 'menuIcon'}));
    [mainMenuButton].map(element => icons.appendChild(element));
    [icons, mainMenu].map(element => appbar.appendChild(element));
}

renderAppbar();