import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

type UserRole = 'member' | 'admin_cabang';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  const [branch, setBranch] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Validation
      if (!name || !email || !phone || !nik || !password || !confirmPassword) {
        setError('Semua field harus diisi');
        return;
      }

      if (password !== confirmPassword) {
        setError('Password tidak cocok');
        return;
      }

      if (nik.length !== 16) {
        setError('NIK harus 16 digit');
        return;
      }

      if (selectedRole === 'admin_cabang' && !branch) {
        setError('Cabang harus diisi untuk Admin Cabang');
        return;
      }

      // TODO: Implement actual registration logic
      Alert.alert(
        'Registrasi Berhasil',
        'Akun Anda sedang dalam proses verifikasi. Silakan tunggu email konfirmasi dari kami.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (err) {
      setError('Registrasi gagal. Silakan coba lagi.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Daftar Akun Baru</Text>
          <Text style={styles.subtitle}>
            Silakan lengkapi data diri Anda untuk mendaftar
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                selectedRole === 'member' && styles.roleButtonSelected,
              ]}
              onPress={() => setSelectedRole('member')}
            >
              <Text style={[
                styles.roleButtonText,
                selectedRole === 'member' && styles.roleButtonTextSelected,
              ]}>Member</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                selectedRole === 'admin_cabang' && styles.roleButtonSelected,
              ]}
              onPress={() => setSelectedRole('admin_cabang')}
            >
              <Text style={[
                styles.roleButtonText,
                selectedRole === 'admin_cabang' && styles.roleButtonTextSelected,
              ]}>Admin Cabang</Text>
            </TouchableOpacity>
          </View>

          {/* Registration Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nama Lengkap</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Masukkan nama lengkap"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nomor Telepon</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Masukkan nomor telepon"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>NIK</Text>
              <TextInput
                style={styles.input}
                value={nik}
                onChangeText={setNik}
                placeholder="Masukkan 16 digit NIK"
                keyboardType="numeric"
                maxLength={16}
              />
            </View>

            {selectedRole === 'admin_cabang' && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cabang</Text>
                <TextInput
                  style={styles.input}
                  value={branch}
                  onChangeText={setBranch}
                  placeholder="Masukkan nama cabang"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan password"
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Konfirmasi Password</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Masukkan ulang password"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Daftar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Sudah punya akun? <Text style={styles.loginTextBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C5E1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 32,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleButtonSelected: {
    backgroundColor: '#2C5E1A',
  },
  roleButtonText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  roleButtonTextSelected: {
    color: '#FFFFFF',
  },
  form: {
    marginBottom: 24,
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
  registerButton: {
    height: 48,
    backgroundColor: '#2C5E1A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 16,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#757575',
  },
  loginTextBold: {
    color: '#2C5E1A',
    fontWeight: '600',
  },
});
