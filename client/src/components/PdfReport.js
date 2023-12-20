import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    Image
} from '@react-pdf/renderer';
import { Chart } from 'chart.js';
import { Provider, useSelector } from 'react-redux';





const MyDocument = ({ selectedResponses, patientDetails }) => {
    const { name, age, gender, medical_history } = patientDetails;
    const lastEntry = medical_history.length > 0 ? medical_history[medical_history.length - 1] : null;
    const lineHeight = 12;
    let currentY = 50;

    console.log(selectedResponses, 'selectedResponses')
    console.log(patientDetails, 'patientDetails')

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
                            <Text style={{ marginTop: currentY - 3 * lineHeight }}>
                                Blood Pressure Level: High - {lastEntry.blood_pressure.high} mmHg, Low - {lastEntry.blood_pressure.low} mmHg
                            </Text>
                            <Text style={{ marginTop: lineHeight }}>
                                Sugar Level: Before Food - {lastEntry.sugar_level.before_food} mg/dL, After Food - {lastEntry.sugar_level.after_food} mg/dL
                            </Text>
                            <Text style={{ marginTop: lineHeight }}>
                                Pulse Rate: {lastEntry.pulse_rate} bpm
                            </Text>
                            <Text style={{ marginTop: lineHeight }}>
                                Temperature Recorded: {lastEntry.temperature} °F
                            </Text>
                            <Text style={{ marginTop: lineHeight }}>
                                Sleep Hours Noted: {lastEntry.sleep_hours} hrs

                            </Text>
                        </>
                    )}
                </View>

                {/* Analysis */}
                <Text style={styles.subtitle}>Prakruti Analysis</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol1Header}>No.</Text>
                        <Text style={styles.tableCol2Header}>Question</Text>
                        <Text style={styles.tableCol3Header}>Response</Text>
                    </View>

                    {selectedResponses?.map((res, index) => {
                        console.log(res, 'res')
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
        fontFamily: 'Poppins',
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: 'black',
        marginBottom: 10
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 12,
        color: 'black',
        marginBottom: 5
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'none', // Remove the border
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
