const getNewMapId = () => {
    return `map-${Math.floor(Math.random() * 99999999999999)}`;
}

const ensureMapIsSaved = ({id, prompt}) => {
    const newMaps = state.maps;
    const currentMap = newMaps.filter(map => map.id === id)[0];
    const name = `Mind map (ID ${Math.floor(Math.random()*9999)})`;
    
    // TODO: Request the model to generate a good name for the mind-map, based on the prompt
    // const name = await getCompletion({prompt: prompt.text});

    if(!currentMap) {
        newMaps.push({
            id,
            name,
        });
    } else {
        currentMap.name = name;
    }
    
    state.maps = JSON.parse(storeAndReturn({key: 'maps', value: JSON.stringify(newMaps)}));

    renderMaps();
}

const removeMap = ({id}) => {
    // If map to be removed is the current one
    if(state.id === id) {
        // Change id in state for something new
        state.id = getNewMapId();
    }

    // Remove map from memory? Not removing results in soft-delete for the local-only version. 
    // A later version that stores maps in the Cloud could use a different soft-delete strategy
    // storeAndReturn({key: id, value: null});

    // Remove map info
    state.maps = JSON.parse(storeAndReturn({key: 'maps', value: JSON.stringify(state.maps.filter(map => map.id !== id))}));
    
    // Re-render maps
    renderMaps();
    
    // Re-render active map
    renderMap();
}

const changeMap = ({id}) => {
    state.id = id;

    storeAndReturn({key: 'id', value: state.id});

    renderMaps();

    renderMap();
}

// This method is insane. What it currently does is
    // Take mapsInfo list from localStorage
    // Checks if the current ID on state.id is in the list
    // If it's not there, it creates a new map using the default value
// const updateMapsInfo = () => {
//     const mapsInfo = JSON.parse(getValueOrDefault({key: 'mapsInfo'}));
    
//     // Get the current mapInfo
//     const mapInfo = mapsInfo && mapsInfo.filter(mapInfo => (mapInfo.id === state.id))[0];
    
//     // If there is no map info for the current map
//     if(!mapInfo) {
//         // Add map info to the list
//         mapsInfo.unshift({
//             id: state.id,
//             name: state.map.name,
//             dateCreated: Date.now(),
//         })

//     }

//     storeAndReturn({key: 'mapsInfo', value: JSON.stringify(mapsInfo)});
//     state.mapsInfo = mapsInfo;
// }

// updateMapsInfo();