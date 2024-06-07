window.onload = function() {
    // Fonction pour charger le fichier CSV dans la colonne spécifiée
    function loadCSVInColumn(file, columnId) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var csv = event.target.result;
            processData(csv, columnId);
        };
        reader.readAsText(file);
    }

    // Fonction pour traiter les données CSV et générer le HTML du tableau
    function processData(csv, columnId) {
        var lines = csv.split('\n');
        var html = '<table>';
        lines.forEach(function(line) {
            html += '<tr>';
            var cells = line.split(',');
            cells.forEach(function(cell) {
                html += '<td>' + cell + '</td>';
            });
            html += '</tr>';
        });
        html += '</table>';
        document.getElementById(columnId).innerHTML = '<h2>' + columnId.charAt(0).toUpperCase() + columnId.slice(1) + '</h2>' + html; // Mettre le contenu dans la colonne spécifiée
    }

    // Gestionnaire d'événement pour le clic sur le bouton
    document.getElementById('loadButton').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var selectedColumn = document.querySelector('.sidebar.selected');
            if (selectedColumn) {
                var columnId = selectedColumn.id;
                loadCSVInColumn(file, columnId); // Appeler la fonction pour charger le fichier dans la colonne sélectionnée
            }
        } else {
            alert('Veuillez sélectionner un fichier CSV.');
        }
    });

    // Charger le fichier CSV automatiquement après le chargement de la page
    var files = ['interests.csv', 'manga.csv']; // Noms des fichiers à charger automatiquement
    files.forEach(function(file) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var columnId = file.split('.')[0] + 'Column';
                    loadCSVInColumn(xhr.responseText, columnId); // Appeler la fonction pour charger le fichier dans la colonne spécifiée
                } else {
                    console.error('Impossible de charger le fichier ' + file);
                }
            }
        };
        xhr.send();
    });
};
