// Partie 1

// Definition des variables
const Nom_Classe = "B1-A";
let Nombre_Eleve = 28;
let Classe_Ouverte = true;

console.log("Nom de la classe :", Nom_Classe);
console.log("Nombre d'élèves :", Nombre_Eleve);
console.log("Classe ouverte :", Classe_Ouverte);

// Partie 2

let Eleve_1 = {
    prenom: "Baptiste",
    notes: {
        math: 14,
        francais: 12
    }
}

// Affichage du prenom de l'élève 1
console.log(Eleve_1.prenom)

// Partie 3

// Tableau d'élèves
let eleves = [
  { prenom: "Nikola", noteMaths: 5, noteFrancais: 13 },
  { prenom: "Mohammed", noteMaths: 17, noteFrancais: 16 },
  { prenom: "Daniel", noteMaths: 12, noteFrancais: 14 }
];

for (let i = 0; i < eleves.length; i++) {
    // Affichage des prenoms d'élèves
  console.log(eleves[i].prenom);
}

// Partie 4

// Calcul des moyennes
for (let i = 0; i < eleves.length; i++) {
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais)/2;
    // Affichage des moyenne
    console.log(eleves[i].prenom, "Moyenne  : ",moyenne);
}

// Partie 5

// Affichage du résultat des élèves, Admis/Refusé
for (let i = 0; i < eleves.length; i++) {
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais)/2; 
    if (moyenne >= 10) {
    console.log(eleves[i].prenom + " Admis");
    } else {
    console.log(eleves[i].prenom + " Refusé");
    }
}

// Partie 6

// Prise en compte des valeurs des moyennes
for (let i = 0; i < eleves.length; i++) {
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
    if (moyenne >= 10 && moyenne < 12) {
        console.log(eleves[i].prenom + " Passable");
    } 
    else if (moyenne >= 12 && moyenne < 14) {
        console.log(eleves[i].prenom + " Assez bien");
    } 
    else if (moyenne >= 14 && moyenne < 16) {
        console.log(eleves[i].prenom + " Bien");
    } 
    else if (moyenne >= 16 && moyenne <= 20) {
        console.log(eleves[i].prenom + " Très Bien");
    } 
    else {
        console.log(eleves[i].prenom + " Insuffisant");
    }
}

// Partie 7

// Prise en compte du nombre d'élèves admis
let index = 0;
let nombreAdmis = 0;

while (index < eleves.length) {
    let moyenne = (eleves[index].noteMaths + eleves[index].noteFrancais) / 2;
    if (moyenne >= 10) {
        nombreAdmis++;
    }
    index++;
}
// Affichage du nombre d'élèves
console.log("Nombre d'élèves admis :", nombreAdmis);

// Partie 8

// Calcul de la moyenne de la classe
let sommeMoyennes = 0;

for (let i = 0; i < eleves.length; i++) {
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
    sommeMoyennes += moyenne;
}
let moyenneClasse = sommeMoyennes / eleves.length;
// Affichage de la moyenne de la classe
console.log("Moyenne de la classe :", moyenneClasse);
