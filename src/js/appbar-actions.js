const changeConfig = ({target, object, key}) => {
    let newValue = null;

    // Special treatment for checkboxes
    if(target.type === 'checkbox') {
        if(target.checked) {
            newValue = true;
        } else {
            newValue = false;
        }
    } else {
        newValue = target.value !== '' ? target.value : null;
    }

    object[key] = newValue;
    storeAndReturn({key: 'config', value: JSON.stringify(state.config)});

    renderAppbar();

    // TODO: re-render the rest of the app, as configs can change anything
}

const toggleOpenMainMenu = () => {
    state.ui.appbar.status = (state.ui.appbar.status !== appbarStatuses.showMainMenu) ? appbarStatuses.showMainMenu : null;

    renderAppbar();
}