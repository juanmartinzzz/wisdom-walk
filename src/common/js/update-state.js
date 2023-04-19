const mergeObjects = (obj1, obj2) => {
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null) {
                if (Array.isArray(obj2[key])) {
                    obj1[key] = obj2[key];
                } else {
                    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                        obj1[key] = mergeObjects(obj1[key], obj2[key]);
                    } else {
                        obj1[key] = Object.assign({}, obj2[key]);
                    }
                }
            } else {
                obj1[key] = obj2[key];
            }
        }
    }

    return obj1;
}

const updateState = ({object}) => {
    state = mergeObjects(state, object);
}