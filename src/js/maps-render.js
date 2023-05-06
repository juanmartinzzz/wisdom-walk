const getMapButton = ({id, innerText}) => {
    const isCurrent = state.id === id;

    const mapButton = createElementWithAttributes({type: 'div', attributes: {class: `mapButton ${isCurrent ? 'current' : ''}`}});
    const title = createElementWithAttributes({type: 'div', attributes: {innerText}});
    const actions = createElementWithAttributes({type: 'div'});
    const remove = createElementWithAttributes({type: 'div'});

    remove.addEventListener('click', (event) => {event.stopPropagation(); removeMap({id})});

    remove.append(getIconSvg({id: 'removeIcon'}));
    actions.append(remove);
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
        const newMapButton = getMapButton({ id: map.id, innerText: `${index} ${map.name !== 'null' ? map.name : ''}` });

        newMapButton.addEventListener('click', () => changeMap({ id: map.id }));

        maps.append(newMapButton);
    })
}

renderMaps();