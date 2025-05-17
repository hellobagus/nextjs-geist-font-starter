import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }[];
}

export default function CooperativeScreen() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('12');
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);
  const { userRole, currentUser } = useAuth();

  const interestRate = 0.12; // 12% annual interest rate

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const months = parseInt(loanTerm);
    const monthlyRate = interestRate / 12;

    // Monthly payment calculation using the loan payment formula
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    const schedule = [];
    let remainingBalance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }

    setCalculation({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule: schedule,
    });
  };

  const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Koperasi NU</Text>
          <Text style={styles.headerSubtitle}>Kalkulator Pinjaman</Text>
        </View>

        {/* Loan Calculator Form */}
        <View style={styles.calculatorContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jumlah Pinjaman</Text>
            <TextInput
              style={styles.input}
              value={loanAmount}
              onChangeText={setLoanAmount}
              keyboardType="numeric"
              placeholder="Masukkan jumlah pinjaman"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jangka Waktu (bulan)</Text>
            <TextInput
              style={styles.input}
              value={loanTerm}
              onChangeText={setLoanTerm}
              keyboardType="numeric"
              placeholder="Masukkan jangka waktu"
            />
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateLoan}
          >
            <Text style={styles.calculateButtonText}>Hitung Pinjaman</Text>
          </TouchableOpacity>
        </View>

        {/* Calculation Results */}
        {calculation && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Angsuran per Bulan</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(calculation.monthlyPayment)}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Pembayaran</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(calculation.totalPayment)}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Bunga</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(calculation.totalInterest)}
              </Text>
            </View>

            {/* Amortization Schedule */}
            <View style={styles.scheduleContainer}>
              <Text style={styles.scheduleTitle}>Jadwal Angsuran</Text>
              <View style={styles.scheduleHeader}>
                <Text style={styles.scheduleHeaderText}>Bulan</Text>
                <Text style={styles.scheduleHeaderText}>Angsuran</Text>
                <Text style={styles.scheduleHeaderText}>Sisa Pinjaman</Text>
              </View>
              {calculation.amortizationSchedule.map((item) => (
                <View key={item.month} style={styles.scheduleRow}>
                  <Text style={styles.scheduleText}>{item.month}</Text>
                  <Text style={styles.scheduleText}>
                    {formatCurrency(item.payment)}
                  </Text>
                  <Text style={styles.scheduleText}>
                    {formatCurrency(item.remainingBalance)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Apply for Loan Button */}
        {calculation && (
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Ajukan Pinjaman</Text>
          </TouchableOpacity>
        )}
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
    padding: 16,
    backgroundColor: '#2C5E1A',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  calculatorContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  calculateButton: {
    height: 48,
    backgroundColor: '#2C5E1A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C5E1A',
  },
  scheduleContainer: {
    marginTop: 24,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  scheduleHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  scheduleHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  scheduleRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  scheduleText: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
  },
  applyButton: {
    margin: 16,
    height: 48,
    backgroundColor: '#2C5E1A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
