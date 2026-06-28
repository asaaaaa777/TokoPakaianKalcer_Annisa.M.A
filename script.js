// ===================== DATA PRODUK =====================
const PRODUK = [
  {
    id: 1, nama: 'Kaos Oversize', emoji: '👕', harga: 85000, stok: 25,
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], tipe: 'baju',
    rating: 4.8, jmlUlasan: 24,
    desc: 'Kaos oversize premium bahan katun combed 30s, nyaman dan breathable. Cocok daily wear.',
    ulasan: [
      { nama: 'Andi', bintang: 5, teks: 'Kualitas bagus banget! Bahan adem dan jahitannya rapi.', tgl: '15 Jun 2025' },
      { nama: 'Siti', bintang: 4, teks: 'Ukurannya pas, warnanya juga sesuai foto.', tgl: '10 Jun 2025' }
    ]
  },
  {
    id: 2, nama: 'Celana Jeans', emoji: '👖', harga: 150000, stok: 15,
    ukuran: ['27', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40'], tipe: 'celana',
    rating: 4.6, jmlUlasan: 18,
    desc: 'Celana jeans slim fit premium, bahan denim berkualitas. Tahan lama dan stylish.',
    ulasan: [
      { nama: 'Budi', bintang: 5, teks: 'Bahan denimnya tebal dan berkualitas. Sangat puas!', tgl: '12 Jun 2025' }
    ]
  },
  {
    id: 3, nama: 'Dress Wanita', emoji: '👗', harga: 275000, stok: 20,
    ukuran: ['XS', 'S', 'M', 'L', 'XL'], tipe: 'baju',
    rating: 4.9, jmlUlasan: 35,
    desc: 'Dress wanita elegan dengan motif floral, cocok untuk berbagai kesempatan formal dan semi-formal.',
    ulasan: [
      { nama: 'Rini', bintang: 5, teks: 'Cantik banget! Bahannya adem dan jatuhnya bagus.', tgl: '18 Jun 2025' },
      { nama: 'Maya', bintang: 5, teks: 'Sudah pesan 2x, selalu memuaskan!', tgl: '5 Jun 2025' }
    ]
  },
  {
    id: 4, nama: 'Hoodie Unisex', emoji: '🧥', harga: 210000, stok: 25,
    ukuran: ['S', 'M', 'L', 'XL'], tipe: 'baju',
    rating: 4.7, jmlUlasan: 42,
    desc: 'Hoodie unisex bahan fleece premium, hangat dan stylish. Tersedia berbagai warna.',
    ulasan: [
      { nama: 'Kevin', bintang: 4, teks: 'Bahannya tebal dan hangat, suka banget!', tgl: '20 Jun 2025' }
    ]
  },
  {
    id: 5, nama: 'Kemeja Formal', emoji: '👔', harga: 110000, stok: 30,
    ukuran: ['S', 'M', 'L', 'XL'], tipe: 'baju',
    rating: 4.5, jmlUlasan: 19,
    desc: 'Kemeja formal slim fit bahan oxford, cocok untuk kerja, meeting, atau acara formal.',
    ulasan: [
      { nama: 'Hendra', bintang: 5, teks: 'Kemejanya rapi dan bahannya tidak mudah kusut.', tgl: '8 Jun 2025' }
    ]
  },
  {
    id: 6, nama: 'Kaos Crop Top', emoji: '👚', harga: 100000, stok: 35,
    ukuran: ['XS', 'S', 'M', 'L'], tipe: 'baju',
    rating: 4.6, jmlUlasan: 27,
    desc: 'Crop top trendi dengan berbagai pilihan warna. Cocok untuk casual, ke mall, atau konser.',
    ulasan: [
      { nama: 'Putri', bintang: 5, teks: 'Bahannya stretch, nyaman dipakai seharian!', tgl: '14 Jun 2025' }
    ]
  },
];

// ===================== STATE =====================
let keranjang = [];
let produkAktif = null;
let ukuranDipilih = null;
let qty = 1;
let bintangDipilih = 5;
let checkoutStep = 1;
let orderAktif = null;
let chatTerbuka = false;
let kurirDipilih = null;
let paymentDipilih = null;

// ===================== RENDER PRODUK =====================
function renderProduk() {
  const grid = document.getElementById('produk-grid');
  grid.innerHTML = PRODUK.map(p => `
    <div class="produk-card" onclick="bukaDetail(${p.id})">
      <div class="produk-img">${p.emoji}</div>
      <div class="produk-info">
        <h3>${p.nama}</h3>
        <div class="rating">${'⭐'.repeat(Math.round(p.rating))} <span>(${p.jmlUlasan} ulasan)</span></div>
        <div class="harga">${formatRp(p.harga)}</div>
        <div class="stok"><span class="badge badge-green">✅ Stok ${p.stok} pcs</span></div>
        <button class="btn-detail" style="margin-top:12px">Lihat Detail</button>
      </div>
    </div>
  `).join('');
}

// ===================== DETAIL PRODUK =====================
function bukaDetail(id) {
  produkAktif = PRODUK.find(p => p.id === id);
  ukuranDipilih = null;
  qty = 1;

  document.getElementById('detail-img').textContent    = produkAktif.emoji;
  document.getElementById('detail-nama').textContent   = produkAktif.nama;
  document.getElementById('detail-harga').textContent  = formatRp(produkAktif.harga);
  document.getElementById('detail-desc').textContent   = produkAktif.desc;
  document.getElementById('detail-stok').textContent   = `✅ Stok: ${produkAktif.stok} pcs`;
  document.getElementById('detail-rating').innerHTML   =
    `${'⭐'.repeat(Math.round(produkAktif.rating))} <span>(${produkAktif.jmlUlasan} ulasan)</span>`;
  document.getElementById('qty-num').textContent = 1;

  renderUkuran();
  renderUlasan();
  gantiTab('detail', 'tab-detail');
  bukaModal('overlay-detail');
}

function renderUkuran() {
  const g = document.getElementById('ukuran-group');
  g.innerHTML = produkAktif.ukuran.map(u =>
    `<button class="ukuran-btn" onclick="pilihUkuran('${u}', this)">${u}</button>`
  ).join('');
}

