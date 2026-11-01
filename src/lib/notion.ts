import { Client } from '@notionhq/client';

// Interfaces untuk Type Safety
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  date: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  author: string;
  readingTime: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  content?: string;
  caption?: string;
  url?: string;
  language?: string;
  items?: string[];
  level?: number;
}

// Inisialisasi Notion Client
const notionToken = import.meta.env.NOTION_TOKEN || process.env.NOTION_TOKEN;
const databaseId = import.meta.env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: notionToken || '',
});

/**
 * Helper Slugify: Mengubah string judul menjadi format slug URL (lowercase, tanpa spasi/karakter khusus)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '') // Hapus semua karakter non-word
    .replace(/\-\-+/g, '-') // Ganti multiple - dengan single -
    .replace(/^-+/, '') // Trim - dari awal
    .replace(/-+$/, ''); // Trim - dari akhir
}

/**
 * Estimasi Waktu Baca
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min baca`;
}

// Fallback Mock Data jika Notion Token/Database ID belum disetup
const MOCK_POSTS: BlogPost[] = [
  {
    id: 'mock-1',
    title: 'Panduan Lengkap MPASI Pertama: Menu 6 Bulan Bergizi & Tekstur yang Tepat',
    slug: 'panduan-lengkap-mpasi-pertama-6-bulan',
    status: 'Published',
    date: '2026-09-25',
    tags: ['MPASI 6 Bulan', 'Panduan MPASI', 'Nutrisi Bayi'],
    excerpt: 'Memulai perjalanan MPASI si kecil? Pelajari jadwal, pilihan bahan makanan tunggal vs 4 bintang, dan cara mengatur tekstur puree yang aman untuk bayi 6 bulan.',
    coverImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Nutrisi Nakama MPASI',
    readingTime: '4 min baca',
  },
  {
    id: 'mock-2',
    title: '5 Resep Puree Nakama MPASI Praktis Kaya Zat Besi untuk Cegah Stunting',
    slug: '5-resep-puree-mpasi-nakama-mpasi-zat-besi',
    status: 'Published',
    date: '2026-09-20',
    tags: ['Resep MPASI', 'Zat Besi', 'Nakama MPASI'],
    excerpt: 'Zat besi sangat krusial untuk perkembangan otak bayi. Temukan 5 variasi menu MPASI homemade Nakama MPASI berbasis hati ayam, daging sapi, dan bayam Jepang.',
    coverImage: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Tiara, Sp.A',
    readingTime: '5 min baca',
  },
  {
    id: 'mock-3',
    title: 'Tanda Bayi Siap MPASI & Cara Mengatasi GTM (GTM/Grave Tasteless Month)',
    slug: 'tanda-bayi-siap-mpasi-dan-cara-mengatasi-gtm',
    status: 'Published',
    date: '2026-09-15',
    tags: ['Tips Mama', 'GTM Bayi', 'Edukasi MPASI'],
    excerpt: 'Si kecil mendadak tutup mulut saat makan? Jangan panik Ma! Kenali pemicu GTM dan trik variasi penyajian Nakama MPASI yang ampuh membangkitkan selera makan.',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Nutrisi Nakama MPASI',
    readingTime: '3 min baca',
  },
  {
    id: 'mock-4',
    title: 'Memilih Lemak Tambahan MPASI Terbaik: Santan, Butter, atau EVOO?',
    slug: 'memilih-lemak-tambahan-mpasi-terbaik',
    status: 'Published',
    date: '2026-09-10',
    tags: ['Nutrisi Bayi', 'Tips Mama', 'Edukasi MPASI'],
    excerpt: 'Lemak tambahan penting untuk meningkatkan kalori MPASI dan menunjang tumbuh kembang otak bayi. Simak perbandingan manfaat santan, butter, dan olive oil.',
    coverImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Nutrisi Nakama MPASI',
    readingTime: '4 min baca',
  }
];

const MOCK_BLOCKS: Record<string, NotionBlock[]> = {
  'panduan-lengkap-mpasi-pertama-6-bulan': [
    { id: 'b1', type: 'heading_2', content: 'Mengapa MPASI Dimulai Usia 6 Bulan?' },
    { id: 'b2', type: 'paragraph', content: 'Pada usia 6 bulan, ASI saja sudah tidak lagi mencukupi kebutuhan nutrisi makro dan mikro si kecil, terutama **zat besi** dan **kalori**. MPASI (Makanan Pendamping ASI) hadir untuk melengkapi kebutuhan gizi tumbuh kembang anak secara optimal.' },
    { id: 'b3', type: 'heading_3', content: 'Tanda-tanda Bayi Siap Menerima MPASI' },
    { id: 'b4', type: 'paragraph', content: 'Sebelum mulai menyuapkan Nakama MPASI, pastikan Ma sudah melihat tanda kesiapan berikut:' },
    { id: 'b5', type: 'bulleted_list_item', items: ['Sudah bisa duduk tegak dengan leher stabil', 'Refleks menjulurkan lidah (extrusive reflex) berkurang', 'Tertarik melihat makanan orang dewasa di sekitarnya', 'Masih tampak lapar meski sudah diberi ASI/formula secara cukup'] },
    { id: 'b6', type: 'heading_2', content: 'Prinsip Menu 4 Bintang Nakama MPASI' },
    { id: 'b7', type: 'paragraph', content: 'Menu MPASI yang sehat dan seimbang wajib mengandung 4 komponen utama gizi:' },
    { id: 'b8', type: 'numbered_list_item', items: ['**Karbohidrat**: Beras putih, beras merah, kentang, atau ubi jalar', '**Protein Hewani**: Daging sapi, hati ayam, telur, atau ikan salmon (Sangat dianjurkan disajikan setiap hari!)', '**Protein Nabati**: Tahu, tempe, atau kacang hijau', '**Sayuran & Lemak Tambahan**: Wortel, labu siam, minyak kelapa/butter'] },
    { id: 'b9', type: 'quote', content: 'Ingat Ma, protein hewani adalah kunci utama mencegah stunting pada 1000 Hari Pertama Kehidupan (HPK).' },
    { id: 'b10', type: 'image', url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80', caption: 'Tekstur puree halus kaya nutrisi untuk awal MPASI 6 bulan' }
  ]
};

/**
 * Fetch semua artikel yang terpublish dari Notion Database
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!notionToken || !databaseId || notionToken.includes('your_notion') || notionToken.includes('your_32_character')) {
    console.warn('⚠️ NOTION_TOKEN atau NOTION_DATABASE_ID belum diatur di file .env. Menggunakan mock data demo.');
    return MOCK_POSTS;
  }

  try {
    // 1. Coba query dengan filter Status = Published dulu
    let response;
    try {
      response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      });
    } catch (filterError) {
      // Jika filter Status gagal (misal properti Status belum dibuat), query semua data di database
      console.warn('⚠️ Filter Status "Published" tidak ditemukan atau bermasalah. Mengambil semua data database...');
      response = await notion.databases.query({
        database_id: databaseId,
      });
    }

    // 2. Jika dengan filter Status = Published hasilnya 0, coba query tanpa filter agar artikel tetap muncul
    if (!response || response.results.length === 0) {
      console.info('ℹ️ Tidak ada artikel dengan Status="Published". Mengambil seluruh baris database...');
      response = await notion.databases.query({
        database_id: databaseId,
      });
    }

    if (!response || response.results.length === 0) {
      console.warn('⚠️ Database Notion terhubung tetapi belum ada isi halaman/artikel di dalamnya.');
      return [];
    }

    const posts: BlogPost[] = response.results.map((page: any) => {
      const props = page.properties || {};
      
      // Helper pencari properti tanpa peduli besar/kecil huruf
      const findProp = (name: string) => {
        const key = Object.keys(props).find((k) => k.toLowerCase() === name.toLowerCase());
        return key ? props[key] : null;
      };

      // 1. Title
      const titleObj = findProp('Title') || findProp('Name') || findProp('Judul');
      const title = titleObj?.title?.[0]?.plain_text || 'Tanpa Judul';

      // 2. Slug
      const slugObj = findProp('Slug') || findProp('Url');
      const rawSlug = slugObj?.rich_text?.[0]?.plain_text || title;
      const slug = slugify(rawSlug);

      // 3. Status
      const statusObj = findProp('Status');
      const status = statusObj?.select?.name || 'Published';

      // 4. Date
      const dateObj = findProp('Date') || findProp('Tanggal');
      const date = dateObj?.date?.start || page.created_time?.split('T')[0] || new Date().toISOString().split('T')[0];

      // 5. Tags
      const tagsObj = findProp('Tags') || findProp('Tag') || findProp('Kategori');
      const tags = tagsObj?.multi_select && tagsObj.multi_select.length > 0 
        ? tagsObj.multi_select.map((t: any) => t.name) 
        : ['MPASI'];

      // 6. Excerpt
      const excerptObj = findProp('Excerpt') || findProp('Ringkasan') || findProp('Deskripsi');
      const excerpt = excerptObj?.rich_text?.[0]?.plain_text || 'Baca panduan lengkap MPASI dan nutrisi bayi di Makanan Bayi Nakama MPASI.';

      // 7. Cover Image
      let coverImage = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80';
      if (page.cover) {
        coverImage = page.cover.type === 'external' ? page.cover.external.url : page.cover.file.url;
      } else {
        const coverProp = findProp('Cover') || findProp('Gambar');
        if (coverProp?.files && coverProp.files.length > 0) {
          const fileObj = coverProp.files[0];
          coverImage = fileObj.type === 'external' ? fileObj.external.url : fileObj.file.url;
        }
      }

      return {
        id: page.id,
        title,
        slug,
        status: status as any,
        date,
        tags,
        excerpt,
        coverImage,
        author: 'Tim Nutrisi Nakama MPASI',
        readingTime: calculateReadingTime(excerpt + ' ' + title + ' ' + tags.join(' ')),
      };
    });

    return posts;
  } catch (error) {
    console.error('❌ Error saat mengambil data dari Notion Database:', error);
    return MOCK_POSTS;
  }
}

/**
 * Fetch detail 1 artikel berdasarkan slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedPosts();
  const post = posts.find((p) => p.slug === slug || slugify(p.title) === slug);
  return post || MOCK_POSTS[0];
}

/**
 * Fetch artikel terkait berdasarkan Tag yang sama
 */
