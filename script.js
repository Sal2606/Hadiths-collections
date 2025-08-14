const container = document.getElementById('hadith-container');
const loadBtn = document.getElementById('loadBtn');
const collectionSelect = document.getElementById('collection');
const languageSelect = document.getElementById('language');
const searchInput = document.getElementById('search');

let currentHadiths = [];

loadBtn.addEventListener('click', loadHadiths);

function loadHadiths() {
  const collection = collectionSelect.value;
  const language = languageSelect.value;
  let jsonFile = `data/hadiths_${collection}.json`;

  fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
      currentHadiths = data.filter(h => h.language === language);
      displayHadiths(currentHadiths);
    })
    .catch(err => alert('Erreur : ' + err.message));
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = currentHadiths.filter(h => h.text.toLowerCase().includes(term));
  displayHadiths(filtered);
});

function displayHadiths(hadiths) {
  container.innerHTML = '';
  hadiths.forEach(h => {
    const div = document.createElement('div');
    div.classList.add('hadith');
    div.innerHTML = `<div>${h.text}</div>
                     <div class="source">${h.source}</div>
                     <div class="explanation">${h.explanation}</div>`;
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