function pilihUkuran(u, btn) {
  document.querySelectorAll('#ukuran-group .ukuran-btn').forEach(b => b.classList.remove('aktif'));
  btn.classList.add('aktif');
  ukuranDipilih = u;
}

function ubahQty(d) {
  qty = Math.max(1, Math.min(qty + d, produkAktif.stok));
  document.getElementById('qty-num').textContent = qty;
}

function tambahKeKeranjang() {
  if (!ukuranDipilih) { alert('Pilih ukuran terlebih dahulu!'); return; }
  const key = `${produkAktif.id}-${ukuranDipilih}`;
  const ada = keranjang.find(k => k.key === key);
  if (ada) {
    ada.qty += qty;
  } else {
    keranjang.push({
      key,
      id: produkAktif.id,
      nama: produkAktif.nama,
      emoji: produkAktif.emoji,
      harga: produkAktif.harga,
      ukuran: ukuranDipilih,
      qty
    });
  }
  updateCartCount();
  tutupModal('overlay-detail');
  notifTambah();
}

function beliSekarang() {
  tambahKeKeranjang();
  setTimeout(() => mulaicheckout(), 100);
}

function notifTambah() {
  const btn = document.querySelector('.cart-btn');
  btn.style.background = '#16a34a';
  setTimeout(() => btn.style.background = '#ec4899', 1200);
}