export async function getRelatedPosts(currentSlug: string, tags: string[], limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug);
  
  // Filter berdasarkan kesamaan tag
  const matchingPosts = otherPosts.filter((p) => p.tags.some((t) => tags.includes(t)));
  
  if (matchingPosts.length >= limit) {
    return matchingPosts.slice(0, limit);
  }
  
  // Gabungkan jika kurang dari limit
  const remaining = otherPosts.filter((p) => !matchingPosts.includes(p));
  return [...matchingPosts, ...remaining].slice(0, limit);
}

/**
 * Fetch Notion Blocks (isi konten halaman artikel)
 */
export async function getNotionBlocks(pageId: string, slug?: string): Promise<NotionBlock[]> {
  if (!notionToken || pageId.startsWith('mock-')) {
    if (slug && MOCK_BLOCKS[slug]) {
      return MOCK_BLOCKS[slug];
    }
    return MOCK_BLOCKS['panduan-lengkap-mpasi-pertama-6-bulan'];
  }

  try {
    const blocksResponse = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    const parsedBlocks: NotionBlock[] = [];

    for (const block of blocksResponse.results as any[]) {
      const type = block.type;
      
      if (type === 'heading_1' || type === 'heading_2' || type === 'heading_3') {
        const textContent = block[type]?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        parsedBlocks.push({ id: block.id, type, content: textContent });
      } else if (type === 'paragraph') {
        const textContent = block.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        if (textContent) {
          parsedBlocks.push({ id: block.id, type: 'paragraph', content: textContent });
        }
      } else if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
        const textContent = block[type]?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        parsedBlocks.push({ id: block.id, type, content: textContent });
      } else if (type === 'quote') {
        const textContent = block.quote?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        parsedBlocks.push({ id: block.id, type: 'quote', content: textContent });
      } else if (type === 'code') {
        const textContent = block.code?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        const language = block.code?.language || 'text';
        parsedBlocks.push({ id: block.id, type: 'code', content: textContent, language });
      } else if (type === 'image') {
        const imgUrl = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
        const caption = block.image.caption?.map((t: any) => t.plain_text).join('') || '';
        parsedBlocks.push({ id: block.id, type: 'image', url: imgUrl, caption });
      }
    }

    return parsedBlocks.length > 0 ? parsedBlocks : MOCK_BLOCKS['panduan-lengkap-mpasi-pertama-6-bulan'];
  } catch (error) {
    console.error(`Error fetching blocks for page ${pageId}:`, error);
    return MOCK_BLOCKS['panduan-lengkap-mpasi-pertama-6-bulan'];
  }
}
