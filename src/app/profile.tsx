import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Colors } from '@/constants/colors';

export default function ProfileScreen() {
    const router = useRouter();
    const { email, signOut, isLoading } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.text}
                        onPress={() => router.back()}
                    />
                    <Text style={styles.headerTitle}>Профиль</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={48} color={Colors.white} />
                        </View>
                        <Text style={styles.emailText}>{email || 'user@example.com'}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Аккаунт</Text>
                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>{email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.logoutContainer}>
                        <Button
                            title="Выйти"
                            onPress={handleSignOut}
                            loading={isLoading}
                            variant="outline"
                            style={styles.logoutButton}
                            textStyle={styles.logoutButtonText}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    emailText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    infoValue: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
    logoutContainer: {
        marginTop: 'auto',
        marginBottom: 20,
    },
    logoutButton: {
        borderColor: '#FF3B30',
    },
    logoutButtonText: {
        color: '#FF3B30',
    },
});
