import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register the necessary components and plugins
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const Company: React.FC = () => {
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [chartData, setChartData] = useState<any>(null);
    const [options, setOptions] = useState<any>(null);

    useEffect(() => {
        // Generate data and set it when the component mounts
        const stockDataTemp = generateTradingData("Company XYZ", 2024);
        setStockData(stockDataTemp);
    }, []);

    useEffect(() => {
        console.log('%cStockData changed:' + stockData.length, 'color: green; font-size: 1.5em;');

        if (stockData && stockData.length > 0) {
            console.log('Company Data:', stockData);

            // Extract labels (dates) for the x-axis
            const labels = stockData.map(data => data.date);

            // Prepare datasets for Open, High, Low, Close values
            const newChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Open',
                        data: stockData.map(data => data.open),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'High',
                        data: stockData.map(data => data.high),
                        borderColor: 'rgba(192, 75, 75, 1)',
                        backgroundColor: 'rgba(192, 75, 75, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Low',
                        data: stockData.map(data => data.low),
                        borderColor: 'rgba(75, 75, 192, 1)',
                        backgroundColor: 'rgba(75, 75, 192, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Close',
                        data: stockData.map(data => data.close),
                        borderColor: 'rgba(192, 192, 75, 1)',
                        backgroundColor: 'rgba(192, 192, 75, 0.2)',
                        fill: false,
                    },
                ],
            };

            const newOptions = {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                    title: {
                        display: true,
                        text: 'Stock Data for the Last Month',
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'xy', // Allow panning on both axes
                        },
                        zoom: {
                            wheel: {
                                enabled: true, // Allow zooming with mouse wheel
                            },
                            pinch: {
                                enabled: true, // Allow pinch zooming on touch devices
                            },
                            mode: 'xy', // Allow zooming on both axes
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                    },
                },
            };

            setChartData(newChartData);
            setOptions(newOptions);
        }
    }, [stockData]);

    function generateTradingData(company: string, year: number): StockData[] {
        console.log('generateTradingData');
        const data: StockData[] = [];
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);
        const basePrice = 100 + Math.random() * 50; // Start with a base price between $100 and $150

        let previousClose = basePrice;

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            // Skip weekends (Saturday and Sunday)
            if (d.getDay() === 0 || d.getDay() === 6) {
                continue;
            }

            // Generate realistic opening price (based on previous close)
            const open = previousClose * (1 + (Math.random() - 0.5) / 50);

            // Generate high, low, and close prices based on the opening price
            const dailyVolatility = 0.02; // 2% daily volatility
            const high = open * (1 + Math.random() * dailyVolatility);
            const low = open * (1 - Math.random() * dailyVolatility);
            const close = low + Math.random() * (high - low);

            // Generate volume (between 500,000 and 5,000,000)
            const volume = Math.floor(500000 + Math.random() * 4500000);

            // Add the generated data to the array
            data.push({
                date: d.toISOString().split('T')[0],
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2)),
                volume: volume,
            });

            // Set previousClose for the next day
            previousClose = close;
        }

        return data;
    }

    return (
        chartData && options ? (
            <Line data={chartData} options={options} />
        ) : (
            <p>Loading chart data...</p>
        )
    );
};

export default Company;
