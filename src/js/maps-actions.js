const changeMap = ({id}) => {
    state.id = id;

    storeAndReturn({key: 'id', value: state.id});

    updateMapsInfo();

    renderMaps();

    renderMap();
}

const updateMapsInfo = () => {
    const mapsInfo = JSON.parse(getValueOrDefault({key: 'mapsInfo'}));
    
    // Get the current mapInfo
    const mapInfo = mapsInfo && mapsInfo.filter(mapInfo => (mapInfo.id === state.id))[0];
    
    // If there is no map info for the current map
    if(!mapInfo) {
        // Add map info to the list
        mapsInfo.unshift({
            id: state.id,
            name: state.map.name,
            dateCreated: Date.now(),
        })

    }

    storeAndReturn({key: 'mapsInfo', value: JSON.stringify(mapsInfo)});
    state.mapsInfo = mapsInfo;
}

updateMapsInfo();