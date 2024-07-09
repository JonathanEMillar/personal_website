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
    title: "The genomic landscape of Acute Respiratory Distress Syndrome: a meta-analysis by information content of genome-wide studies of the host response.",
    authors: "Millar JE, Clohisey-Hendry S, McMannus M, et. al.",
    journal: "medRxiv",
    doi: "13.234301089",
  },
  {
    type: "article",
    year: 2023,
    title: "Evaluation of pragmatic oxygenation measurement as a proxy for Covid-19 severity.",
    authors: "Swets MC, Kerr S, Scott-Brown J, ..., Millar JE, ..., Baillie JK.",
    journal: "Nat. Comms.",
    volume: "14:7374",
    doi: "10.1038/s41467-023-42205-6",
  },
  {
    type: "article",
    year: 2023,
    title: "The effects of nitric oxide on coagulation and inflammation in ex-vivo models of extracorporeal membrane oxygenation and cardiopulmonary bypass.",
    authors: "Malfertheiner MV, Garrett A, Passmore M, ..., Millar JE, ..., Fraser JF.",
    journal: "Artif. Organs",
    volume: "47(10):1581-1591",
    doi: "10.1111/aor.14608",
  },
  {
    type: "article",
    year: 2023,
    title: "GWAS and meta-analyses identifies 49 genetic variants underlying critical COVID-19.",
    authors: "Pairo-Castineira E, Rawlik K, Bretherick AD, ..., Millar JE, ..., Baillie JK.",
    journal: "Nature",
    volume: "617(7962):764-768",
    doi: "10.1038/s41586-023-06034-3",
  },
  {
    type: "article",
    year: 2023,
    title: "Donor heart ischemic time can be extended to 8 hours using hypothermic machine perfusion in sheep.",
    authors: "See Hoe LE, Li Bassi G, Wildi K, ..., Millar JE, ..., Fraser JF.",
    journal: "J. Heart Lung Transplant.",
    volume: "S1053-2498(23)01819-3",
    doi: "10.1016/j.healun.2023.03.020",
  },
  {
    type: "article",
    year: 2022,
    title: "Extracorporeal carbon dioxide removal in acute hypoxaemic respiratory failure: a systematic review, Bayesian meta-analysis, and trial sequential analysis.",
    authors: "Millar JE, Boyle AJ, Drake TD, et. al.",
    journal: "Eur. Respir. Rev.",
    volume: "31:220030",
    doi: "10.1183/16000617.0030-2022",
  },
  {
    type: "article",
    year: 2022,
    title: "Validation of mRNA markers expressed in human ARDS subgroups in an ovine model of ARDS phenotypes.",
    authors: "Wildi K, Hyslop K, Millar JE, et. al.",
    journal: "Front. Med.",
    volume: "9:961336",
    doi: "10.3389/fmed.2022.961336",
  },
  {
    type: "article",
    year: 2022,
    title: "Distinct clinical symptom patterns in patients hospitalised with COVID-19 in an analysis of 59,011 patients in the ISARIC-4C study.",
    authors: "Millar JE, Neyton L, Seth S, et. al.",
    journal: "Sci. Rep.",
    volume: "12, 6843",
    doi: "10.1038/s41598-022-08032-3",
  },
  {
    type: "article",
    year: 2022,
    title: "Whole genome sequencing reveals host factors underlying critical COVID-19.",
    authors: "Kousathanas A, Pairo-Castineira E, Rawlik K, ..., Millar JE, ..., Baillie JK.",
    journal: "Nature",
    volume: "607(7917):97-103",
    doi: "10.1038/s41586-022-04576-6",
  },
  {
    type: "article",
    year: 2022,
    title: "Clinical characteristics, risk factors and outcomes in patients with severe COVID-19 registered in the ISARIC WHO clinical characterisation protocol: a prospective, multinational, multicentre, observational study.",
    authors: "Reyes LF, Murthy S, Garcia-Gallo E, ..., Millar JE, ..., Olliaro PL.",
    journal: "Eur. Respir. J. Open Res.",
    volume: "8(1):00552-2021",
    doi: "10.1183/23120541.00552-2021",
  },
  {
    type: "article",
    year: 2022,
    title: "SARS-CoV-2 environmental contamination from hospitalised patients with COVID-19 receiving aerosol-generating procedures.",
    authors: "Winslow RL, Zhou J, Windle EF, ..., Millar JE, ...Green CA.",
    journal: "Thorax",
    volume: "77(3):259-267",
    doi: "10.1136/thoraxjnl-2021-218035",
  },
  {
    type: "article",
    year: 2021,
    title: "An appraisal of respiratory system compliance in mechanically ventilated COVID-19 patients.",
    authors: "Li Bassi G, Suen JY, Dalton HJ, ..., Millar JE, ..., Fraser JF.",
    journal: "Crit. Care",
    volume: "25: 199",
    doi: "10.1186/s13054-021-03518-4",
  },
  {
    type: "article",
    year: 2021,
    title: "Effect of lower tidal volume ventilation facilitated by extracorporeal carbon dioxide removal vs standard care ventilation on 90-day mortality in patients with acute hypoxemic respiratory failure: the REST randomized trial.",
    authors: "McNamee JJ, Gillies MA, Barrett NA, ..., Millar JE, ..., McAuley DF.",
    journal: "JAMA",
    volume: "326(11):1013-1023",
    doi: "10.1001/jama.2021.13374"
  },
  {
    type: "article",
    year: 2021,
    title: "Histological evidence of pulmonary microthrombosis and vasculitis in life-threatening respiratory virus disease.",
    authors: "Dolby HW, Potey P, Wilder-Smith AB, ..., Millar JE, ..., Russell CD.",
    journal: "Open Forum Inf. Dis.",
    volume: "8(2):ofaa640",
    doi: "10.1093/ofid/ofaa640",
  },
  {
    type: "article",
    year: 2021,
    title: "Current understanding of leukocyte phenotypic and functional modulation during extracorporeal membrane oxygenation: a narrative review.",
    authors: "Ki KK, Millar JE, Langguth D, et. al.",
    journal: "Front. Immunol.",
    volume: "11:600684",
    doi: "10.3389/fimmu.2020.600684",
  },
  {
    type: "article",
    year: 2021,
    title: "Prophylactic postoperative high flow nasal oxygen versus conventional therapy in obese patients undergoing bariatric surgery (OXYBAR): a pilot randomised controlled trial.",
    authors: "Fulton R, Millar JE, Merza M, et. al.",
    journal: "Obes. Surg.",
    volume: "31(11):47994807",
    doi: "10.1007/s11695-021-05644-y"
  },
  {
    type: "article",
    year: 2021,
    title: "Characterizing preclinical sub-phenotypic models of acute respiratory distress syndrome: an experimental ovine study.",
    authors: "Millar JE, Wildi K,Bartnikowski N,et. al.",
    journal: "Physiol. Rep.",
    volume: "9(19):e15048",
    doi: "10.14814/phy2.15048",
  },
  {
    type: "article",
    year: 2021,
    title: "A clinically relevant sheep model of orthotopic heart transplantation 24 h after donor brainstem death.",
    authors: "See Hoe LE, Wildi K, Obonyo NG, ..., Millar JE, ..., Fraser JF.",
    journal: "Intensive Care Med. Exp.",
    volume: "9(1):60",
    doi: "10.1186/s40635-021-00425-4",
  },
  {
    type: "article",
    year: 2021,
    title: "Genetic mechanisms of critical illness in COVID-19.",
    authors: "Pairo-Castineira E, Clohisey S, Klaric L, ..., Millar JE, ..., Baillie JK.",
    journal: "Nature",
    volume: "591(7848):92-98",
    doi: "10.1038/s41586-020-03065-y",
  },
  {
    type: "article",
    year: 2021,
    title: "Mapping the human genetic architecture of COVID-19.",
    authors: "COVID-19 Host Genetics Initiative.",
    journal: "Nature",
    volume: "600(7889):472-477",
    doi: "10.1038/s41586-021-03767-x",
  },
  {
    type: "article",
    year: 2020,
    title: "Dynamic data-driven meta-analysis for prioritisation of host genes implicated in COVID-19.",
    authors: "Parkinson N, Rodgers N, Fourman MH, ..., Millar JE, ..., Clohisey S.",
    journal: "Sci. Rep.",
    volume: "10(1):22303",
    doi: "10.1038/s41598-020-79033-3",
  },
  {
    type: "article",
    year: 2020,
    title: "Socio-economic deprivation and the risk of death after ICU admission with COVID-19: The poor relation.",
    authors: "Soulsby CR, Hutchison, Gardner J, ..., Millar JE.",
    journal: "J. Intensive Care Soc.",
    doi: "10.1177/1751143720978855",
  },
  {
    type: "article",
    year: 2020,
    title: "Mesenchymal stromal cells for acute respiratory distress syndrome (ARDS), sepsis, and COVID-19 infection: optimizing the therapeutic potential.",
    authors: "Gorman E, Millar JE, McAuley D, et. al.",
    journal: "Expert Rev. Respir. Med.",
    volume: "15(3):301-324",
    doi: "10.1080/17476348.2021.1848555"
  },
  {
    type: "article",
    year: 2020,
    title: "Propofol target-controlled infusion in emergency department sedation (Peo-TEDS): a multicentre, single-arm feasibility study.",
    authors: "Burton F, Lowe DJ, Millar JE, et. al.",
    journal: "Emerg. Med. J.",
    volume: "38(3):205--210",
    doi: "10.1136/emermed-2020-209686",
  },
  {
    type: "article",
    year: 2020,
    title: "Design and rationale of the COVID-19 Critical Care Consortium international, multicentre, observational study.",
    authors: "Li Bassi G, Suen JY, Barnett AG, ..., Millar J, ..., Fraser JF.",
    journal: "BMJ Open",
    volume: "10(12):e041417",
    doi: "10.1136/bmjopen-2020-041417",
  },
  {
    type: "article",
    year: 2020,
    title: "Heart failure supported by veno-arterial extracorporeal membrane oxygenation (ECMO): a systematic review of pre-clinical models.",
    authors: "Heinser S, Rozencwajg S, Suen JY, ..., Millar JE.",
    journal: "Intensive Care Med. Exp.",
    volume: "8:16",
    doi: "10.1186/s40635-020-00303-5",
  },
  {
    type: "article",
    year: 2020,
    title: "Incidence of early intra-cranial bleeding and ischaemia in adult veno-arterial extracorporeal membrane oxygenation and extracorporeal cardiopulmonary resuscitation patients: a retrospective analysis of risk factors.",
    authors: "Malfertheiner MV, Koch C, Fisser C, Millar JE, et. al.",
    journal: "Perfusion",
    volume: "35(1_suppl):8-17",
    doi: "10.1177/0267659120907438",
  },
  {
    type: "article",
    year: 2020,
    title: "Ex vivo models for research in extracorporeal membrane oxygenation: a systematic review of the literature.",
    authors: "Malfertheiner MV, Broman LM, Vercaemst L, ..., Millar JE, ..., Fraser JF.",
    journal: "Perfusion",
    volume: "35(1_suppl):38-49",
    doi: "10.1177/0267659120907439",
  },
  {
    type: "article",
    year: 2020,
    title: "Combined mesenchymal stromal cell therapy and ECMO in ARDS: a randomised controlled trial in sheep.",
    authors: "Millar JE, Bartnikowski N, Passmore MR, et. al.",
    journal: "Am. J. Respir. Crit. Care Med.",
    volume: "202(3):383-392",
    doi: "10.1164/rccm.201911-2143OC",
    pdf: "201911-2143oc.pdf"
  },
  {
    type: "article",
    year: 2020,
    title: "Heart Transplantation From Brain Dead Donors: A Systematic Review of Animal Models.",
    authors: "See Hoe LE, Wells MA, Bartnikowski N, ..., Millar JE, ..., Fraser JF.",
    journal: "Transplantation",
    volume: "104(11):2272-2289",
    doi: "10.1097/TP.0000000000003217",
  },
  {
    type: "article",
    year: 2020,
    title: "Effect of target-controlled propofol infusion to reduce the incidence of adverse events for procedural sedation in the emergency department: a systematic review.",
    authors: "Burton FM, Lowe DJ, Millar JE, et. al.",
    journal: "Eur. J. Emerg. Med.",
    volume: "27(4):253259",
    doi: "10.1097/MEJ.0000000000000655"
  },
  {
    type: "article",
    year: 2019,
    title: "Low flow rate alters haemostatic parameters in an ex-vivo extracorporeal membrane oxygenation circuit.",
    authors: "Ki KK, Passmore MR, Chan CHH, ..., Millar JE, ..., Suen JY.",
    journal: "Intensive Care Med. Exp.",
    volume: "7:51",
    doi: "10.1186/s40635-019-0264-z",
  },
  {
    type: "article",
    year: 2019,
    title: "Extracorporeal membrane oxygenation (ECMO) and the acute respiratory distress syndrome (ARDS): a systematic review of pre-clinical models.",
    authors: "Millar JE, Bartnikowski N, von Bahr V, et. al.",
    journal: "Intensive Care Med. Exp.",
    volume: "7(1):18",
    doi: "10.1186/s40635-019-0232-7",
  },
  {
    type: "article",
    year: 2019,
    title: "Mesenchymal stem cells may ameliorate inflammation in an ex-vivo model of extracorporeal membrane oxygenation.",
    authors: "von Bahr, Millar JE, Malfertheiner MV, et. al.",
    journal: "Perfusion",
    volume: "34(1suppl):15-21",
    doi: "10.1177/0267659119830857"
  },
  {
    type: "article",
    year: 2019,
    title: "Long-term pulmonary function and quality of life in adults after extracorporeal membrane oxygenation for respiratory failure.",
    authors: "von Bahr V, Kalzen H, Frenckner B, ..., Millar JE, ..., Holzgraefe B.",
    journal: "Perfusion",
    volume: "34(1suppl):49-57",
    doi: "10.1177/0267659119830244"
  },
  {
    type: "article",
    year: 2019,
    title: "Pre-clinical study protocol: Blood transfusion in endotoxaemic shock.",
    authors: "Obonyo NG, Byrne L, Tung JP, ..., Millar JE, ..., Fraser JF.",
    journal: "Methods X",
    volume: "6:1124--1132",
    doi: "10.1016/j.mex.2019.05.005",
  },
  {
    type: "article",
    year: 2019,
    title: "A study protocol for a feasibility study: Propofol Target-Controlled Infusion in Emergency Department Sedation (PRoTEDS) -- a multicentre feasibility study protocol.",
    authors: "Burton FM, Lowe DJ, Millar J, et. al.",
    journal: "Pilot Feasibility Stud.",
    volume: "5:27",
    doi: "10.1186/s40814-019-0412-y",
  },
  {
    type: "article",
    year: 2019,
    title: "Neuron-Specific Enolase and matrix metalloproteinase 9 signal perioperative silent brain infarction during or after transcatheter aortic valve implantation.",
    authors: "Fanning JP, SeeHoe LE, Passmore MR, ..., Millar JE, ..., Fraser JF.",
    journal: "Am. J. Cardiol.",
    volume: "123(3):434-439",
    doi: "10.1016/j.amjcard.2018.10.022"
  },
  {
    type: "article",
    year: 2019,
    title: "Administration of mesenchymal stem cells during ECMO results in a rapid decline in oxygenator performance.",
    authors: "Millar JE, von Bahr V, Malfertheiner MV, et. al.",
    journal: "Thorax",
    volume: "74(2):194-196",
    doi: "10.1136/thoraxjnl-2017-211439",
  },
  {
    type: "article",
    year: 2018,
    title: "High flow nasal oxygen after bariatric (OXYBAR), prophylactic post-operative high flow nasal oxygen versus conventional oxygen therapy in obese patients undergoing bariatric surgery: a study protocol for a randomised controlled pilot trial.",
    authors: "Fulton R, Millar JE, Merza M, et. al.",
    journal: "Trials",
    volume: "19(1):402",
    doi: "10.1007/s11695-021-05644-y"
  },
  {
    type: "article",
    year: 2018,
    title: "Differential immunological profiles herald magnetic resonance imaging-defined perioperative cerebral infarction.",
    authors: "Fanning JP, See Hoe LE, Passmore MR, ..., Millar JE, ..., Fraser JF.",
    journal: "Ther. Adv. Neurol. Dis.",
    volume: "11:1756286418759493",
    doi: "10.1177/1756286418759493",
  },
  {
    type: "article",
    year: 2017,
    title: "Acquired von Willebrand syndrome in respiratory extracorporeal life support: a systematic review of the literature.",
    authors: "Malfertheiner MV, Pimenta LP, von Bahr V, Millar JE, et. al.",
    journal: "Crit. Care Resusc.",
    volume: "19(Suppl 1):45-52",
    url: "https://pubmed.ncbi.nlm.nih.gov/29084501/"
  },
  {
    type: "article",
    year: 2016,
    title: "The inflammatory response to extracorporeal membrane oxygenation (ECMO): a review of the pathophysiology.",
    authors: "Millar JE, Fanning JP, McDonald CI, et. al.",
    journal: "Crit. Care",
    volume: "20:387",
    doi: "10.1186/s13054-016-1570-4",
  },
  {
    type: "article",
    year: 2016,
    title: "The soda dipstick: A convenient and cost-effective means of identifying the sugar content of soft drinks.",
    authors: "Devaney J, Smyth R, Lutton S, ..., Millar JE.",
    journal: "J. Diabetes",
    volume: "8(6):877-878",
    doi: "10.1111/1753-0407.12431"
  },
  {
    type: "article",
    year: 2016,
    title: "Top 10 lessons from the Glasgow major incidents.",
    authors: "Lowe DJ, Millar JE, Dignon N, Ireland A.",
    journal: "Emerg. Med. J.",
    volume: "33(8):596-7",
    doi: "10.1136/emermed-2015-205626"
  },
  {
    type: "article",
    year: 2014,
    title: "Extracorporeal carbon dioxide removal for patients with acute respiratory failure secondary to the Acute Respiratory Distress Syndrome: a systematic review.",
    authors: "Fitzgerald M, Millar J, Blackwood B, et. al.",
    journal: "Crit. Care",
    volume: "18(3):222",
    doi: "10.1186/cc13875",
  },
  {
    type: "article",
    year: 2014,
    title: "The use of high flow nasal oxygen in the management of hypercarbic respiratory failure.",
    authors: "Millar J, Lutton S, O'Connor P.",
    journal: "Ther. Adv. Respir. Dis.",
    volume: "8(2):63-4",
    doi: "10.1177/1753465814521890",
  },
  {
    type: "editorial",
    year: 2024,
    title: "It ain't what you do (it's the way that you do it): modulating the host response in sepsis.",
    authors: "Millar JE, Docherty AB.",
    journal: "Anaesthesia",
    volume: "Online ahead of print",
    doi: "10.1111/anae.16263",
  },
  {
    type: "editorial",
    year: 2023,
    title: "Driving pressure - what's the harm?",
    authors: "Millar JE, McAuley DF, Marini JJ.",
    journal: "Crit. Care Med.",
    volume: "51(7): 967-970",
    doi: "10.1097/CCM.0000000000005874",
  },
  {
    type: "editorial",
    year: 2020,
    title: "Clinical Evidence Does Not Support Corticosteroid Treatment for 2019-nCoV Lung Injury.",
    authors: "Russell CD, Millar JE, Baillie JK.",
    journal: "Lancet",
    volume: "395(10223): 473--475",
    doi: "10.1016/S0140-6736(20)30317-2",
  },
  {
    type: "editorial",
    year: 2020,
    title: "Apples and oranges: international comparisons of COVID-19 observational studies in ICUs.",
    authors: "Millar JE, Busse R, Fraser JF, et. al.",
    journal: "Lancet Respir. Med.",
    volume: "8(10):952--953",
    doi: "10.1016/S2213-2600(20)30368-4",
  },
  {
    type: "editorial",
    year: 2015,
    title: "Mesenchymal stromal cells and the acute respiratory distress syndrome (ARDS): challenges for clinical application.",
    authors: "Millar JE, Fraser JF, McAuley DF.",
    journal: "Thorax",
    volume: "70(7):611-2",
    doi: "10.1136/thoraxjnl-2015-207121",
  },
  {
    type: "letter",
    year: 2016,
    title: "Need for a systematic audit of trauma care in Northern Ireland.",
    authors: "Millar JE, Lutton S, McLaughlin R.",
    journal: "BMJ",
    volume: "353:i2025",
    doi: "10.1136/bmj.i2025"
  },
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
        // Use the correct relative path
        const pdfPath = `pdf/${pub.pdf}`;
        html += `<a href="${pdfPath}" target="_blank" class="pdf-link"><i class="fas fa-file-pdf"></i> PDF</a>`;
    }

    item.innerHTML = html;
    return item;
}

// Add this after your existing code
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pdf-link').forEach(link => {
        console.log(`PDF link in DOM: ${link.href}`);
    });
});

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