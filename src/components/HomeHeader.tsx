import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function HomeHeader() {
    const { colors } = useTheme();
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });

    return (
        <View style={styles.container}>
            <Text style={[styles.date, { color: colors.textSecondary }]}>{currentDate.toUpperCase()}</Text>
            <Text style={[styles.welcome, { color: colors.text }]}>Today's Summary</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 20,
    },
    date: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    welcome: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 4,
    },
});