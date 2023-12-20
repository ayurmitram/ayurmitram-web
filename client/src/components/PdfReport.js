import {
    Document,
    Page,
    View,
    Text,
    StyleSheet
} from '@react-pdf/renderer';
import { Provider, useSelector } from 'react-redux';



const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 10
    },
    text: {
        fontSize: 12,
        marginBottom: 5
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableCol1Header: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol2Header: {
        width: '60%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol3Header: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol1: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol2: {
        width: '60%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol3: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    }
});

const MyDocument = () => {
    const patientName = 'John Doe';
    const patientAge = 25;
    // const patientGender = "MALE"
    const selectedResponses = useSelector((state) => state.layout.selectedResponses);

    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>AyurMitram Report</Text>

                {/* Patient Details */}
                <Text style={styles.subtitle}>Patient Details</Text>
                <Text style={styles.text}>Name: {patientName}</Text>
                <Text style={styles.text}>Age: {patientAge}</Text>
                {/* <Text style={styles.text}>Gender: {patientGender}</Text> */}

                {/* Analysis */}
                <Text style={styles.subtitle}>Prakruti Analysis</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol1Header}>No.</Text>
                        <Text style={styles.tableCol2Header}>Question</Text>
                        <Text style={styles.tableCol3Header}>Response</Text>
                    </View>

                    {selectedResponses.map((res, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={[styles.tableCol1]}>{index + 1}</Text>
                            <Text style={[styles.tableCol2]}>
                                {res.type === 'bot' ?
                                    JSON.parse(res.text?.answer || res.text)?.question : ''}
                            </Text>
                            <Text style={[styles.tableCol3]}>
                                {res.display || res.text}
                            </Text>
                        </View>
                    ))}

                </View>

            </Page>
        </Document>
    )
};

export default MyDocument;

