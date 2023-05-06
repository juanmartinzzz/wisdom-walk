const getNewMapId = () => {
    return `map-${Math.floor(Math.random() * 99999999999999)}`;
}

const ensureMapIsSaved = ({id, prompt}) => {
    const newMaps = state.maps;
    const currentMap = newMaps.filter(map => map.id === id)[0];
    
    // TODO: Request the model to generate a good name for the mind-map, based on the prompt
    // const name = await getCompletion({prompt: prompt.text});
    const name = `Mind map (ID ${Math.floor(Math.random()*9999)})`;

    if(currentMap) {
        currentMap.name = name;
    } else {
        newMaps.push({
            id,
            name,
        });
    }
    
    state.maps = JSON.parse(storeAndReturn({key: 'maps', value: JSON.stringify(newMaps)}));

    renderMaps();
}

const removeMap = ({id}) => {
    // If map to be removed is the current one
    console.log({stateId: state.id, idToRemove: id});
    if(state.id === id) {
        // Change id in state for something new
        state.id = storeAndReturn({key: 'id', value: getNewMapId()});
        console.log({stateId: state.id});
    }

    // Remove map from memory? Not removing results in soft-delete for the local-only version. 
    // A later version that stores maps in the Cloud could use a different soft-delete strategy
    // storeAndReturn({key: id, value: null});

    // Remove map info
    state.maps = JSON.parse(storeAndReturn({key: 'maps', value: JSON.stringify(state.maps.filter(map => map.id !== id))}));
    
    // Re-render maps
    renderMaps();
    
    // Re-render active map and steps
    renderMap();
}

const changeMap = ({id}) => {
    state.id = id;

    storeAndReturn({key: 'id', value: state.id});

    renderMaps();

    renderMap();
}