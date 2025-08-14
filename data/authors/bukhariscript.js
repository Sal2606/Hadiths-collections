function loadAuthor(collection) {
  fetch(`authors/${collection}.json`)
    .then(res => res.json())
    .then(data => {
      // Bio
      document.getElementById('author-name').textContent = data.author.name;
      document.getElementById('author-bio').textContent = data.author.bio;

      // Timeline
      const timelineContainer = document.getElementById('timeline-container');
      timelineContainer.innerHTML = '';
      data.author.timeline.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('timeline-item');
        div.textContent = `${item.year} - ${item.event}`;
        timelineContainer.appendChild(div);
      });

      // Affichage de quelques hadiths
      currentHadiths = data.sample_hadiths.filter(h => h.language === document.getElementById('language').value);
      displayHadiths(currentHadiths);
    })
    .catch(err => alert('Erreur : ' + err.message));
}

// Adapter le bouton Afficher pour charger auteur + hadiths
loadBtn.addEventListener('click', () => {
  const collection = collectionSelect.value;
  loadAuthor(collection);
});
