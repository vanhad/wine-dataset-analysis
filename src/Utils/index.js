function mean(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return +(sum / arr.length).toFixed(3);
}

function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return +((sorted[mid - 1] + sorted[mid]) / 2).toFixed(3);
    }
    return +sorted[mid].toFixed(3);
}

function mode(arr) {
    const freq = {};
    let maxFreq = 0;
    let modeVal;

    for (let num of arr) {
        freq[num] = (freq[num] || 0) + 1;
        if (freq[num] > maxFreq) {
            maxFreq = freq[num];
            modeVal = num;
        }
    }

    return +modeVal.toFixed(3);
}

export { mean, median, mode };
