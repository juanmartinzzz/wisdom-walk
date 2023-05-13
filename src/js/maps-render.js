const getMapButton = ({id, innerText}) => {
    const isCurrent = state.id === id;

    const mapButton = createElementWithAttributes({type: 'div', attributes: {class: `mapButton ${isCurrent ? 'current' : ''}`}});
    const title = createElementWithAttributes({type: 'div', attributes: {innerText}});
    const actions = createElementWithAttributes({type: 'div', attributes: {class: 'actions'}});
    const remove = createElementWithAttributes({type: 'div', attributes: {class: 'action'}});
    const exportAction = createElementWithAttributes({type: 'div', attributes: {class: 'action'}});

    remove.addEventListener('click', (event) => {event.stopPropagation(); removeMap({id})});
    exportAction.addEventListener('click', (event) => {event.stopPropagation(); exportMap({id})});

    remove.append(getIconSvg({id: 'removeIcon'}));
    exportAction.append(getIconSvg({id: 'exportIcon'}));
    [remove, exportAction].map(element => actions.append(element));
    [title, actions].map(element => mapButton.append(element));

    return mapButton;
}

const renderMaps = () => {
    const maps = document.getElementById('maps');
    maps.innerHTML = '';

    // Add a new map button
    const newMapButton = createElementWithAttributes({ type: 'div', attributes: { class: 'mapButton new', innerText: '+' } });
;
    newMapButton.addEventListener('click', () => changeMap({ id: getNewMapId() }));

    maps.appendChild(newMapButton);

    // Add a button for each map in memory
    state.maps.map((map, index) => {
        const newMapButton = getMapButton({ id: map.id, innerText: `${map.name !== 'null' ? map.name : index}` });

        newMapButton.addEventListener('click', () => changeMap({ id: map.id }));

        maps.append(newMapButton);
    })
}

renderMaps();