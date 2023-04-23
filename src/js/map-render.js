const renderMap = () => {
    const id = state.id;

    // Set steps in state from the value stored in local storage
    state.steps = JSON.parse(getValueOrDefault({key: state.id, defaultValue: JSON.stringify([templateEmptyStep])}))

    renderSteps();
}

renderMap();