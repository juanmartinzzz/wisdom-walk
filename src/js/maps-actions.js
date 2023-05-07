const getNewMapId = () => {
    return `map-${Math.floor(Math.random() * 99999999999999)}`;
}

const importMap = () => {
    // Open dialog to import map
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    
    fileInput.onchange = ({target}) => {
        const reader = new FileReader();
        const file = target.files[0];
    
        reader.onload = ({target}) => {
            const map = JSON.parse(target.result);

            // Add the imported map to the list of saved maps
            const newMaps = state.maps;

            // TODO: condition adding a new map to the imported map not already being there (right now importing N times adds N maps to the list)
            newMaps.push({id: map.id, name: 'need to export the name genious'});
            state.maps = JSON.parse(storeAndReturn({key: 'maps', value: JSON.stringify(newMaps)}));

            // Save the map steps in local storage
            storeAndReturn({key: map.id, value: JSON.stringify(map.steps)});

            // Set the ID to the recently imported map
            state.id = storeAndReturn({key: 'id', value: map.id});

            renderMaps();

            renderMap();
        };
    
        reader.readAsText(file);
    };
    
    fileInput.click();
}

const exportMap = ({id}) => {
    const filename = `${id}.json`;
    const map = {
        id,
        steps: JSON.parse(getValueOrDefault({key: id})),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(map));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode); // required for Firefox
    
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
    if(state.id === id) {
        // Change id in state for something new
        state.id = storeAndReturn({key: 'id', value: getNewMapId()});
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