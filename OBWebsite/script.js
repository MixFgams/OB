window.onload = function() {
    // Fonction pour charger le contenu du fichier CSV dans la colonne spécifiée
function loadCSVInColumn(csv, columnId) {
    var lines = csv.split('\n');
    var html = '<table>';
    lines.forEach(function(line) {
        html += '<tr>';
        var cells = line.split(';'); // Utiliser le point-virgule comme séparateur
        cells.forEach(function(cell) {
            html += '<td>' + cell + '</td>';
        });
        html += '</tr>';
    });
    html += '</table>';
    document.getElementById(columnId).innerHTML = html; // Mettre le contenu dans la colonne spécifiée
}


    // Fonction pour charger le fichier CSV
    function loadCSVFile(file, columnId) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var csv = event.target.result;
            loadCSVInColumn(csv, columnId);
        };
        reader.readAsText(file);
    }

    // Gestionnaire d'événement pour le clic sur le bouton de chargement
    document.getElementById('loadButton').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        var columnSelect = document.getElementById('columnSelect');
        var columnId = columnSelect.value;

        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            loadCSVFile(file, columnId); // Charger le fichier sélectionné dans la colonne spécifiée
        } else {
            // Charger le fichier par défaut correspondant à la colonne sélectionnée
            var fileName = '';
            switch (columnId) {
                case 'filmsData':
                    fileName = 'Films.csv';
                    break;
                case 'mangaData':
                    fileName = 'Manga.csv';
                    break;
                case 'musiqueData':
                    fileName = 'Musique.csv';
                    break;
                default:
                    console.error('Fichier CSV par défaut non défini pour la colonne ' + columnId);
                    return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', fileName, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    loadCSVInColumn(xhr.responseText, columnId);
                }
            };
            xhr.send();
        }
    });

    // Ajout du gestionnaire d'événements pour la recherche
    document.getElementById('searchInput').addEventListener('input', function() {
        var searchText = this.value.toLowerCase();
        var columns = ['filmsData', 'mangaData', 'musiqueData'];
        columns.forEach(function(columnId) {
            var rows = document.querySelectorAll('#' + columnId + ' table tr');
            rows.forEach(function(row) {
                var found = false;
                row.querySelectorAll('td').forEach(function(cell) {
                    if (cell.textContent.toLowerCase().includes(searchText)) {
                        found = true;
                    }
                });
                row.style.display = found ? '' : 'none';
            });
        });
    });
};
