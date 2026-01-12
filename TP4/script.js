//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Partie 1 – Génération des élèves

let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

let note_maximum = 20;
let names = ["Antoine", "Quentin", "Jules", "Adolphe", "Kent", "Enzo", "Matthieu", "Mohammed", "Trent", "Luciano"];

function genererEleves() {
    let students = [];

    for (let i = 0; i < taille; i++) {
        let indice_random = Math.floor(Math.random() * names.length);

        let eleve = {
            firstName: names[indice_random],
            noteMath: Math.floor(Math.random() * (note_maximum + 1)),
            noteFrancais: Math.floor(Math.random() * (note_maximum + 1)),
            noteHistoire: Math.floor(Math.random() * (note_maximum + 1))
        };

        let moyenne = (eleve.noteMath + eleve.noteFrancais + eleve.noteHistoire) / 3;
        eleve.moyenne = Number(moyenne.toFixed(2));

        students.push(eleve);
    }

    return students;
}

function afficherEleves(tab) {
    for (let i = 0; i < tab.length; i++) {
        console.log(tab[i].firstName + " - " + tab[i].moyenne); 
    }
}

let students = genererEleves();
console.log(students);
afficherEleves(students);

// Partie 2 – Étude des valeurs
console.log("Nombre d'élèves :", students.length);

function trouverMoyenneMin(tab, index) {
    let min_moyenne = tab[index].moyenne;
    let indice = index;

    for (let i = index + 1; i < tab.length; i++) {
        if (tab[i].moyenne < min_moyenne) {
            min_moyenne = tab[i].moyenne;
            indice = i;
        }
    }
    return indice;
}

// Partie 3 – Première étape du tri

let indexMin = trouverMoyenneMin(students, 0);
let min_moyenne = students[indexMin].moyenne;

console.log("L'élève ayant la plus petite moyenne", min_moyenne, 'est :', students[indexMin].firstName);
console.log("Indice de", min_moyenne, 'est :', indexMin);

// Partie 4 - Échange de valeurs
let tmp = students[0];
students[0] = students[indexMin];
students[indexMin] = tmp;

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
    let minIndex = j;
    for (let i = j + 1; i < students.length; i++) {
        nb_verify++;
        if (students[i].moyenne < students[minIndex].moyenne) {
            minIndex = i;
        }
    }
    if (minIndex !== j) {
        let tmp = students[j];
        students[j] = students[minIndex];
        students[minIndex] = tmp;
        nb_exchange++;
    }
}

console.log("=== Tri par ordre croissant ===");
for (let stud of students) {
    console.log(stud.firstName, '-', stud.moyenne);
}