function updateCartCount() {
  const total = keranjang.reduce((a, b) => a + b.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

// ===================== KERANJANG =====================
function bukaKeranjang() {
  const el  = document.getElementById('isi-keranjang');
  const tot = document.getElementById('total-keranjang');

  if (keranjang.length === 0) {
    el.innerHTML = `
      <div style="text-align:center;padding:40px;color:#6b7280">
        <div style="font-size:3rem;margin-bottom:12px">🛒</div>
        <p>Keranjangmu masih kosong</p>
        <button class="tombol" style="margin-top:12px"
          onclick="tutupModal('overlay-keranjang');scrollToSection('produk')">
          Belanja Sekarang
        </button>
      </div>`;
    tot.style.display = 'none';
  } else {
    el.innerHTML = keranjang.map(item => `
      <div class="keranjang-item">
        <div class="keranjang-img">${item.emoji}</div>
        <div class="keranjang-detail">
          <h4>${item.nama}</h4>
          <div class="meta">Ukuran: ${item.ukuran} · Qty: ${item.qty}</div>
          <div class="harga-item">${formatRp(item.harga * item.qty)}</div>
        </div>
        <button class="hapus-btn" onclick="hapusKeranjang('${item.key}')">🗑️</button>
      </div>
    `).join('');

    const subtotal = keranjang.reduce((a, b) => a + b.harga * b.qty, 0);
    const ongkir   = subtotal >= 250000 ? 0 : 15000;

    document.getElementById('subtotal-val').textContent = formatRp(subtotal);
    document.getElementById('ongkir-val').textContent   = ongkir === 0 ? '🎉 Gratis' : formatRp(ongkir);
    document.getElementById('total-val').textContent    = formatRp(subtotal + ongkir);
    tot.style.display = 'block';
  }
  bukaModal('overlay-keranjang');
}

function hapusKeranjang(key) {
  keranjang = keranjang.filter(k => k.key !== key);
  updateCartCount();
  bukaKeranjang();
}

// ===================== CHECKOUT =====================
function mulaicheckout() {
  tutupModal('overlay-keranjang');
  checkoutStep = 1;
  renderCheckout();
  bukaModal('overlay-checkout');
}

function renderCheckout() {
  // Update step bar
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`step-${i}`);
    el.classList.remove('aktif', 'done');
    if (i < checkoutStep) el.classList.add('done');
    if (i === checkoutStep) el.classList.add('aktif');
  }

  const cc       = document.getElementById('checkout-content');
  const subtotal = keranjang.reduce((a, b) => a + b.harga * b.qty, 0);
  const ongkir   = subtotal >= 250000 ? 0 : 15000;
  const total    = subtotal + ongkir;

  // ---------- STEP 1: ALAMAT ----------
  if (checkoutStep === 1) {
    cc.innerHTML = `
      <h3 style="margin-bottom:16px;color:#374151">📍 Alamat Pengiriman</h3>
      <div class="form-group">
        <label>Nama Penerima</label>
        <input type="text" id="co-nama" placeholder="Nama lengkap penerima"/>
      </div>
      <div class="form-group">
        <label>Nomor WhatsApp</label>
        <input type="tel" id="co-telp" placeholder="08xxxxxxxxxx"/>
      </div>
      <div class="form-group">
        <label>Provinsi</label>
        <select id="co-prov">
          <option value="">Pilih Provinsi</option>
          <option>Banten</option>
          <option>DKI Jakarta</option>
          <option>Jawa Barat</option>
          <option>Jawa Tengah</option>
          <option>Jawa Timur</option>
          <option>DIY Yogyakarta</option>
          <option>Sumatera Utara</option>
          <option>Lainnya</option>
        </select>
      </div>
      <div class="form-group">
        <label>Kota / Kabupaten</label>
        <input type="text" id="co-kota" placeholder="Contoh: Tangerang"/>
      </div>
      <div class="form-group">
        <label>Alamat Lengkap</label>
        <textarea id="co-alamat" rows="3"
          placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan..."></textarea>
      </div>
      <div class="form-group">
        <label>Kode Pos</label>
        <input type="text" id="co-kodepos" placeholder="Contoh: 15111"/>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:8px">
        <button class="tombol" onclick="nextStep(1)">Lanjut ke Pengiriman →</button>
      </div>`;

  // ---------- STEP 2: PENGIRIMAN ----------
  } else if (checkoutStep === 2) {
    const kurir = [
      { k: 'jne',      nama: 'JNE REG',       est: '2-3 hari', harga: 15000 },
      { k: 'jnt',      nama: 'J&T Express',    est: '1-2 hari', harga: 18000 },
      { k: 'sicepat',  nama: 'SiCepat BEST',   est: '1-2 hari', harga: 20000 },
      { k: 'anteraja', nama: 'AnterAja',        est: '2-4 hari', harga: 12000 },
    ];
    cc.innerHTML = `
      <h3 style="margin-bottom:16px;color:#374151">🚚 Metode Pengiriman</h3>
      <div id="pengiriman-opts" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
        ${kurir.map(p => `
          <label style="border:2px solid #e5e7eb;border-radius:12px;padding:14px;cursor:pointer;
            display:flex;align-items:center;gap:12px;transition:.2s" id="opt-${p.k}">
            <input type="radio" name="kurir" value="${p.k}" onclick="pilihKurir('${p.k}')"
              style="width:auto;margin:0"/>
            <div style="flex:1">
              <div style="font-weight:600;font-size:.9rem">${p.nama}</div>
              <div style="font-size:.8rem;color:#6b7280">Estimasi ${p.est}</div>
            </div>
            <div style="font-weight:700;color:#ec4899">${formatRp(p.harga)}</div>
          </label>`).join('')}
      </div>
      <h3 style="margin-bottom:16px;color:#374151">📋 Ringkasan Pesanan</h3>
      <div style="background:#f9fafb;border-radius:12px;padding:16px;margin-bottom:16px">
        ${keranjang.map(k => `
          <div style="display:flex;justify-content:space-between;font-size:.88rem;margin-bottom:6px">
            <span>${k.emoji} ${k.nama} (${k.ukuran}) ×${k.qty}</span>
            <span>${formatRp(k.harga * k.qty)}</span>
          </div>`).join('')}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:10px 0"/>
        <div style="display:flex;justify-content:space-between;font-weight:700;color:#ec4899">
          <span>Total (belum termasuk ongkir)</span>
          <span>${formatRp(subtotal)}</span>
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:space-between">
        <button class="tombol tombol-outline" onclick="checkoutStep=1;renderCheckout()">← Kembali</button>
        <button class="tombol" onclick="nextStep(2)">Lanjut ke Pembayaran →</button>
      </div>`;

  // ---------- STEP 3: PEMBAYARAN ----------
  } else if (checkoutStep === 3) {
    const methods = [
      { k: 'transfer', icon: '🏦', nama: 'Transfer Bank' },
      { k: 'qris',     icon: '📱', nama: 'QRIS' },
      { k: 'cod',      icon: '💵', nama: 'Bayar di Tempat (COD)' },
      { k: 'ewallet',  icon: '💳', nama: 'E-Wallet' },
    ];
    cc.innerHTML = `
      <h3 style="margin-bottom:16px;color:#374151">💳 Metode Pembayaran</h3>
      <div class="payment-opts">
        ${methods.map(m => `
          <div class="pay-opt" onclick="pilihPayment('${m.k}', this)" id="pay-${m.k}">
            <div class="pay-icon">${m.icon}</div>
            <div class="pay-name">${m.nama}</div>
          </div>`).join('')}
      </div>
      <div id="payment-detail"
        style="background:#fff1f7;border-radius:12px;padding:16px;margin-bottom:16px;display:none">
      </div>
      <div class="total-keranjang" style="margin-bottom:16px">
        <div class="total-row"><span>Subtotal</span><span>${formatRp(subtotal)}</span></div>
        <div class="total-row"><span>Ongkir</span><span>${formatRp(ongkir)}</span></div>
        <div class="total-row grand"><span>Total Bayar</span><span>${formatRp(total)}</span></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:space-between">
        <button class="tombol tombol-outline" onclick="checkoutStep=2;renderCheckout()">← Kembali</button>
        <button class="tombol" onclick="bayar()">✅ Konfirmasi Pembayaran</button>
      </div>`;

  // ---------- STEP 4: SELESAI ----------
  } else if (checkoutStep === 4) {
    const resi = 'KALCER-' + Date.now().toString().slice(-8);
    orderAktif = { resi, total, step: 1 };
    cc.innerHTML = `
      <div class="success-box">
        <div class="success-icon">🎉</div>
        <h3 style="font-size:1.4rem;color:#16a34a;margin-bottom:8px">Pesanan Berhasil!</h3>
        <p style="color:#6b7280;margin-bottom:20px">Terima kasih sudah belanja di Toko Pakaian Kalcer!</p>
        <div class="resi-box">
          <div style="font-size:.85rem;color:#6b7280;margin-bottom:4px">Nomor Resi Pengiriman</div>
          <div class="resi-num">${resi}</div>
          <div style="font-size:.8rem;color:#6b7280;margin-top:6px">Simpan nomor ini untuk melacak pesananmu</div>
        </div>
        <div style="background:#f9fafb;border-radius:12px;padding:16px;margin:16px 0;text-align:left">
          <div style="font-size:.85rem;font-weight:600;color:#374151;margin-bottom:8px">Detail Pesanan:</div>
          ${keranjang.map(k => `
            <div style="font-size:.83rem;color:#6b7280;margin-bottom:3px">
              ${k.emoji} ${k.nama} (${k.ukuran}) ×${k.qty} = ${formatRp(k.harga * k.qty)}
            </div>`).join('')}
          <div style="font-weight:700;color:#ec4899;margin-top:8px;font-size:.9rem">
            Total: ${formatRp(total)}
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:16px">
          <button class="tombol" onclick="lacakPesanan()">📦 Lacak Pesanan</button>
          <button class="tombol tombol-outline" onclick="selesaiCheckout()">Selesai</button>
        </div>
      </div>`;
    keranjang = [];
    updateCartCount();
  }
}

function pilihKurir(k) {
  document.querySelectorAll('[id^="opt-"]').forEach(el => el.style.borderColor = '#e5e7eb');
  document.getElementById(`opt-${k}`).style.borderColor = '#ec4899';
  kurirDipilih = k;
}

