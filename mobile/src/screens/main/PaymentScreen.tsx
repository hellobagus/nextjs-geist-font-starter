import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';

type PaymentMethod = 'qris' | 'bank';

interface BankOption {
  id: string;
  name: string;
  code: string;
}

const bankOptions: BankOption[] = [
  { id: '1', name: 'Bank Mandiri', code: 'MANDIRI' },
  { id: '2', name: 'BCA', code: 'BCA' },
  { id: '3', name: 'BNI', code: 'BNI' },
  { id: '4', name: 'BRI', code: 'BRI' },
];

const PaymentScreen = ({ navigation }: any) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qris');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = () => {
    if (selectedMethod === 'bank' && (!selectedBank || !accountNumber || !amount)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (selectedMethod === 'qris' && !amount) {
      Alert.alert('Error', 'Please enter the amount');
      return;
    }

    // TODO: Implement actual payment processing
    Alert.alert(
      'Payment Confirmation',
      `Confirm payment of Rp${parseInt(amount).toLocaleString('id-ID')}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Process payment
            Alert.alert('Success', 'Payment processed successfully');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const renderQRISSection = () => (
    <View style={styles.qrisContainer}>
      <Image
        source={{ uri: 'https://example.com/qr-code.png' }}
        style={styles.qrCode}
        resizeMode="contain"
      />
      <Text style={styles.qrisInstructions}>
        Scan this QR code using your mobile banking or e-wallet app
      </Text>
    </View>
  );

  const renderBankTransferSection = () => (
    <View style={styles.bankTransferContainer}>
      <Text style={styles.inputLabel}>Select Bank</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bankOptionsContainer}
      >
        {bankOptions.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={[
              styles.bankOption,
              selectedBank === bank.id && styles.bankOptionSelected,
            ]}
            onPress={() => setSelectedBank(bank.id)}
          >
            <Text
              style={[
                styles.bankOptionText,
                selectedBank === bank.id && styles.bankOptionTextSelected,
              ]}
            >
              {bank.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.inputLabel}>Account Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter account number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Payment Method Selection */}
        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[
              styles.methodOption,
              selectedMethod === 'qris' && styles.methodOptionSelected,
            ]}
            onPress={() => setSelectedMethod('qris')}
          >
            <Text
              style={[
                styles.methodOptionText,
                selectedMethod === 'qris' && styles.methodOptionTextSelected,
              ]}
            >
              QRIS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodOption,
              selectedMethod === 'bank' && styles.methodOptionSelected,
            ]}
            onPress={() => setSelectedMethod('bank')}
          >
            <Text
              style={[
                styles.methodOptionText,
                selectedMethod === 'bank' && styles.methodOptionTextSelected,
              ]}
            >
              Bank Transfer
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Rp0"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Payment Method Specific UI */}
        {selectedMethod === 'qris' ? renderQRISSection() : renderBankTransferSection()}

        {/* Pay Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 24,
    color: '#212121',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C5E1A',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  methodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  methodOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  methodOptionSelected: {
    backgroundColor: '#2C5E1A',
  },
  methodOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  methodOptionTextSelected: {
    color: '#FFFFFF',
  },
  amountContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  amountInput: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  qrisContainer: {
    alignItems: 'center',
    padding: 16,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  qrisInstructions: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 14,
  },
  bankTransferContainer: {
    marginBottom: 24,
  },
  bankOptionsContainer: {
    marginBottom: 16,
  },
  bankOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  bankOptionSelected: {
    backgroundColor: '#2C5E1A',
  },
  bankOptionText: {
    fontSize: 14,
    color: '#757575',
  },
  bankOptionTextSelected: {
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#2C5E1A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;
