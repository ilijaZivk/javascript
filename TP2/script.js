//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));
    // Ajouter la note générée au tableau
    notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// Partie 1

// Affichage de la taille du tableau
stockages_notes=[]
console.log("Taille du tableau :", notes.length);
for (i = 0; i < notes.length; i++){
    stockages_notes.push(notes[i])
}

// On suppose que la première note est la plus petite
let min = notes[0];
let max = notes[0];

// Parcours du tableau tout en déterminant la valeur la plus basse et la plus haute
for (let i = 1; i < notes.length; i++) {
    if (notes[i] < min) {
        min = notes[i];
    }
    else if (notes[i] < max) {
        max = notes[i];
    }
}
// Affichage de la note la plus basse
console.log("note la plus basse :", min);
console.log("note la plus haute :", max);
console.log("Le tableau : ", notes);

// Partie 2

// Initialisation de la variable indice
let IndiceMin =  0;

// Parcours du tableau
for (let i = 1; i < notes.length; i++) {
    if (notes[i] < notes[IndiceMin]) {
    IndiceMin = i;
    }
}
// Affichage de la valeur de l'indice le plus bas
console.log("Plus petite valeur :", notes[IndiceMin]);
console.log("Indice le plus bas:", IndiceMin);

// Partie 3

// Échange des places des valeurs (la plus petite valeur change de place avec la valeur de l'indice 0)
let temp = notes[0];
notes[0] = notes[IndiceMin];
notes[IndiceMin] = temp;

// Affichage du tableau avec la valeur la plus petite a 0
console.log("Tableau après échange :", notes);

// Partie 4 
// Boucle externe
for (let i = 0; i < notes.length - 1; i++) {
    let IndiceMin = i;

    // Boucle interne
    for (let j = i + 1; j < notes.length; j++) {
        if (notes[j] < notes[IndiceMin]) {
            IndiceMin = j;
        }
    }

    // Échange de la valeur trouvée avec la valeur à la position i
    let temp = notes[i];
    notes[i] = notes[IndiceMin];
    notes[IndiceMin] = temp;
}

// Affichage du tableau
console.log("Tableau trié :", notes);

// Partie 5

// Affichage du tableau avant et après tri
console.log("Tableau avant tri :", stockages_notes);
console.log("Tableau après tri :", notes);