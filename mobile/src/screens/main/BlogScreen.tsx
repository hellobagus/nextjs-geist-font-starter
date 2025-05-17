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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

// Mock data for blog posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Pentingnya Zakat dalam Kehidupan Muslim',
    excerpt: 'Memahami makna dan manfaat zakat dalam kehidupan bermasyarakat',
    content: 'Lorem ipsum...',
    image: 'https://example.com/zakat-article.jpg',
    author: 'Ustadz Ahmad',
    date: '15 Jan 2024',
    category: 'Ibadah',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Program Pemberdayaan UMKM NU',
    excerpt: 'Bagaimana NU membantu mengembangkan UMKM di Indonesia',
    content: 'Lorem ipsum...',
    image: 'https://example.com/umkm-article.jpg',
    author: 'Tim Ekonomi NU',
    date: '14 Jan 2024',
    category: 'Ekonomi',
    readTime: 7,
  },
  {
    id: '3',
    title: 'Kegiatan Sosial NU Peduli',
    excerpt: 'Laporan kegiatan sosial NU Peduli di berbagai daerah',
    content: 'Lorem ipsum...',
    image: 'https://example.com/social-article.jpg',
    author: 'Admin Pusat',
    date: '13 Jan 2024',
    category: 'Sosial',
    readTime: 4,
  },
];

const categories = ['Semua', 'Ibadah', 'Ekonomi', 'Sosial', 'Pendidikan'];

export default function BlogScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const { userRole } = useAuth();

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderPost = (post: BlogPost) => (
    <TouchableOpacity
      key={post.id}
      style={styles.postCard}
      onPress={() => navigation.navigate('BlogDetail', { post })}
    >
      <Image
        source={{ uri: post.image }}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.postContent}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postExcerpt} numberOfLines={2}>
          {post.excerpt}
        </Text>
        <View style={styles.postMeta}>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{post.author}</Text>
            <Text style={styles.postDate}>{post.date}</Text>
          </View>
          <Text style={styles.readTime}>{post.readTime} min read</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blog</Text>
        {(userRole === 'admin_pusat' || userRole === 'admin_cabang') && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateBlogPost')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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

      {/* Blog Posts */}
      <ScrollView style={styles.postsContainer}>
        {filteredPosts.map(renderPost)}
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
    fontSize: 24,
    fontWeight: '700',
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
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
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
  postsContainer: {
    flex: 1,
    padding: 16,
  },
  postCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  postContent: {
    padding: 16,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#2C5E1A',
    fontWeight: '500',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  postExcerpt: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#212121',
    marginRight: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#757575',
  },
  readTime: {
    fontSize: 12,
    color: '#757575',
  },
});
