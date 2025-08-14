const container = document.getElementById('hadith-container');
const loadBtn = document.getElementById('loadBtn');
const collectionSelect = document.getElementById('collection');
const languageSelect = document.getElementById('language');
const searchInput = document.getElementById('search');

// Liste de tous les fichiers JSON
const dataFiles = [
  'data1/bukhari.json',
  'data1/abudawud.json',
  'data1/ahmed.json',
  'data1/darimi.json',
  'data2/tirmidhi.json',
  'data2/ibnmajah.json',
  'data2/malik.json',
  'data2/muslim.json',
  'data2/nasai.json'
];

let allHadiths = [];
let currentHadiths = [];

// Fonction pour charger tous les fichiers JSON
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

// Fonction pour filtrer selon collection et langue
function filterAndDisplay() {
  const collection = collectionSelect.value.toLowerCase();
  const language = languageSelect.value;
  const searchTerm = searchInput.value.toLowerCase();

  currentHadiths = allHadiths.filter(h => 
    h.collection.toLowerCase() === collection &&
    h.language === language &&
    h.text.toLowerCase().includes(searchTerm)
  );

  displayHadiths(currentHadiths);
}

// Fonction pour afficher les hadiths avec animation
function displayHadiths(hadiths) {
  container.innerHTML = '';
  hadiths.forEach(h => {
    const div = document.createElement('div');
    div.classList.add('hadith');
    div.innerHTML = `
      <div>${h.text}</div>
      <div class="source">${h.source}</div>
      <div class="explanation">${h.explanation}</div>
    `;
    container.appendChild(div);
    anime({
      targets: div,
      opacity: [0, 1],
      translateY: [20,0],
      duration: 600,
      easing: 'easeOutQuad'
    });
  });
}

// Event listeners
loadBtn.addEventListener('click', filterAndDisplay);
searchInput.addEventListener('input', filterAndDisplay);

// Charger les hadiths dès le départ
loadAllHadiths();
