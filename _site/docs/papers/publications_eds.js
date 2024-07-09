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
    type: "article",
    year: 2024,
    title: "It ain't what you do (it's the way that you do it): modulating the host response in sepsis.",
    authors: "Millar JE, Docherty AB.",
    journal: "Anaesthesia",
    volume: "Online ahead of print",
    doi: "10.1111/anae.16263",
  },
  {
    type: "article",
    year: 2023,
    title: "Driving pressure - what's the harm?",
    authors: "Millar JE, McAuley DF, Marini JJ.",
    journal: "Crit. Care Med.",
    volume: "51(7): 967-970",
    doi: "10.1097/CCM.0000000000005874",
  },
  {
    type: "article",
    year: 2020,
    title: "Clinical Evidence Does Not Support Corticosteroid Treatment for 2019-nCoV Lung Injury.",
    authors: "Russell CD, Millar JE, Baillie JK.",
    journal: "Lancet",
    volume: "395(10223): 473--475",
    doi: "10.1016/S0140-6736(20)30317-2",
  },
  {
    type: "article",
    year: 2020,
    title: "Apples and oranges: international comparisons of COVID-19 observational studies in ICUs.",
    authors: "Millar JE, Busse R, Fraser JF, et. al.",
    journal: "Lancet Respir. Med.",
    volume: "8(10):952--953",
    doi: "10.1016/S2213-2600(20)30368-4",
  },
  {
    type: "article",
    year: 2015,
    title: "Mesenchymal stromal cells and the acute respiratory distress syndrome (ARDS): challenges for clinical application.",
    authors: "Millar JE, Fraser JF, McAuley DF.",
    journal: "Thorax",
    volume: "70(7):611-2",
    doi: "10.1136/thoraxjnl-2015-207121",
  },
  {
    type: "article",
    year: 2016,
    title: "Need for a systematic audit of trauma care in Northern Ireland.",
    authors: "Millar JE, Lutton S, McLaughlin R.",
    journal: "BMJ",
    volume: "353:i2025",
    doi: "10.1136/bmj.i2025"
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