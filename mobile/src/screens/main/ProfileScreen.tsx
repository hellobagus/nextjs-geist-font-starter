import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  screen?: string;
  action?: () => void;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'personal',
    title: 'Data Pribadi',
    icon: '👤',
    screen: 'PersonalData',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
  {
    id: 'donations',
    title: 'Riwayat Donasi',
    icon: '🤲',
    screen: 'DonationHistory',
    roles: ['member'],
  },
  {
    id: 'transactions',
    title: 'Riwayat Transaksi',
    icon: '💳',
    screen: 'TransactionHistory',
    roles: ['member'],
  },
  {
    id: 'loans',
    title: 'Pinjaman Saya',
    icon: '💰',
    screen: 'MyLoans',
    roles: ['member'],
  },
  {
    id: 'settings',
    title: 'Pengaturan',
    icon: '⚙️',
    screen: 'Settings',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
  {
    id: 'help',
    title: 'Bantuan',
    icon: '❓',
    screen: 'Help',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
];

export default function ProfileScreen({ navigation }: any) {
  const { currentUser, userRole, logout } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole || 'member')
  );

  const handleLogout = () => {
    logout();
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => item.screen ? navigation.navigate(item.screen) : item.action?.()}
    >
      <View style={styles.menuItemContent}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={styles.menuTitle}>{item.title}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: currentUser?.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{currentUser?.name}</Text>
            <Text style={styles.role}>
              {userRole === 'admin_pusat' ? 'Admin Pusat' :
               userRole === 'admin_cabang' ? `Admin Cabang ${currentUser?.branch}` :
               'Member'}
            </Text>
            <Text style={styles.memberSince}>
              Member since {currentUser?.memberSince}
            </Text>
          </View>
        </View>

        {/* Member Card */}
        <View style={styles.cardContainer}>
          <View style={styles.memberCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>NU Member Card</Text>
              <Text style={styles.cardNumber}>{currentUser?.id}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardName}>{currentUser?.name}</Text>
              <Text style={styles.cardStatus}>Active</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {filteredMenuItems.map(renderMenuItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C5E1A',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.6,
  },
  cardContainer: {
    padding: 16,
    marginTop: -40,
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C5E1A',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  cardStatus: {
    fontSize: 14,
    color: '#2C5E1A',
    fontWeight: '500',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: '#212121',
  },
  menuArrow: {
    fontSize: 24,
    color: '#757575',
  },
  logoutButton: {
    margin: 16,
    height: 48,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
