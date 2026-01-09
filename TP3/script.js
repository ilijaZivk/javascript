// Partie 1 – Génération des élèves

let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

let students = [];
let note_maximum = 20;
let names = ["Antoine", "Quentin", "Jules", "Adolphe", "Kent", "Enzo", "Matthieu", "Mohammed", "Trent", "Luciano"];

for (let i = 0; i < taille; i++) {
    let indice_random = Math.floor(Math.random() * (names.length));
    students.push({
        firstName : names[indice_random],
        noteMath : Math.floor(Math.random() * (note_maximum + 1)),
        noteFrancais : Math.floor(Math.random() * (note_maximum + 1)),
        noteHistoire : Math.floor(Math.random() * (note_maximum + 1)),
    });
}


for (let stud of students) {
    let moyenne = (stud.noteMath + stud.noteFrancais + stud.noteHistoire) / 3;
    stud.moyenne = Number(moyenne.toFixed(2));
}



// Partie 2 – Étude des valeurs
console.log("Nombre d'élèves :", students.length);

let min_moyenne = students[0].moyenne;
let max_moyenne = students[0].moyenne;

for (let i = 1; i < students.length; i++) {
    if (max_moyenne < students[i].moyenne) 
        max_moyenne = students[i].moyenne;
    if (min_moyenne > students[i].moyenne) 
        min_moyenne = students[i].moyenne;
}

console.log("Moyenne maximum :", max_moyenne);
console.log("Moyenne minimum :", min_moyenne);

// Partie 3 – Première étape du tri

for (let i = 0; i < students.length; i++) {
    if (students[i].moyenne === min_moyenne) {
        console.log("L'élève ayant la plus petite moyenne", min_moyenne, 'est :', students[i].firstName);
        console.log("Indice de", min_moyenne, 'est :', i);

// Partie 4 - Échange de valeurs
        students[i].moyenne = students[0].moyenne;
        students[0].moyenne = min_moyenne;
    }
}

let students_stockage = [];

for (let i = 0; i < taille; i++) {
    students_stockage.push({
        firstName : students[i].firstName,
        noteMath : students[i].noteMath,
        noteFrancais : students[i].noteFrancais,
        noteHistoire : students[i].noteHistoire,
        moyenne : students[i].moyenne,
    });
}

// Affichage du tableau avant tri avec prénom et moyenne.
console.log("=== Affichage du tableau avant tri avec prénom et moyenne ===");
for (let stud of students_stockage) {
    console.log(stud.firstName, '-', stud.moyenne);
}

// Partie 5 : Tri par sélection complet


let nb_exchange = 0;
let nb_verify = 0;

for (let j = 0; j < students.length - 1; j++) {
    for (let i = j + 1; i < students.length; i++) {
        nb_verify ++;
        if (students[j].moyenne > students[i].moyenne) {
            let tmp = students[j].moyenne;
            students[j].moyenne = students[i].moyenne;
            students[i].moyenne = tmp;
            nb_exchange ++;
        }   
    }
}

console.log("=== Tri par ordre croissant ===");
for (let stud of students) {
    console.log(stud.firstName, '-', stud.moyenne);
}