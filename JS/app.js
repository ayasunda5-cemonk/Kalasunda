const pancawaraList = ['Manis', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const wukuList = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg', 'Warigalit', 'Warigagung',
  'Julangwangi', 'Sungsang', 'Galungan', 'Kuningan', 'Langkir', 'Mandasiya', 'Julungwujut',
  'Pahang', 'Kuruwelut', 'Marakeh', 'Tambir', 'Medangkungan', 'Maktal', 'Wuye',
  'Manahil', 'Prangbakat', 'Bala', 'Wugu', 'Wayang', 'Kulawu', 'Dukut', 'Watugunung'
];

let currentDate = new Date();

const monthYearDisplay = document.getElementById('month-year-display');
const calendarDays = document.getElementById('calendar-days');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function getPancawara(date) {
  // Epoch reference point (1 Jan 1970 = Kliwon)
  const baseDate = new Date(1970, 0, 1);
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const index = ((diffDays + 4) % 5 + 5) % 5;
  return pancawaraList[index];
}

function getWuku(date) {
  const baseDate = new Date(1970, 0, 1);
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  // Epoch 1 Jan 1970 was Thursday (Index 4 Wuku Langkir)
  const wukuIndex = Math.floor((((diffDays + 12) % 210 + 210) % 210) / 7);
  return wukuList[wukuIndex];
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
  calendarDays.innerHTML = '';

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
    
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add('today');
      document.getElementById('current-pancawara').textContent = pancawara;
      updateDetails(dateObj);
    }

    cell.innerHTML = `
      <span>${day}</span>
      <span class="sunda-sub">${pancawara}</span>
    `;

    cell.addEventListener('click', () => {
      document.querySelectorAll('.day-cell').forEach(c => c.classList.remove('active'));
      cell.classList.add('active');
      updateDetails(dateObj);
    });

    calendarDays.appendChild(cell);
  }
}

function updateDetails(date) {
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const dateStr = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  
  document.getElementById('detail-masehi').textContent = dateStr;
  document.getElementById('detail-pancawara').textContent = getPancawara(date);
  document.getElementById('detail-wuku').textContent = getWuku(date);
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
