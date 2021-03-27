export function getHumanReadableTime(seconds) {
    let time = new Date(seconds*1000);
    return time.toLocaleString();
}
