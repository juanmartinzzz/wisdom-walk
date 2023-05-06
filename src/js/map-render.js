const renderMap = () => {
    const id = state.id;
    console.log({idOnRenderMap: id});
    const error = new Error();
    const stackTrace = error.stack.split('\n');
    console.log({stackTrace});

    // Set steps in state from the value stored in local storage
    state.steps = JSON.parse(getValueOrDefault({key: id, defaultValue: JSON.stringify([templateEmptyStep])}))

    renderSteps();
}

renderMap();