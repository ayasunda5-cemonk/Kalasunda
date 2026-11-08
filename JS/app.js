const pancawaraList = ['Manis', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const sadwaraList = ['Tungtung', 'Aryang', 'Uruking', 'Paningron', 'Uwas', 'Mawur'];
const wukuList = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg', 'Warigalit', 'Warigagung',
  'Julangwangi', 'Sungsang', 'Galungan', 'Kuningan', 'Langkir', 'Mandasiya', 'Julungwujut',
  'Pahang', 'Kuruwelut', 'Marakeh', 'Tambir', 'Medangkungan', 'Maktal', 'Wuye',
  'Manahil', 'Prangbakat', 'Bala', 'Wugu', 'Wayang', 'Kulawu', 'Dukut', 'Watugunung'
];

// Daptar Nami Sasih Sunda (Sistem Caka / Tradisional)
const sundaMonthNames = [
  'Kasa', 'Karo', 'Katiga', 'Kapat', 'Kalima', 'Kenem', 
  'Kapitu', 'Kawalungan', 'Kasanga', 'Kasa Dasa', 'Jesta', 'Sada'
];

let currentDate = new Date();

// Elemen DOM
const sundaMonthDisplay = document.getElementById('sunda-month-display');
const monthYearDisplay = document.getElementById('month-year-display');
const calendarDays = document.getElementById('calendar-days');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function getPancawara(date) {
  const baseDate = new Date(1970, 0, 1);
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const index = ((diffDays + 4) % 5 + 5) % 5;
  return pancawaraList[index];
}

function getSadwara(date) {
  const baseDate = new Date(1970, 0, 1);
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const index = ((diffDays % 6) + 6) % 6;
  return sadwaraList[index];
}

function getWuku(date) {
  const baseDate = new Date(1970, 0, 1);
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const wukuIndex = Math.floor((((diffDays + 12) % 210 + 210) % 210) / 7);
  return wukuList[wukuIndex];
}

// Menghitung Naktu (Nepton) sederhana dari Pancawara & Hari Masehi/Sunda
function getNepton(date) {
  const p = getPancawara(date);
  const day = date.getDay(); // 0: Min, 1: Sen, dst
  
  // Nilai naktu tradisional
  const dayValues = {0: 5, 1: 4, 2: 3, 3: 7, 4: 8, 5: 6, 6: 9};
  const pancawaraValues = {'Manis': 5, 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8};
  
  return (dayValues[day] || 0) + (pancawaraValues[p] || 0);
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const masehiMonthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Estimasi sederhana Tahun Caka (Tahun Masehi + 78)
  const cakaYear = year + 78;
  const sundaMonth = sundaMonthNames[month % 12];

  // Set Header: Bulan Sunda jadi Utama, Masehi jadi Subtitle
  if (sundaMonthDisplay) sundaMonthDisplay.textContent = `${sundaMonth} ${cakaYear} Caka`;
  if (monthYearDisplay) monthYearDisplay.textContent = `${masehiMonthNames[month]} ${year}`;
  
  if (calendarDays) calendarDays.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day-cell', 'empty');
    calendarDays.appendChild(emptyCell);
  }

  const today = new Date();

  for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(year, month, day);
    const pancawara = getPancawara(dateObj);

    const cell = document.createElement('div');
    cell.classList.add('day-cell');
    
    // Cek hari ini
    const isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
    if (isToday) {
      cell.classList.add('today');
      updateHeroAndDetails(dateObj);
    }

    // Tampilan di dalam kotak tanggal: Angka Masehi kecil di atas, Pasaran Sunda dominan di bawah
    cell.innerHTML = `
      <span class="masehi-num">${day}</span>
      <span class="sunda-sub">${pancawara}</span>
    `;

    cell.addEventListener('click', () => {
      document.querySelectorAll('.day-cell').forEach(c => c.classList.remove('active'));
      cell.classList.add('active');
      updateHeroAndDetails(dateObj);
    });

    calendarDays.appendChild(cell);
  }

  // Set default ke tanggal 1 atau hari ini jika di bulan yang sama
  updateHeroAndDetails(today.getMonth() === month && today.getFullYear() === year ? today : new Date(year, month, 1));
}

function updateHeroAndDetails(date) {
  const pancawara = getPancawara(date);
  const wuku = getWuku(date);
  const sadwara = getSadwara(date);
  const nepton = getNepton(date);

  // Update Hero Box di atas kalender
  const elPancawara = document.getElementById('current-pancawara');
  const elWuku = document.getElementById('current-wuku');
  const elWindu = document.getElementById('current-windu');
  
  if (elPancawara) elPancawara.textContent = pancawara;
  if (elWuku) elWuku.textContent = wuku;
  if (elWindu) elWindu.textContent = "Kuntara"; // Contoh siklus Windu Sunda

  // Update Detail Card di bawah
  const masehiMonthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const dateStr = `${date.getDate()} ${masehiMonthNames[date.getMonth()]} ${date.getFullYear()}`;
  
  const elDetailMasehi = document.getElementById('detail-masehi');
  const elDetailPancawara = document.getElementById('detail-pancawara');
  const elDetailWuku = document.getElementById('detail-wuku');
  const elDetailSadwara = document.getElementById('detail-sadwara');
  const elDetailNepton = document.getElementById('detail-nepton');
  const elDetailSundaDate = document.getElementById('detail-sunda-date');

  if (elDetailMasehi) elDetailMasehi.textContent = dateStr;
  if (elDetailPancawara) elDetailPancawara.textContent = pancawara;
  if (elDetailWuku) elDetailWuku.textContent = wuku;
  if (elDetailSadwara) elDetailSadwara.textContent = sadwara;
  if (elDetailNepton) elDetailNepton.textContent = nepton;
  if (elDetailSundaDate) elDetailSundaDate.textContent = `Wuku ${wuku}`;
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
}

// Inisialisasi awal
renderCalendar();
