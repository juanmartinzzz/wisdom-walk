const initialTimestamp = new Date();
const timestamps = [initialTimestamp];

const profile = ({alias} = {}) => {
    timestamps.push(new Date());

    console.log('Step: ', alias ? `${timestamps.length} - Alias: ${alias}` : timestamps.length);
    console.log('Milliseconds since previous step: ', (timestamps[timestamps.length-1].getTime()-timestamps[timestamps.length-2].getTime()))
}