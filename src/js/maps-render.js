const renderMaps = () => {
    const maps = document.getElementById('maps');
    maps.innerHTML = '';

    const newMap = createElementWithAttributes({type: 'div', attributes: {class: 'map', innerText: '+'}});
    
    const newMapId = `map-${Math.floor(Math.random()*99999999999999)}`;
    newMap.addEventListener('click', () => changeMap({id: newMapId}));

    maps.appendChild(newMap);
    
    state.mapsInfo.map((mapInfo, index) => {
        const map = createElementWithAttributes({type: 'div', attributes: {class: 'map', innerText: `${index} ${mapInfo.name}`}});

        map.addEventListener('click', () => changeMap({id: mapInfo.id}));

        maps.append(map);
    })
}

renderMaps();