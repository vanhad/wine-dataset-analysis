import React from 'react';
import { mean, median, mode } from './Utils';

const data = [
    { Alcohol: 1, Flavanoids: 5, Ash: 2, Hue: 3, Magnesium: 4 },
    { Alcohol: 2, Flavanoids: 12, Ash: 3, Hue: 5, Magnesium: 7 },
];

function calculateStats(attribute) {
    const grouped = data.reduce((acc, curr) => {
        (acc[curr.Alcohol] = acc[curr.Alcohol] || []).push(curr);
        return acc;
    }, {});

    const stats = {};
    for (let cls in grouped) {
        const values = grouped[cls].map(item => item[attribute]);
        stats[cls] = {
            mean: mean(values),
            median: median(values),
            mode: mode(values)
        };
    }

    return stats;
}

const FlavanoidsStats = calculateStats('Flavanoids');

data.forEach(point => point.Gamma = (point.Ash * point.Hue) / point.Magnesium);

const GammaStats = calculateStats('Gamma');

function StatsTable({ title, stats }) {
    return (
        <div>
            <h2>{title} Stats</h2>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {Object.keys(stats).map(cls => <th key={cls}>Class {cls}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mean</td>
                        {Object.values(stats).map((stat, idx) => <td key={idx}>{stat.mean}</td>)}
                    </tr>
                    <tr>
                        <td>Median</td>
                        {Object.values(stats).map((stat, idx) => <td key={idx}>{stat.median}</td>)}
                    </tr>
                    <tr>
                        <td>Mode</td>
                        {Object.values(stats).map((stat, idx) => <td key={idx}>{stat.mode}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <StatsTable title="Flavanoids" stats={FlavanoidsStats} />
            <StatsTable title="Gamma" stats={GammaStats} />
        </div>
    );
}

export default App;
