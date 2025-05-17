import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

type UserRole = 'member' | 'admin_pusat' | 'admin_cabang';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError('');
      await login(email, password);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Helper text to show available test accounts
  const renderTestAccounts = () => (
    <View style={styles.testAccountsContainer}>
      <Text style={styles.testAccountsTitle}>Test Accounts:</Text>
      <Text style={styles.testAccountText}>Member: member@nu.or.id / member123</Text>
      <Text style={styles.testAccountText}>Admin Pusat: admin.pusat@nu.or.id / adminpusat123</Text>
      <Text style={styles.testAccountText}>Admin Cabang: admin.cabang@nu.or.id / admincabang123</Text>
    </View>
  );

  const RoleButton = ({ role, title }: { role: UserRole; title: string }) => (
    <TouchableOpacity
      style={[
        styles.roleButton,
        selectedRole === role && styles.roleButtonSelected,
      ]}
      onPress={() => setSelectedRole(role)}
    >
      <Text style={[
        styles.roleButtonText,
        selectedRole === role && styles.roleButtonTextSelected
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={{ uri: 'https://example.com/nu-logo.png' }}
          style={styles.logo}
        />
        
        <Text style={styles.title}>Welcome Back</Text>
        
        {/* Role Selection */}
        <View style={styles.roleContainer}>
          <RoleButton role="member" title="Member" />
          <RoleButton role="admin_pusat" title="Admin Pusat" />
          <RoleButton role="admin_cabang" title="Admin Cabang" />
        </View>

        {/* Login Form */}
        <TextInput
          style={styles.input}
          placeholder="Email/Phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerTextBold}>Register</Text>
          </Text>
        </TouchableOpacity>

        {/* Test Accounts Section */}
        <View style={styles.testAccountsContainer}>
          <Text style={styles.testAccountsTitle}>Test Accounts:</Text>
          <Text style={styles.testAccountText}>Member: member@nu.or.id / member123</Text>
          <Text style={styles.testAccountText}>Admin Pusat: admin.pusat@nu.or.id / adminpusat123</Text>
          <Text style={styles.testAccountText}>Admin Cabang: admin.cabang@nu.or.id / admincabang123</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testAccountsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    width: '100%',
  },
  testAccountsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C5E1A',
    marginBottom: 8,
  },
  testAccountText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C5E1A',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  roleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleButtonSelected: {
    backgroundColor: '#2C5E1A',
  },
  roleButtonText: {
    color: '#757575',
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtonTextSelected: {
    color: '#FFFFFF',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2C5E1A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#757575',
    fontSize: 14,
  },
  registerTextBold: {
    color: '#2C5E1A',
    fontWeight: '600',
  },
});

export default LoginScreen;
