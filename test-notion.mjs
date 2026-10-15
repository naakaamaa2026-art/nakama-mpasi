import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join('=').trim();
    }
  });
}

const notionToken = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

console.log('=== TEST KONEKSI NOTION API ===');
console.log('NOTION_TOKEN:', notionToken ? (notionToken.substring(0, 10) + '...') : 'BELUM DIISI');
console.log('NOTION_DATABASE_ID:', databaseId || 'BELUM DIISI');
console.log('-----------------------------------');

if (!notionToken || notionToken.includes('your_notion')) {
  console.error('❌ NOTION_TOKEN masih berisi nilai default (placeholder) di file .env.');
  console.error('👉 Silakan ganti NOTION_TOKEN di file .env dengan token asli dari https://www.notion.so/my-integrations');
  process.exit(1);
}

if (!databaseId || databaseId.includes('your_32_character')) {
  console.error('❌ NOTION_DATABASE_ID masih berisi nilai default (placeholder) di file .env.');
  console.error('👉 Silakan ganti NOTION_DATABASE_ID di file .env dengan 32 karakter ID database Notion milikmu.');
  process.exit(1);
}

const notion = new Client({ auth: notionToken });

async function testNotion() {
  try {
    console.log('🔄 Menghubungi Notion API...');
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    console.log('✅ SUKSES! Terhubung ke Notion Database!');
    console.log(`📊 Jumlah artikel/baris ditemukan: ${response.results.length}`);

    if (response.results.length > 0) {
      console.log('\n📄 Contoh artikel pertama dari Notion:');
      const firstPage = response.results[0];
      const props = firstPage.properties;
      console.log('- ID:', firstPage.id);
      console.log('- Properti yang ada di Notion:', Object.keys(props).join(', '));
    } else {
      console.log('⚠️ Database terhubung, tetapi belum ada isi halaman/baris di database Notion kamu.');
    }
  } catch (error) {
    console.error('❌ GAGAL terhubung ke Notion API!');
    console.error('Pesan Error:', error.message || error);
    console.error('\n💡 Kemungkinan Penyebab:');
    console.error('1. NOTION_TOKEN salah atau terhapus.');
    console.error('2. NOTION_DATABASE_ID salah (harus 32 karakter).');
    console.error('3. Integrasi Notion belum dihubungkan ke Database (buka database Notion -> titik tiga "..." -> Connections / Hubungkan -> pilih nama integrasimu).');
  }
}

testNotion();
