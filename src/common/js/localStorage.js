












// DEPRECATED
// will be removed. new methods must go on local-storage.json












































const storeAndReturn = ({key, value}) => {
    localStorage.setItem(key, value);

    return value;
}


const getValueOrDefault = ({key, defaultValue}) => {
    if(localStorage.getItem(key)) {
        return localStorage.getItem(key);
    }

    return defaultValue;
}