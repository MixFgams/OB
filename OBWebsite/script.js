// Objets pour stocker les données CSV
var dataStore = {
    films: [],
    manga: [],
    musique: []
};

// Fonction pour charger le fichier CSV
function loadCSVFile(file, columnId) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var csv = event.target.result;
        console.log('CSV Loaded:', csv);
        var data = parseCSV(csv);
        dataStore[columnId] = data;
        loadCSVInColumn(data, columnId);
    };
    reader.readAsText(file);
}

// Fonction pour parser le CSV
function parseCSV(csv) {
    var lines = csv.split('\n');
    return lines.map(function(line) {
        return line.split(',');
    });
}

// Fonction pour charger le contenu du fichier CSV dans la colonne spécifiée
function loadCSVInColumn(data, columnId) {
    console.log('Loading CSV into column:', columnId);
    var html = '<table>';
    data.forEach(function(cells) {
        if (cells.length > 0) {
            html += '<tr>';
            cells.forEach(function(cell) {
                html += '<td>' + cell + '</td>';
            });
            var itemString = cells.join(' ').replace(/"/g, "&quot;");
            html += '<td><button class="addButton" data-item="' + itemString + '">Ajouter à la liste</button></td>';
            html += '</tr>';
        }
    });
    html += '</table>';
    document.getElementById(columnId + 'Data').innerHTML = html;

    // Ajouter des gestionnaires d'événements aux nouveaux boutons "Ajouter à la liste"
    document.querySelectorAll('.addButton').forEach(function(button) {
        button.addEventListener('click', function() {
            var item = this.getAttribute('data-item');
            addToList(item);
        });
    });
}

// Fonction pour ajouter un élément à la liste
function addToList(item) {
    console.log('Adding to list:', item);
    var list = document.getElementById('myList');
    var listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
}

// Gestionnaire d'événement pour le bouton de chargement de fichier CSV
document.getElementById('loadButton').addEventListener('click', function() {
    console.log('Load Button Clicked');
    var fileInput = document.getElementById('fileInput');
    var columnSelect = document.getElementById('columnSelect');
    var file = fileInput.files[0];
    var columnId = columnSelect.value;

    if (file) {
        console.log('File selected:', file.name);
        console.log('Column selected:', columnId);
        loadCSVFile(file, columnId);
    } else {
        alert('Veuillez sélectionner un fichier CSV.');
    }
});

// Fonction de recherche
document.getElementById('searchInput').addEventListener('input', function() {
    console.log('Search Input Changed');
    var searchValue = this.value.toLowerCase();
    var columnId = document.getElementById('columnSelect').value;
    var filteredData = dataStore[columnId].filter(function(row) {
        return row.join(' ').toLowerCase().includes(searchValue);
    });
    loadCSVInColumn(filteredData, columnId);
});

// Charger automatiquement les fichiers CSV lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    fetch('Films.csv')
        .then(response => response.text())
        .then(data => {
            var parsedData = parseCSV(data);
            dataStore['films'] = parsedData;
            loadCSVInColumn(parsedData, 'films');
        })
        .catch(error => console.error('Erreur de chargement des fichiers CSV:', error));

    fetch('Manga.csv')
        .then(response => response.text())
        .then(data => {
            var parsedData = parseCSV(data);
            dataStore['manga'] = parsedData;
            loadCSVInColumn(parsedData, 'manga');
        })
        .catch(error => console.error('Erreur de chargement des fichiers CSV:', error));

    fetch('Musique.csv')
        .then(response => response.text())
        .then(data => {
            var parsedData = parseCSV(data);
            dataStore['musique'] = parsedData;
            loadCSVInColumn(parsedData, 'musique');
        })
        .catch(error => console.error('Erreur de chargement des fichiers CSV:', error));
});
// Fonction pour charger le fichier XLSX
function loadXLSXFile(file, columnId) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0];
        var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        var parsedData = parseCSV(csv);
        dataStore[columnId] = parsedData;
        loadCSVInColumn(parsedData, columnId);
    };
    reader.readAsArrayBuffer(file);
}


// Gestionnaire d'événement pour le bouton de chargement de fichier
document.getElementById('loadButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var columnSelect = document.getElementById('columnSelect');
    var file = fileInput.files[0];
    var columnId = columnSelect.value + 'Data'; // Adapter l'ID de la colonne

    if (file) {
        loadXLSXFile(file, columnId);
    } else {
        alert('Veuillez sélectionner un fichier CSV ou XLSX.');
    }
});
