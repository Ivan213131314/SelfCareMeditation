import { View, Text, StyleSheet } from 'react-native';

export default function JournalScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Дневник самочувствия</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9F8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});