function pilihPayment(k, el) {
  document.querySelectorAll('.pay-opt').forEach(e => e.classList.remove('aktif'));
  el.classList.add('aktif');
  paymentDipilih = k;

  const pd = document.getElementById('payment-detail');
  pd.style.display = 'block';
  const info = {
    transfer: '🏦 Transfer ke BCA 1234567890 a.n. Toko Pakaian Kalcer. Kirim bukti transfer via WhatsApp.',
    qris:     '📱 Scan QRIS di bawah ini menggunakan GoPay, OVO, Dana, atau aplikasi banking manapun.',
    cod:      '💵 Bayar saat paket tiba. Pastikan kamu ada di rumah saat pengiriman.',
    ewallet:  '💳 Bayar via GoPay / OVO / Dana. Nomor tujuan: 0812-3456-7890 (Toko Pakaian Kalcer).',
  };
  pd.innerHTML = `<p style="font-size:.88rem;color:#374151">${info[k]}</p>`;
}

function nextStep(from) {
  if (from === 1) {
    const nama   = document.getElementById('co-nama')?.value;
    const telp   = document.getElementById('co-telp')?.value;
    const prov   = document.getElementById('co-prov')?.value;
    const kota   = document.getElementById('co-kota')?.value;
    const alamat = document.getElementById('co-alamat')?.value;
    if (!nama || !telp || !prov || !kota || !alamat) {
      alert('Lengkapi semua field alamat!'); return;
    }
  }
  if (from === 2 && !kurirDipilih) { alert('Pilih kurir pengiriman!'); return; }
  checkoutStep++;
  renderCheckout();
}

function bayar() {
  if (!paymentDipilih) { alert('Pilih metode pembayaran!'); return; }
  checkoutStep = 4;
  renderCheckout();
}

function selesaiCheckout() {
  tutupModal('overlay-checkout');
  scrollToSection('beranda');
}

// ===================== TRACKING =====================
function lacakPesanan() {
  tutupModal('overlay-checkout');
  const steps = [
    { label: 'Pesanan Dikonfirmasi', desc: 'Pesananmu sedang diproses oleh tim kami.',    time: 'Baru saja',      done: true,  aktif: false },
    { label: 'Dikemas',              desc: 'Pakaianmu sedang dikemas dengan aman.',        time: 'Estimasi 1 jam', done: false, aktif: true  },
    { label: 'Dikirim',              desc: 'Paket sedang dalam perjalanan.',               time: 'Estimasi besok', done: false, aktif: false },
    { label: 'Diterima',             desc: 'Paket telah sampai di tujuan.',                time: '-',              done: false, aktif: false },
  ];
  const tc = document.getElementById('tracking-content');
  tc.innerHTML = `
    <div style="background:#fff1f7;border-radius:12px;padding:14px;margin-bottom:20px">
      <div style="font-size:.8rem;color:#6b7280">Nomor Resi</div>
      <div style="font-size:1.1rem;font-weight:700;color:#ec4899">
        ${orderAktif?.resi || 'KALCER-12345678'}
      </div>
      <div style="font-size:.8rem;color:#6b7280;margin-top:4px">Kurir: JNE REG · Estimasi 2-3 hari</div>
    </div>
    <div class="track-steps">
      ${steps.map((s, i) => `
        <div class="track-step">
          <div class="track-step-line">
            <div class="track-dot ${s.done ? 'done' : ''} ${s.aktif ? 'aktif' : ''}"></div>
            ${i < steps.length - 1
              ? `<div class="track-line ${s.done ? 'done' : ''}"></div>`
              : ''}
          </div>
          <div class="track-info">
            <h4 style="color:${s.aktif ? '#ec4899' : s.done ? '#16a34a' : '#6b7280'}">${s.label}</h4>
            <p>${s.desc}</p>
            <div class="track-time">${s.time}</div>
          </div>
        </div>`).join('')}
    </div>`;
  bukaModal('overlay-tracking');
}

// ===================== ULASAN =====================
function renderUlasan() {
  const el = document.getElementById('list-ulasan');
  if (!el || !produkAktif) return;
  el.innerHTML = produkAktif.ulasan.map(u => `
    <div class="review-card">
      <div class="review-header">
        <span class="reviewer">👤 ${u.nama}</span>
        <span class="stars">${'⭐'.repeat(u.bintang)}</span>
      </div>
      <div class="review-text">${u.teks}</div>
      <div class="review-meta">📅 ${u.tgl}</div>
    </div>`).join('');
}

function setBintang(n) {
  bintangDipilih = n;
  document.querySelectorAll('#star-input span').forEach((s, i) => {
    s.classList.toggle('aktif', i < n);
  });
}

function kirimUlasan() {
  const nama = document.getElementById('rev-nama').value.trim();
  const teks = document.getElementById('rev-text').value.trim();
  if (!nama || !teks) { alert('Isi nama dan ulasan kamu!'); return; }
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  produkAktif.ulasan.unshift({ nama, bintang: bintangDipilih, teks, tgl: today });
  produkAktif.jmlUlasan++;
  renderUlasan();
  document.getElementById('rev-nama').value = '';
  document.getElementById('rev-text').value = '';
  setBintang(5);
  alert('✅ Ulasan berhasil dikirim!');
}

// ===================== CHAT =====================
const csAutoReply = [
  'Tentu! Ada yang bisa saya bantu? 😊',
  'Produk kami tersedia dari ukuran XS hingga XL untuk baju, dan 27-40 untuk celana.',
  'Pengiriman tersedia ke seluruh Indonesia! Estimasi 1-4 hari tergantung kurir yang dipilih.',
  'Untuk info stok dan ukuran tertentu, kamu bisa langsung lihat di halaman produk ya!',
  'Pembayaran bisa via Transfer Bank, QRIS, COD, atau E-Wallet. Semua aman!',
  'Kalau ada pertanyaan lain, jangan ragu tanya ya! 💕',
];
let replyIdx = 0;

function toggleChat() {
  chatTerbuka = !chatTerbuka;
  document.getElementById('chat-box').classList.toggle('aktif', chatTerbuka);
  document.getElementById('chat-notif').style.display = 'none';
  if (chatTerbuka && document.getElementById('chat-messages').children.length === 0) {
    setTimeout(() => tambahMsgCS(csAutoReply[0]), 400);
    setTimeout(() => tambahMsgCS(csAutoReply[1]), 1200);
    replyIdx = 2;
  }
}

