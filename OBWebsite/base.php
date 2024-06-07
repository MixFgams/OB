<?php
$csvFile = 'interests.csv';

// Vérifie si le fichier CSV existe
if (!file_exists($csvFile)) {
    die("Le fichier CSV n'existe pas.");
}

// Ouvre le fichier CSV en lecture
$file = fopen($csvFile, 'r');
if ($file === FALSE) {
    die("Impossible d'ouvrir le fichier CSV.");
}

// Affiche le contenu du fichier CSV
echo '<ul>';
while (($data = fgetcsv($file, 1000, ",")) !== FALSE) {
    echo '<li>id: ' . htmlspecialchars($data[0]) . ' - Interest: ' . htmlspecialchars($data[1]) . '</li>';
}
echo '</ul>';

// Ferme le fichier CSV
fclose($file);
?>
