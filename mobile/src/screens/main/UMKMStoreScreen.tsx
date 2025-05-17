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

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
  category: string;
  rating: number;
  sold: number;
}

// Mock data for UMKM products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Batik Tulis Motif Mega Mendung',
    price: 450000,
    image: 'https://example.com/batik1.jpg',
    seller: 'Batik Cirebon Collection',
    category: 'Fashion',
    rating: 4.8,
    sold: 50,
  },
  {
    id: '2',
    name: 'Kopi Arabika Gayo',
    price: 85000,
    image: 'https://example.com/coffee1.jpg',
    seller: 'Gayo Coffee House',
    category: 'F&B',
    rating: 4.9,
    sold: 120,
  },
  {
    id: '3',
    name: 'Tas Anyaman Rotan',
    price: 175000,
    image: 'https://example.com/bag1.jpg',
    seller: 'Pengrajin Rotan Jaya',
    category: 'Accessories',
    rating: 4.7,
    sold: 35,
  },
];

const categories = ['All', 'Fashion', 'F&B', 'Accessories', 'Craft', 'Home Decor'];

export default function UMKMStoreScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { userRole } = useAuth();

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const renderProduct = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product })}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        <Text style={styles.sellerName}>{product.seller}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.sold}>Terjual {product.sold}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {userRole === 'admin_pusat' || userRole === 'admin_cabang' ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {filteredProducts.map(renderProduct)}
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
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
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
  categoriesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryButtonSelected: {
    backgroundColor: '#2C5E1A',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#757575',
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productCard: {
    width: '50%',
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C5E1A',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 12,
    color: '#757575',
  },
  sold: {
    fontSize: 12,
    color: '#757575',
  },
});