function tambahMsgCS(teks) {
  const el  = document.getElementById('chat-messages');
  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  el.innerHTML += `
    <div style="display:flex;flex-direction:column;align-items:flex-start">
      <div class="msg cs">${teks}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  el.scrollTop = el.scrollHeight;
}

function tambahMsgUser(teks) {
  const el  = document.getElementById('chat-messages');
  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  el.innerHTML += `
    <div style="display:flex;flex-direction:column;align-items:flex-end">
      <div class="msg user">${teks}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  el.scrollTop = el.scrollHeight;
}

function kirimChat() {
  const input = document.getElementById('chat-input');
  const teks  = input.value.trim();
  if (!teks) return;
  tambahMsgUser(teks);
  input.value = '';
  setTimeout(() => {
    const balasan = csAutoReply[replyIdx % csAutoReply.length];
    tambahMsgCS(balasan);
    replyIdx++;
  }, 1000);
}

// ===================== TABS =====================
function gantiTab(nama, prefix) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('aktif'));
  const tabEls = document.querySelectorAll('.tab');
  const idx    = nama === 'detail' ? 0 : 1;
  tabEls[idx].classList.add('aktif');
  document.getElementById(`${prefix}-detail`).style.display = nama === 'detail' ? 'block' : 'none';
  document.getElementById(`${prefix}-ulasan`).style.display = nama === 'ulasan' ? 'block' : 'none';
}

// ===================== KONTAK FORM =====================
function kirimPesan(e) {
  e.preventDefault();
  const ps = document.getElementById('pesan-sukses');
  ps.style.display = 'block';
  e.target.reset();
  setTimeout(() => ps.style.display = 'none', 3000);
}

// ===================== HELPERS =====================
function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function bukaModal(id) {
  document.getElementById(id).classList.add('aktif');
  document.body.style.overflow = 'hidden';
}

function tutupModal(id) {
  document.getElementById(id).classList.remove('aktif');
  document.body.style.overflow = '';
}

// Klik overlay luar untuk tutup modal
document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', function (e) {
    if (e.target === this) tutupModal(this.id);
  });
});

// ===================== INIT =====================
renderProduk();

// ===================== PROFIL =====================
let profilData = {
  nama: 'Dinda Putri',
  email: 'dindaputri@gmail.com',
  telp: '0812-3456-7890',
  lahir: '2002-05-12',
  gender: 'Perempuan',
  lokasi: 'Banten, Indonesia',
};

let halamanAktif = 'main'; // 'main' | 'profil'

function toggleProfilPage() {
  halamanAktif = halamanAktif === 'main' ? 'profil' : 'main';
  const profilPage  = document.getElementById('profil-page');
  const mainContent = document.getElementById('main-content');
  const navBtn      = document.getElementById('profil-nav-btn');

  if (halamanAktif === 'profil') {
    profilPage.classList.add('aktif');
    mainContent.style.display = 'none';
    navBtn.classList.add('aktif');
    updateProfilUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    profilPage.classList.remove('aktif');
    mainContent.style.display = '';
    navBtn.classList.remove('aktif');
  }
}

function scrollToSection(id) {
  if (halamanAktif === 'profil') {
    toggleProfilPage();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}

function updateProfilUI() {
  document.getElementById('profil-nama-text').textContent  = profilData.nama;
  document.getElementById('profil-email-text').textContent = profilData.email;
  document.getElementById('profil-telp-text').textContent  = profilData.telp;
  document.getElementById('profil-lokasi-text').textContent = profilData.lokasi;

  // format tanggal lahir
  if (profilData.lahir) {
    const d = new Date(profilData.lahir);
    const formatted = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('profil-lahir-text').textContent = formatted;
    document.getElementById('info-lahir').textContent = formatted;
  }

  document.getElementById('info-email').textContent  = profilData.email;
  document.getElementById('info-telp').textContent   = profilData.telp;
  document.getElementById('info-gender').textContent = profilData.gender;
}

function gantiMenuProfil(menu, el) {
  // sembunyikan semua panel
  document.querySelectorAll('[id^="menu-"]').forEach(m => m.style.display = 'none');
  // tampilkan yang dipilih
  document.getElementById('menu-' + menu).style.display = 'block';
  // update aktif sidebar
  document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('aktif'));
  if (el) el.classList.add('aktif');

  // render dynamic sections
  if (menu === 'riwayat-order') {
    renderRiwayatOrder();
  }
  if (menu === 'tracking-order') {
    kembaliKeTrackingList();
    renderTrackingOrderList();
  }
  if (menu === 'ulasan-saya') {
    renderUlasanSaya();
  }
}

function bukaEditProfil() {
  document.getElementById('edit-nama').value    = profilData.nama;
  document.getElementById('edit-email').value   = profilData.email;
  document.getElementById('edit-telp').value    = profilData.telp;
  document.getElementById('edit-lahir').value   = profilData.lahir;
  document.getElementById('edit-gender').value  = profilData.gender;
  document.getElementById('edit-lokasi').value  = profilData.lokasi;
  bukaModal('overlay-edit-profil');
}

function simpanProfil() {
  const nama = document.getElementById('edit-nama').value.trim();
  if (!nama) { alert('Nama tidak boleh kosong!'); return; }
  profilData.nama   = nama;
  profilData.email  = document.getElementById('edit-email').value.trim();
  profilData.telp   = document.getElementById('edit-telp').value.trim();
  profilData.lahir  = document.getElementById('edit-lahir').value;
  profilData.gender = document.getElementById('edit-gender').value;
  profilData.lokasi = document.getElementById('edit-lokasi').value.trim();
  updateProfilUI();
  tutupModal('overlay-edit-profil');
  alert('✅ Profil berhasil diperbarui!');
}

function bukaUbahPassword() {
  document.getElementById('pw-lama').value      = '';
  document.getElementById('pw-baru').value      = '';
  document.getElementById('pw-konfirmasi').value = '';
  bukaModal('overlay-ubah-password');
}

