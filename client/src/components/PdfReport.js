import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    Image
} from '@react-pdf/renderer';
import { useState } from 'react';


const prakritiesAnalysis = {
    "vata": {
        description: "Your predominant vata nature highlights an adaptable and creative persona. You tend to be imaginative, quick-thinking, and adaptable, thriving in change.",
    },
    "pitta": {
        description: "With a dominant pitta prakriti, you possess a sharp intellect and ambition. Your fiery nature propels you toward goals, making you a natural leader.",
    },
    "kapha": {
        description: "A primary kapha prakriti signifies a grounded and nurturing personality. Your stable and calm nature offers a supportive presence and enduring strength.",
    },
    "vata+pitta": {
        description: "Showcasing traits of both vata and pitta, you balance adaptability with determination. Your creative drive fuels your ambition, making you a versatile achiever.",
    },
    "vata+kapha": {
        description: "Balancing vata's flexibility with kapha's stability, you possess a unique blend of creativity and endurance. Your adaptability is supported by your steadfast nature.",
    },
    "pitta+kapha": {
        description: "Integrating pitta's ambition with kapha's nurturing qualities, you balance drive with compassion. Your ambition is complemented by a nurturing and supportive demeanor.",
    },
};





const MyDocument = ({ selectedResponses, patientDetails }) => {
    const [duration, setDuration] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(0);
    const [result, setResult] = useState("");
    // const { name, age, gender, medical_history } = patientDetails;
    const name = patientDetails?.name || '';
    const age = patientDetails?.age || '';
    const gender = patientDetails?.gender || '';
    const medical_history = patientDetails?.medical_history || [];
    const lastEntry = medical_history.length > 0 ? medical_history[medical_history.length - 1] : null;

    const todayDate = new Date();

    // Convert the timestamps to Date objects
    const lastDate = new Date();
    if (lastTimestamp) {

        lastDate.setHours(lastTimestamp.split(":")[0]);
        lastDate.setMinutes(lastTimestamp.split(":")[1]);
        lastDate.setSeconds(lastTimestamp.split(":")[2]);
        // Calculate the difference in minutes
        const differenceInMinutes = Math.abs(todayDate - lastDate) / 1000 / 60;
        console.log(differenceInMinutes, 'differenceInMinutes')
    }


    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.legend}>

                </View>
                <Text style={styles.title}>AyurMitram Report</Text>

                {/* Patient Details */}
                <Text style={styles.subtitle}>Patient Details</Text>
                <Text style={styles.text}>Name: {name}</Text>
                <Text style={styles.text}>Age: {age}</Text>
                <Text style={styles.text}>Gender: {gender}</Text>
                <View>
                    {lastEntry && (
                        <>
                            <Text style={styles.text}>
                                Blood Pressure Level: High - {lastEntry.blood_pressure.high} mmHg, Low - {lastEntry.blood_pressure.low} mmHg
                            </Text>
                            <Text style={styles.text} >
                                Sugar Level: Before Food - {lastEntry.sugar_level.before_food} mg/dL, After Food - {lastEntry.sugar_level.after_food} mg/dL
                            </Text>
                            <Text style={styles.text} >
                                Pulse Rate: {lastEntry.pulse_rate} bpm
                            </Text>
                            <Text style={styles.text}>
                                Temperature Recorded: {lastEntry.temperature} °F
                            </Text>
                            <Text style={styles.text}>
                                Sleep Hours Noted: {lastEntry.sleep_hours} hrs

                            </Text>
                        </>
                    )}
                </View>

                <Text style={styles.subtitle}>Your Diagnoses is {result} Prakriti</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol1Header}>No.</Text>
                        <Text style={styles.tableCol2Header}>Question</Text>
                        <Text style={styles.tableCol3Header}>Response</Text>
                    </View>

                    {selectedResponses?.map((res, index) => {
                        const text = res.text || '';
                        console.log("here")

                        const prakritiComposition = {
                            vata: JSON.parse(res.text?.answer || '{}')?.ps?.vata || 0,
                            pitta: JSON.parse(res.text?.answer || '{}')?.ps?.pitta || 0,
                            kapha: JSON.parse(res.text?.answer || '{}')?.ps?.kapha || 0,
                        };
                        console.log(prakritiComposition, 'prakritiComposition')

                        return (
                            <View style={styles.tableRow} key={index}>
                                <Text style={[styles.tableCol1]}>{index + 1}</Text>
                                <Text style={[styles.tableCol2]}>
                                    {res.type === 'bot' ?
                                        JSON.parse(res.text?.answer || res.text)?.question : ''}
                                </Text>
                                <Text style={[styles.tableCol3]}> sdf </Text>
                                <Text style={[styles.tableCol3]}>
                                    {res.display || res.text}
                                </Text>
                            </View>
                        )
                    })}

                </View>

            </Page>
        </Document>
    )
};

export default MyDocument;


const styles = StyleSheet.create({
    page: {
        padding: 10, // Adjust the padding
    },
    title: {

        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {

        fontSize: 15,
        color: 'black',
        marginBottom: 10
    },
    text: {
        fontSize: 12,
        color: 'black',
        marginBottom: 5
    },
    table: {
        display: 'table',
        width: '100vh',
        // borderStyle: 'none', // Remove the border
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableCol1Header: {
        width: '20%',
    },
    tableCol2Header: {
        width: '60%',
    },
    tableCol3Header: {
        width: '20%',
    },
    tableCol1: {
        width: '10%',
    },
    tableCol2: {
        width: '60%',
    },
    tableCol3: {
        width: '30%',
    },
    legend: {
        display: 'flex',
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
