import { Link } from 'expo-router';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { globalStyles } from '@/styles/global';

export default function MealsScreen() {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>All Meals</Text>
            <Link href={'/add-meal' as any} style={{ fontSize: 18, color: '#007bff' }}>
                Add New Meal
            </Link>
        </ScrollView>
    );
}