function simpanPassword() {
  const lama = document.getElementById('pw-lama').value;
  const baru = document.getElementById('pw-baru').value;
  const konfirmasi = document.getElementById('pw-konfirmasi').value;
  if (!lama || !baru || !konfirmasi) { alert('Semua field wajib diisi!'); return; }
  if (baru.length < 8) { alert('Password baru minimal 8 karakter!'); return; }
  if (baru !== konfirmasi) { alert('Konfirmasi password tidak cocok!'); return; }
  tutupModal('overlay-ubah-password');
  alert('✅ Password berhasil diubah!');
}

function keluarProfil() {
  if (confirm('Yakin ingin keluar dari akun?')) {
    toggleProfilPage();
    alert('Kamu telah keluar. Sampai jumpa! 👋');
  }
}

function lacakDariProfil() {
  // kept for backward compat but now handled by new tracking system
}

// ===================== DATA RIWAYAT ORDER =====================
const RIWAYAT_ORDERS = [
  {
    id: '#KLCER24050123',
    tanggal: '24 Mei 2025, 14:32',
    total: 'Rp 278.000',
    payment: 'Transfer Bank BCA',
    status: 'Selesai',
    produk: [
      { nama: 'Hoodie Oversize', varian: 'Hitam, XL', harga: 'Rp 159.000', qty: 1, emoji: '🧥' }
    ],
    resi: 'JNE1234567890',
    kurir: 'JNE Express',
    service: 'REG',
    steps: [
      { label: 'Pesanan Diterima', time: '24 Mei 2025, 14:32', icon: '📦', done: true, active: false },
      { label: 'Diproses',        time: '24 Mei 2025, 16:10', icon: '⚙️', done: true, active: false },
      { label: 'Dikirim',         time: '25 Mei 2025, 09:15', icon: '🚚', done: true, active: false },
      { label: 'Sampai',          time: 'Estimasi: 27 Mei 2025', icon: '✅', done: false, active: false },
    ]
  },
  {
    id: '#KLCER24042288',
    tanggal: '22 April 2025, 10:15',
    total: 'Rp 215.000',
    payment: 'COD (Bayar di Tempat)',
    status: 'Diproses',
    produk: [
      { nama: 'Kaos Polos Basic', varian: 'Putih, L', harga: 'Rp 75.000', qty: 1, emoji: '👕' }
    ],
    resi: null,
    kurir: '-',
    service: '-',
    steps: [
      { label: 'Pesanan Diterima', time: '22 Apr 2025, 10:15', icon: '📦', done: true, active: false },
      { label: 'Diproses',        time: '22 Apr 2025, 11:00', icon: '⚙️', done: false, active: true },
      { label: 'Dikirim',         time: 'Estimasi besok',     icon: '🚚', done: false, active: false },
      { label: 'Sampai',          time: '-',                  icon: '✅', done: false, active: false },
    ]
  },
  {
    id: '#KLCER24041056',
    tanggal: '10 April 2025, 16:45',
    total: 'Rp 325.000',
    payment: 'Transfer Bank Mandiri',
    status: 'Dikirim',
    produk: [
      { nama: 'Jaket Denim', varian: 'Biru Muda, M', harga: 'Rp 195.000', qty: 1, emoji: '🧥' },
      { nama: 'Celana Cargo', varian: 'Cream, 32',   harga: 'Rp 130.000', qty: 1, emoji: '👖' }
    ],
    resi: 'TIKI8876543210',
    kurir: 'TIKI',
    service: 'ONS',
    steps: [
      { label: 'Pesanan Diterima', time: '10 Apr 2025, 16:45', icon: '📦', done: true, active: false },
      { label: 'Diproses',        time: '10 Apr 2025, 18:00', icon: '⚙️', done: true, active: false },
      { label: 'Dikirim',         time: '11 Apr 2025, 08:30', icon: '🚚', done: false, active: true },
      { label: 'Sampai',          time: 'Estimasi: 12 Apr',   icon: '✅', done: false, active: false },
    ]
  }
];

const ULASAN_SAYA = [
  {
    produk: 'Dress Wanita',
    varian: 'Merah Marun, S',
    emoji: '👗',
    bintang: 5,
    teks: 'Bahannya adem dan jatuhnya bagus banget, cocok untuk acara formal!',
    tgl: '5 Jun 2025'
  },
  {
    produk: 'Kaos Oversize',
    varian: 'Hitam, M',
    emoji: '👕',
    bintang: 4,
    teks: 'Kualitas bagus, tapi pengiriman agak lama. Overall puas!',
    tgl: '20 Jun 2025'
  },
  {
    produk: 'Hoodie Unisex',
    varian: 'Abu-Abu, L',
    emoji: '🧥',
    bintang: 5,
    teks: 'Bahannya tebal dan hangat, pas banget untuk cuaca dingin. Highly recommend!',
    tgl: '2 Jun 2025'
  }
];

