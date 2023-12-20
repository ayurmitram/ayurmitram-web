import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



function createChart(data, title) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <Box m={3}>
            <Line options={options} data={data} />
        </Box>
    );
}



export function LineChart() {
    const [data, setData] = React.useState(null);
    const [name, setName] = React.useState(null);


    // const patientId = "65817634225f765f96b14223"; // Replace 'your_patient_id' with the actual patient ID
    const token = localStorage.getItem('token')
    const patientId = localStorage.getItem('userId');
    console.log(patientId)

    React.useEffect(() => {
        fetch('http://localhost:8000/api/patient/getpatient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ patientId: `${patientId}` }),
        })
            .then(response => response.json())
            .then(data => setData(data));
    }, [patientId, token]);

    React.useEffect(() => {
        if (data && data.patient) {
            const medicalHistory = data.patient.patient_medical_history;

            const bloodPressureData = medicalHistory?.map(item => ({
                label: new Date(item.timestamp).toLocaleString(),
                high: item.blood_pressure.high,
                low: item.blood_pressure.low,
            }));

            const pulseRateData = medicalHistory?.map(item => ({
                label: new Date(item.timestamp).toLocaleString(),
                rate: item.pulse_rate,
            }));

            const bloodSugarLevelsData = medicalHistory?.map(item => ({
                label: new Date(item.timestamp).toLocaleString(),
                beforeFood: item.sugar_level.before_food,
                afterFood: item.sugar_level.after_food,
            }));

            const bodyTemperatureData = medicalHistory?.map(item => ({
                label: new Date(item.timestamp).toLocaleString(),
                temperature: item.temperature,
            }));

            const sleepPatternsData = medicalHistory?.map(item => ({
                label: new Date(item.timestamp).toLocaleString(),
                hours: item.sleep_hours,
            }));
            console.log("data", data)
            setName(data.patient.patient_name)

            setData({
                bloodPressure: bloodPressureData,
                pulseRate: pulseRateData,
                bloodSugarLevels: bloodSugarLevelsData,
                bodyTemperature: bodyTemperatureData,
                sleepPatterns: sleepPatternsData,
            });
        }
    }, [data]);

    const bloodPressure = data && data.bloodPressure ? {
        labels: data.bloodPressure?.map(item => item.label),
        datasets: [
            {
                label: 'Systolic Pressure',
                data: data.bloodPressure?.map(item => item.high),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Diastolic Pressure',
                data: data.bloodPressure?.map(item => item.low),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    } : null;

    const pulseRate = data && data.pulseRate ? {
        labels: data.pulseRate?.map(item => item.label),
        datasets: [
            {
                label: 'Heart Rate',
                data: data.pulseRate?.map(item => item.rate),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ],
    } : null;

    const bloodSugarLevels = data && data.bloodSugarLevels ? {
        labels: data.bloodSugarLevels?.map(item => item.label),
        datasets: [
            {
                label: 'Blood Sugar Level',
                data: data.bloodSugarLevels?.map(item => item.beforeFood),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    } : null;

    const bodyTemperature = data && data.bodyTemperature ? {
        labels: data.bodyTemperature?.map(item => item.label),
        datasets: [
            {
                label: 'Body Temperature',
                data: data.bodyTemperature?.map(item => item.temperature),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    } : null;

    const sleepPatterns = data && data.sleepPatterns ? {
        labels: data.sleepPatterns?.map(item => item.label),
        datasets: [
            {
                label: 'Hours of Sleep',
                data: data.sleepPatterns?.map(item => item.hours),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    } : null;

    return (
        <div>
            {name && <h1 className='text-2xl font-semibold'>Hello {name}</h1>}

            {bloodPressure && createChart(bloodPressure, 'Blood Pressure')}
            {bloodSugarLevels && createChart(bloodSugarLevels, 'Blood Sugar Levels')}
            {pulseRate && createChart(pulseRate, 'Pulse Rate')}
            {bodyTemperature && createChart(bodyTemperature, 'Body Temperature')}
            {sleepPatterns && createChart(sleepPatterns, 'Sleep Patterns')}

        </div>
    );
}
