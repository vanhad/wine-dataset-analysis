// App.js
import React from 'react';
import { mean, median, mode } from './Utils';

// Sample dataset (replace this with your dataset)
const data = [
    { Alcohol: 1, Flavanoids: 5, Ash: 2, Hue: 3, Magnesium: 4 },
    { Alcohol: 15, Flavanoids: 55, Ash: 52, Hue: 53, Magnesium: 45 },
    // ... add more data points
];

function calculateStats(attribute) {
    // Group by Alcohol class
    const grouped = data.reduce((acc, curr) => {
        (acc[curr.Alcohol] = acc[curr.Alcohol] || []).push(curr);
        return acc;
    }, {});

    // Compute stats for each class
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

// Add Gamma to each data point
data.forEach(point => point.Gamma = (point.Ash * point.Hue) / point.Magnesium);

const GammaStats = calculateStats('Gamma');

function App() {
    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {Object.keys(FlavanoidsStats).map(cls => <th key={cls}>Class {cls}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Flavanoids Mean</td>
                        {Object.values(FlavanoidsStats).map((stat, idx) => <td key={idx}>{stat.mean}</td>)}
                    </tr>
                    <tr>
                        <td>Flavanoids Median</td>
                        {Object.values(FlavanoidsStats).map((stat, idx) => <td key={idx}>{stat.median}</td>)}
                    </tr>
                    <tr>
                        <td>Flavanoids Mode</td>
                        {Object.values(FlavanoidsStats).map((stat, idx) => <td key={idx}>{stat.mode}</td>)}
                    </tr>
                    <tr>
                        <td>Gamma Mean</td>
                        {Object.values(GammaStats).map((stat, idx) => <td key={idx}>{stat.mean}</td>)}
                    </tr>
                    <tr>
                        <td>Gamma Median</td>
                        {Object.values(GammaStats).map((stat, idx) => <td key={idx}>{stat.median}</td>)}
                    </tr>
                    <tr>
                        <td>Gamma Mode</td>
                        {Object.values(GammaStats).map((stat, idx) => <td key={idx}>{stat.mode}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