function renderRiwayatOrder(filter = 'semua') {
  const list = document.getElementById('ro-list');
  if (!list) return;
  const filtered = filter === 'semua'
    ? RIWAYAT_ORDERS
    : RIWAYAT_ORDERS.filter(o => o.status === filter);

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:#9ca3af">Tidak ada pesanan dengan status ini.</div>`;
    return;
  }

  list.innerHTML = filtered.map((o, idx) => {
    const badgeClass = { 'Selesai': 'ro-badge-selesai', 'Diproses': 'ro-badge-diproses', 'Dikirim': 'ro-badge-dikirim' }[o.status] || 'ro-badge-diproses';

    // buttons based on status
    let btns = `<button class="ro-btn-detail" onclick="bukaTD(${idx})">Lihat Detail</button>`;
    if (o.status === 'Selesai') {
      btns += `<button class="ro-btn-primary" onclick="beliLagiOrder(${idx})">Beli Lagi</button>`;
      if (!o.sudahUlasan) btns += `<button class="ro-btn-ulasan" onclick="bukaFormUlasanDariOrder(${idx})">✍️ Beri Ulasan</button>`;
      else btns += `<span class="ro-sudah-ulasan">✅ Sudah Diulas</span>`;
    }
    if (o.status === 'Diproses') btns += `<button class="ro-btn-danger" onclick="batalOrder(${idx})">Batalkan Pesanan</button>`;
    if (o.status === 'Dikirim') btns += `<button class="ro-btn-primary" onclick="lacakOrder(${idx})">Lacak Pengiriman</button>`;

    return `
    <div class="ro-card">
      <div class="ro-card-header">
        <div>
          <div class="ro-col-label">No. Order</div>
          <div class="ro-order-id">${o.id}</div>
        </div>
        <div>
          <div class="ro-col-label">Tanggal</div>
          <div class="ro-col-val" style="font-weight:500;color:#374151">${o.tanggal}</div>
        </div>
        <div>
          <div class="ro-col-label">Total Pesanan</div>
          <div class="ro-col-val" style="color:#ec4899">${o.total}</div>
        </div>
        <div>
          <div class="ro-col-label">Metode Pembayaran</div>
          <div class="ro-col-val" style="font-weight:500;color:#374151;font-size:.8rem">${o.payment}</div>
        </div>
        <div>
          <div class="ro-col-label">Status</div>
          <span class="ro-badge ${badgeClass}">${o.status}</span>
        </div>
      </div>
      <div class="ro-card-body">
        <div class="ro-products">
          ${o.produk.map(p => `
          <div class="ro-product-row">
            <div class="ro-product-img">${p.emoji}</div>
            <div>
              <div class="ro-product-name">${p.nama}</div>
              <div class="ro-product-meta">${p.varian}</div>
              <div class="ro-product-price">${p.harga} <span style="font-weight:400;color:#9ca3af">x ${p.qty}</span></div>
            </div>
          </div>`).join('')}
        </div>
        <div class="ro-card-actions">${btns}</div>
      </div>
    </div>`;
  }).join('');
}

function filterRiwayat(val) {
  renderRiwayatOrder(val);
}

function bukaTD(idx) {
  const order = RIWAYAT_ORDERS[idx];
  document.getElementById('tracking-list-view').style.display = 'none';
  document.getElementById('tracking-detail-view').style.display = 'block';

  // set info
  document.getElementById('td-order-id').textContent = order.id;
  document.getElementById('td-tanggal').textContent  = order.tanggal;
  document.getElementById('td-payment').textContent  = order.payment;
  document.getElementById('td-resi').textContent     = order.resi || '-';
  document.getElementById('td-kurir').textContent    = order.kurir;
  document.getElementById('td-service').textContent  = order.service;

  // horizontal stepper
  const stepper = document.getElementById('td-stepper');
  stepper.innerHTML = order.steps.map(s => {
    const cls = s.done ? 'done' : s.active ? 'active' : '';
    return `
    <div class="track-h-step ${cls}">
      <div class="track-h-dot-wrap">
        <div class="track-h-dot">${s.icon}</div>
      </div>
      <div class="track-h-step-label">${s.label}</div>
      <div class="track-h-step-time">${s.time}</div>
    </div>`;
  }).join('');

  // also switch sidebar menu to tracking
  gantiMenuProfil('tracking-order', null);
  // then just show the detail view
  document.getElementById('tracking-list-view').style.display = 'none';
  document.getElementById('tracking-detail-view').style.display = 'block';
}

function lacakOrder(idx) {
  bukaTD(idx);
}

function batalOrder(idx) {
  if (confirm('Yakin ingin membatalkan pesanan ini?')) {
    RIWAYAT_ORDERS[idx].status = 'Dibatalkan';
    renderRiwayatOrder();
    alert('Pesanan telah dibatalkan.');
  }
}

function beliLagiOrder(idx) {
  alert('Produk ditambahkan ke keranjang!');
}

function lihatDetailPesananDariTracking() {
  alert('Halaman detail pesanan.');
}

function kembaliKeTrackingList() {
  document.getElementById('tracking-list-view').style.display = 'block';
  document.getElementById('tracking-detail-view').style.display = 'none';
}

