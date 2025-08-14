const container = document.getElementById('hadith-container');
const collectionSelect = document.getElementById('collection');
const languageSelect = document.getElementById('language');
const searchInput = document.getElementById('search');
const loadBtn = document.getElementById('loadBtn');

const dataFiles = [
  'data/bukhari.json',
  'data/muslim.json',
  'data/tirmidhi.json'
];

let allHadiths = [];

async function loadAllHadiths() {
  allHadiths = [];
  for (let file of dataFiles) {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Impossible de charger ${file}`);
      const data = await res.json();
      allHadiths = allHadiths.concat(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  filterAndDisplay();
}

function filterAndDisplay() {
  const collection = collectionSelect.value.toLowerCase();
  const language = languageSelect.value;
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = allHadiths.filter(h => 
    h.collection.toLowerCase() === collection &&
    h.language === language &&
    h.text.toLowerCase().includes(searchTerm)
  );

  container.innerHTML = '';
  filtered.forEach(h => {
    const div = document.createElement('div');
    div.classList.add('hadith');
    div.innerHTML = `
      <div class="text">${h.text}</div>
      <div class="source">${h.source}</div>
      <div class="explanation">${h.explanation}</div>
    `;
    container.appendChild(div);
  });
}

// Événements
loadBtn.addEventListener('click', filterAndDisplay);
searchInput.addEventListener('input', filterAndDisplay);

// Chargement initial
loadAllHadiths();
