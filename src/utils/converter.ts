export const secondsToTimeString = (timeInSeconds: number) => {
    const minutes = Math.trunc(timeInSeconds / 60);
    const seconds = Math.trunc(timeInSeconds % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}