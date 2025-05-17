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
  screen: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'donation',
    title: 'Donasi',
    icon: '🤲',
    screen: 'Donation',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
  {
    id: 'umkm',
    title: 'UMKM',
    icon: '🏪',
    screen: 'UMKMStore',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
  {
    id: 'cooperative',
    title: 'Koperasi',
    icon: '💰',
    screen: 'Cooperative',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
  {
    id: 'blog',
    title: 'Blog',
    icon: '📰',
    screen: 'Blog',
    roles: ['member', 'admin_pusat', 'admin_cabang'],
  },
  {
    id: 'members',
    title: 'Data Anggota',
    icon: '👥',
    screen: 'Members',
    roles: ['admin_pusat', 'admin_cabang'],
  },
  {
    id: 'announcements',
    title: 'Pengumuman',
    icon: '📢',
    screen: 'Announcements',
    roles: ['admin_pusat', 'admin_cabang'],
  },
];

const banners = [
  {
    id: '1',
    image: 'https://example.com/banner1.jpg',
    title: 'Halal Bihalal Event',
  },
  {
    id: '2',
    image: 'https://example.com/banner2.jpg',
    title: 'UMKM Showcase',
  },
  {
    id: '3',
    image: 'https://example.com/banner3.jpg',
    title: 'Donation Campaign',
  },
];

export default function HomeScreen({ navigation }: any) {
  const { userRole, currentUser } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole || 'member')
  );

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <Text style={styles.menuTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderBanner = (banner: typeof banners[0]) => (
    <View key={banner.id} style={styles.bannerItem}>
      <Image
        source={{ uri: banner.image }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <Text style={styles.bannerTitle}>{banner.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>{currentUser?.name}</Text>
            <Text style={styles.userRole}>
              {userRole === 'admin_pusat' ? 'Admin Pusat' :
               userRole === 'admin_cabang' ? `Admin Cabang ${currentUser?.branch}` :
               'Member'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{ uri: currentUser?.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bannerContainer}
        >
          {banners.map(renderBanner)}
        </ScrollView>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {filteredMenuItems.map(renderMenuItem)}
        </View>

        {/* Quick Stats */}
        {(userRole === 'admin_pusat' || userRole === 'admin_cabang') && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1,250</Text>
                <Text style={styles.statLabel}>Total Members</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Rp125M</Text>
                <Text style={styles.statLabel}>Total Donations</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>150</Text>
                <Text style={styles.statLabel}>Active UMKM</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>25</Text>
                <Text style={styles.statLabel}>Branches</Text>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#757575',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  userRole: {
    fontSize: 14,
    color: '#2C5E1A',
    fontWeight: '500',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  bannerContainer: {
    paddingHorizontal: 16,
  },
  bannerItem: {
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: 280,
    height: 160,
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  menuItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 12,
    color: '#212121',
    textAlign: 'center',
  },
  statsContainer: {
    padding: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    padding: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C5E1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
});