function renderTrackingOrderList() {
  const list = document.getElementById('tracking-order-list');
  if (!list) return;
  list.innerHTML = RIWAYAT_ORDERS.map((o, idx) => {
    const badgeClass = { 'Selesai': 'ro-badge-selesai', 'Diproses': 'ro-badge-diproses', 'Dikirim': 'ro-badge-dikirim' }[o.status] || 'ro-badge-diproses';
    return `
    <div class="ro-card">
      <div class="ro-card-header">
        <div>
          <div class="ro-col-label">No. Order</div>
          <div class="ro-order-id">${o.id}</div>
        </div>
        <div>
          <div class="ro-col-label">Tanggal</div>
          <div class="ro-col-val" style="font-weight:500;color:#374151">${o.tanggal}</div>
        </div>
        <div>
          <div class="ro-col-label">Total Pesanan</div>
          <div class="ro-col-val" style="color:#ec4899">${o.total}</div>
        </div>
        <div>
          <div class="ro-col-label">Kurir</div>
          <div class="ro-col-val" style="font-weight:500;color:#374151">${o.kurir}</div>
        </div>
        <div>
          <div class="ro-col-label">Status</div>
          <span class="ro-badge ${badgeClass}">${o.status}</span>
        </div>
      </div>
      <div class="ro-card-body">
        <div class="ro-products">
          ${o.produk.map(p => `
          <div class="ro-product-row">
            <div class="ro-product-img">${p.emoji}</div>
            <div>
              <div class="ro-product-name">${p.nama}</div>
              <div class="ro-product-meta">${p.varian}</div>
              <div class="ro-product-price">${p.harga}</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="ro-card-actions">
          <button class="ro-btn-primary" onclick="bukaTD(${idx})">Lacak Pengiriman</button>
        </div>
      </div>
    </div>`;
  }).join('');
}



// State form ulasan inline
let ulasanFormState = {
  orderIdx: null,
  produkIdx: 0,
  bintang: 5,
};

function bukaFormUlasanDariOrder(orderIdx) {
  // Pindah ke menu Ulasan Saya
  gantiMenuProfil('ulasan-saya', document.querySelectorAll('.sidebar-menu li')[2]);
  // Simpan state
  ulasanFormState.orderIdx = orderIdx;
  ulasanFormState.produkIdx = 0;
  ulasanFormState.bintang = 5;
  // Render ulasan + scroll ke form
  renderUlasanSaya(true);
  setTimeout(() => {
    const form = document.getElementById('ulasan-inline-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function renderUlasanSaya(bukaForm = false) {
  const el = document.getElementById('ulasan-saya-list');
  if (!el) return;

  // Daftar ulasan yang sudah ada
  const ulasanHTML = ULASAN_SAYA.length > 0 ? ULASAN_SAYA.map(u => {
    const stars = Array.from({length:5}, (_,i) =>
      `<span class="ulasan-star ${i < u.bintang ? '' : 'empty'}">★</span>`
    ).join('');
    return `
    <div class="ulasan-card">
      <div class="ulasan-card-top">
        <div class="ulasan-product-img">${u.emoji}</div>
        <div class="ulasan-product-info">
          <div class="ulasan-product-name">${u.produk}</div>
          <div class="ulasan-product-variant">${u.varian}</div>
          <div class="ulasan-stars">${stars}</div>
        </div>
        <div class="ulasan-tgl">${u.tgl}</div>
      </div>
      <div class="ulasan-teks">${u.teks}</div>
    </div>`;
  }).join('') : `<div style="text-align:center;padding:32px;color:#9ca3af;font-size:.9rem">Belum ada ulasan. Beri ulasan dari Riwayat Order!</div>`;

  // Form inline (muncul jika bukaForm true atau sudah ada orderIdx)
  const showForm = bukaForm || ulasanFormState.orderIdx !== null;
  let formHTML = '';

  if (showForm && ulasanFormState.orderIdx !== null) {
    const order = RIWAYAT_ORDERS[ulasanFormState.orderIdx];
    const produkOptions = order.produk.map((p, i) =>
      `<option value="${i}" ${i === ulasanFormState.produkIdx ? 'selected' : ''}>${p.emoji} ${p.nama} (${p.varian})</option>`
    ).join('');

    formHTML = `
    <div class="ulasan-inline-form" id="ulasan-inline-form">
      <div class="ulasan-form-header">
        <div class="ulasan-form-title">✍️ Tulis Ulasan</div>
        <button class="ulasan-form-close" onclick="tutupFormUlasan()">✕</button>
      </div>
      <div class="ulasan-form-order-info">
        Ulasan untuk pesanan <strong>${order.id}</strong>
      </div>

      <div class="ulasan-form-group">
        <label class="ulasan-form-label">Pilih Produk</label>
        <select class="ulasan-form-select" id="uf-produk" onchange="ulasanFormState.produkIdx=this.value">
          ${produkOptions}
        </select>
      </div>

      <div class="ulasan-form-group">
        <label class="ulasan-form-label">Rating</label>
        <div class="ulasan-form-stars" id="uf-stars">
          ${Array.from({length:5}, (_,i) =>
            `<span class="uf-star ${i < ulasanFormState.bintang ? 'aktif' : ''}"
              onmouseover="hoverBintang(${i+1})"
              onmouseout="resetHoverBintang()"
              onclick="setUlasanBintang(${i+1})">★</span>`
          ).join('')}
        </div>
        <div class="ulasan-rating-label" id="uf-rating-label">${getRatingLabel(ulasanFormState.bintang)}</div>
      </div>

      <div class="ulasan-form-group">
        <label class="ulasan-form-label">Ulasan Kamu</label>
        <textarea class="ulasan-form-textarea" id="uf-teks"
          placeholder="Ceritakan pengalamanmu dengan produk ini... (min. 10 karakter)" rows="4"></textarea>
      </div>

      <div class="ulasan-form-actions">
        <button class="ro-btn-detail" onclick="tutupFormUlasan()">Batal</button>
        <button class="ro-btn-primary" onclick="kirimUlasanBaru()">Kirim Ulasan</button>
      </div>
    </div>`;
  }

  el.innerHTML = formHTML + ulasanHTML;
}

function getRatingLabel(n) {
  return ['', 'Sangat Buruk 😞', 'Buruk 😕', 'Cukup 😐', 'Bagus 😊', 'Sangat Bagus 🤩'][n] || '';
}

function hoverBintang(n) {
  document.querySelectorAll('.uf-star').forEach((s, i) => {
    s.classList.toggle('hover', i < n);
  });
}

function resetHoverBintang() {
  document.querySelectorAll('.uf-star').forEach(s => s.classList.remove('hover'));
}

function setUlasanBintang(n) {
  ulasanFormState.bintang = n;
  document.querySelectorAll('.uf-star').forEach((s, i) => {
    s.classList.toggle('aktif', i < n);
  });
  const lbl = document.getElementById('uf-rating-label');
  if (lbl) lbl.textContent = getRatingLabel(n);
}

function tutupFormUlasan() {
  ulasanFormState.orderIdx = null;
  renderUlasanSaya(false);
}

function kirimUlasanBaru() {
  const teks = document.getElementById('uf-teks')?.value.trim();
  if (!teks || teks.length < 10) {
    alert('Ulasan minimal 10 karakter!');
    return;
  }
  const order  = RIWAYAT_ORDERS[ulasanFormState.orderIdx];
  const produk = order.produk[ulasanFormState.produkIdx];
  const today  = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  ULASAN_SAYA.unshift({
    produk: produk.nama,
    varian: produk.varian,
    emoji:  produk.emoji,
    bintang: ulasanFormState.bintang,
    teks,
    tgl: today
  });

  // Mark order as reviewed
  order.sudahUlasan = true;
  ulasanFormState.orderIdx = null;
  renderUlasanSaya(false);

  // Tampilkan notif sukses sesaat
  const el = document.getElementById('ulasan-saya-list');
  const notif = document.createElement('div');
  notif.className = 'ulasan-notif-sukses';
  notif.textContent = '✅ Ulasan berhasil dikirim, terima kasih!';
  el.prepend(notif);
  setTimeout(() => notif.remove(), 3000);
}

function salinResi() {
  const resi = document.getElementById('td-resi').textContent;
  navigator.clipboard.writeText(resi).catch(()=>{});
  const btn = document.querySelector('.track-copy-btn');
  const orig = btn.textContent;
  btn.textContent = '✓ Tersalin';
  setTimeout(() => btn.textContent = orig, 1500);
}