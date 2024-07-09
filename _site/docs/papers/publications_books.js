document.addEventListener('DOMContentLoaded', function() {
    const years = Array.from({length: 11}, (_, i) => 2024 - i);
    const yearRibbon = document.querySelector('.year-ribbon');
    const publicationsList = document.querySelector('.publications-list');
    const editorialsList = document.getElementById('editorials-content');
    const lettersList = document.getElementById('letters-content');
    const chaptersList = document.getElementById('chapters-content');

    // Create year buttons
    years.forEach(year => {
        const button = document.createElement('button');
        button.textContent = year;
        button.classList.add('year-button');
        button.addEventListener('click', () => filterPublications(year));
        yearRibbon.appendChild(button);
    });

   const publications = [
  {
    type: "chapter",
    year: 2022,
    title: "The unholy blood: biomaterial interaction in extracorporeal circulation",
    authors: "Hartley EL, Millar JE, Fraser JF",
    book: "Extracorporeal Membrane Oxygenation: An interdisciplinary problem-based learning approach",
    publisher: "Oxford University Press",
    doi: "10.1093/med/9780197521304.003.0012"
  },
  {
    type: "chapter",
    year: 2017,
    title: "Past, Present, and Future",
    authors: "Millar JE, Gregory S, Stevens M, Fraser JF, Bartlett B",
    book: "Mechanical Circulatory and Respiratory Support",
    publisher: "Academic Press (Elsevier)",
    doi: "10.1016/B978-0-12-810491-0.00025-4"
  }
  ];

     // Create publication items
    function createPublicationItem(pub) {
        const item = document.createElement('div');
        item.classList.add('publication-item');
        item.dataset.year = pub.year;

        let html = `<strong>${pub.title}</strong><br>`;
        html += `${pub.authors}<br>`;

        if (pub.type === 'chapter') {
            html += `In: ${pub.book}<br>`;
            html += `${pub.publisher}, ${pub.year}<br>`;
        } else {
            html += `<em>${pub.journal}</em>`;
            if (pub.volume) html += `, ${pub.volume}`;
            html += `, ${pub.year}<br>`;
        }

        if (pub.doi) {
            html += `<a href="https://doi.org/${pub.doi}" target="_blank">https://doi.org/${pub.doi}</a><br>`;
        }

        if (pub.pdf) {
            html += `<a href="${pub.pdf}" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>`;
        }

        item.innerHTML = html;
        return item;
    }

    // Populate publications
    publications.forEach(pub => {
        const item = createPublicationItem(pub);
        switch(pub.type) {
            case 'article':
                publicationsList.appendChild(item);
                break;
            case 'editorial':
                editorialsList.appendChild(item);
                break;
            case 'letter':
                lettersList.appendChild(item);
                break;
            case 'chapter':
                chaptersList.appendChild(item);
                break;
        }
    });

    // Filter publications by year (for articles only)
    function filterPublications(year) {
        document.querySelectorAll('.year-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.year-button:nth-child(${years.indexOf(year) + 1})`).classList.add('active');

        document.querySelectorAll('.publications-list .publication-item').forEach(item => {
            if (item.dataset.year == year) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Initialize with the most recent year for articles
    filterPublications(years[0]);
});