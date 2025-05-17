import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

type DonationType = 'zakat' | 'infaq' | 'wakaf' | 'sedekah';

interface DonationProgram {
  id: string;
  type: DonationType;
  title: string;
  description: string;
  image: string;
  target: number;
  collected: number;
  donors: number;
  daysLeft: number;
}

// Mock data for donation programs
const mockPrograms: DonationProgram[] = [
  {
    id: '1',
    type: 'zakat',
    title: 'Zakat untuk Dhuafa',
    description: 'Membantu saudara kita yang membutuhkan melalui program zakat',
    image: 'https://example.com/zakat1.jpg',
    target: 100000000,
    collected: 75000000,
    donors: 150,
    daysLeft: 15,
  },
  {
    id: '2',
    type: 'wakaf',
    title: 'Wakaf Pembangunan Masjid',
    description: 'Pembangunan masjid untuk masyarakat',
    image: 'https://example.com/wakaf1.jpg',
    target: 500000000,
    collected: 350000000,
    donors: 280,
    daysLeft: 45,
  },
  {
    id: '3',
    type: 'infaq',
    title: 'Infaq Pendidikan',
    description: 'Membantu biaya pendidikan anak yatim',
    image: 'https://example.com/infaq1.jpg',
    target: 200000000,
    collected: 125000000,
    donors: 200,
    daysLeft: 30,
  },
];

export default function DonationScreen({ navigation }: any) {
  const [selectedType, setSelectedType] = useState<DonationType>('zakat');
  const { userRole } = useAuth();

  const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  const calculateProgress = (collected: number, target: number) => {
    return (collected / target) * 100;
  };

  const renderDonationTypes = () => (
    <View style={styles.typeContainer}>
      {(['zakat', 'infaq', 'wakaf', 'sedekah'] as DonationType[]).map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            selectedType === type && styles.typeButtonSelected,
          ]}
          onPress={() => setSelectedType(type)}
        >
          <Text
            style={[
              styles.typeButtonText,
              selectedType === type && styles.typeButtonTextSelected,
            ]}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderProgram = (program: DonationProgram) => (
    <TouchableOpacity
      key={program.id}
      style={styles.programCard}
      onPress={() => navigation.navigate('DonationDetail', { program })}
    >
      <Image
        source={{ uri: program.image }}
        style={styles.programImage}
        resizeMode="cover"
      />
      <View style={styles.programContent}>
        <Text style={styles.programTitle}>{program.title}</Text>
        <Text style={styles.programDescription} numberOfLines={2}>
          {program.description}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${calculateProgress(program.collected, program.target)}%` },
              ]}
            />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.collectedAmount}>
              {formatCurrency(program.collected)}
            </Text>
            <Text style={styles.targetAmount}>
              dari {formatCurrency(program.target)}
            </Text>
          </View>
        </View>

        <View style={styles.programMeta}>
          <Text style={styles.donors}>{program.donors} Donatur</Text>
          <Text style={styles.daysLeft}>{program.daysLeft} hari lagi</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donasi</Text>
        {(userRole === 'admin_pusat' || userRole === 'admin_cabang') && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddDonationProgram')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Donation Types */}
      {renderDonationTypes()}

      {/* Programs List */}
      <ScrollView style={styles.programsContainer}>
        {mockPrograms
          .filter(program => program.type === selectedType)
          .map(renderProgram)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#2C5E1A',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  typeContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#2C5E1A',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#757575',
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
  },
  programsContainer: {
    flex: 1,
    padding: 16,
  },
  programCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  programImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  programContent: {
    padding: 16,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2C5E1A',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectedAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C5E1A',
  },
  targetAmount: {
    fontSize: 14,
    color: '#757575',
  },
  programMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  donors: {
    fontSize: 12,
    color: '#757575',
  },
  daysLeft: {
    fontSize: 12,
    color: '#757575',
  },
});
