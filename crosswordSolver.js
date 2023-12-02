// Fonction principale pour résoudre la grille de mots croisés
function crosswordSolver(puzzleStr, wordList){
    // Divise la chaîne de caractères représentant la grille en un wordList de lignes
    if (typeof puzzleStr !== 'string' || typeof wordList !== 'string'){
        console.log("ERROR le puzzle n' est pas une string ou la wordlist n'est pas un tableau")
        return
    }
    let grille = puzzleStr.split("\n")
      // Obtient la largeur et la hauteur de la grille
    let largeur = grille[0].length
    let longueur = grille.length
      // Appelle la fonction puzzleSolver pour commencer la résolution
    if (puzzleChecker(puzzleStr, wordList)){
    puzzleSolver(wordList, grille, 0, largeur, longueur)
    }
}

function puzzleChecker(puzzleStr, wordList){
    let wordNumberTab = []
    let numberOfWords = 0

 let doublonsBool = false
    let newSortedArrayOfWordList = wordList.slice()
    
    newSortedArrayOfWordList.sort()
    console.log(newSortedArrayOfWordList)
    for (let i = 0; i < newSortedArrayOfWordList.length; i++) {
        for (let j = i + 1; j < newSortedArrayOfWordList.length; j++) {
          if (newSortedArrayOfWordList[i] === newSortedArrayOfWordList[j]) {
            doublonsBool = true
          } 
        }
    }

    if (doublonsBool){
        console.log("ERROR, il y a 2 mots identiques")
        return false
    }

    if (puzzle == ""){
        console.log("ERROR Puzzle vide")
        return false
    }
    for (let k = 0 ; k < puzzleStr.length ; k++){
        if (puzzleStr[k] > 2){
            console.log("ERROR trop de mots qui partent de la meme case")
            return false
        }
    }
    for (let i = 0 ; i < puzzleStr.length ; i++){
        if (puzzleStr[i] >= 1){
            wordNumberTab.push(Number(puzzleStr[i]))
        }
    }
    console.log(wordNumberTab)
    for (let j = 0 ; j < wordNumberTab.length ; j++){
        numberOfWords += wordNumberTab[j]
    }
    console.log(numberOfWords)
    if (numberOfWords !== wordList.length){
        console.log("ERROR difference entre emplacements et le nombre de mots")
        return false
    } else {
        return true
    }


   


    
  
}


// Fonction récursive pour résoudre la grille de mots croisés
function puzzleSolver(words, grille, index, largeur, longueur){
      // console.log(`Attempting to solve for index ${index}`);
  // printGrille(grille);
  // console.log('---');
  // Vérifie s'il reste des mots à placer dans la grille
    if(index < words.length){
        // Récupère le mot actuel à placer
        const currentWord = words[index]
         // Calcule le nombre maximal de positions pour placer le mot verticalement ou horizontalement
        const largMax = largeur - currentWord.length
        const longMax = longueur - currentWord.length

              // Tente de placer le mot verticalement
        for (let i = 0; i <= longMax; i++) {
            for (let j = 0; j < largeur; j++) {
              // Copie la grille actuelle pour éviter les effets de bord (garder la grille d'origine)
              let temp = checkVertical(i, j, [...grille], currentWord)
              // Si le placement est possible, poursuit la résolution avec le mot suivant
              if (temp[0] !== "@") {
                
                puzzleSolver(words, temp, index + 1, largeur, longueur)
              }
            }
          }
         // Tente de placer le mot horizontalement
          for (let i = 0; i < longueur; i++) {
            for (let j = 0; j <= largMax; j++) {
          // Copie la grille actuelle pour éviter les effets de bord      
              let temp = checkHorizontal(i, j, [...grille], currentWord)
              // Si le placement est possible, poursuit la résolution avec le mot suivant
              if (temp[0] !== "@") {
                
                puzzleSolver(words, temp, index + 1, largeur, longueur)
              }
            }
          }
    } else {
        // Tous les mots ont été placés avec succès, imprime la solution
        printGrille(grille) 
        console.log('---')
    return
    }
}

// Fonction pour imprimer la grille de mots croisés
function printGrille(grille) {
    for (let i = 0; i < grille.length; i++) {
      console.log(grille[i])
    }
  }

  // Fonction pour vérifier si un mot peut être placé verticalement à une position spécifique
function checkVertical(x, y , grille, word){
    // Vérifie si la première lettre du mot correspond à la grille à la position spécifiée
    if (grille[x][y] != "1" && grille[x][y] != "2" && grille[x][y] != word[0]) {
        grille[0] = "@"
        return grille
      }

    // Vérifie s'il y a des obstacles dans la direction verticale 
      for (let i = 1; i < word.length; i++) {
        if (grille[x + i][y] == ".") {
          grille[0] = "@"
          return grille
        }
      }
      // Vérifie si le mot peut être placé verticalement sans conflit
      for (let i = 1; i < grille.length - x; i++) {
        if (i < word.length) {
            if (grille[x + i][y] != "0" && grille[x + i][y] != word[i] && grille[x + i][y] != "1") {
            grille[0] = "@"
            return grille
            }
        } else {
            if (grille[x + i][y] == "0" || grille[x + i][y] == "1") {
            grille[0] = "@"
            return grille
            } else if (grille[x + i][y] == ".") {
            break
            }
        }
      }
// Place le mot dans la grille verticalement
for (let i = 0; i < word.length; i++) {
    grille[x + i] = grille[x + i].slice(0, y) + word[i] + grille[x + i].slice(y + 1)
    }
  return grille

}

// Fonction pour vérifier si un mot peut être placé horizontalement à une position spécifique
function checkHorizontal(x, y, grille, word){
    // Vérifie si la première lettre du mot correspond à la grille à la position spécifiée
    if (grille[x][y] != "1" && grille[x][y] != "2" && grille[x][y] != word[0]) {
        grille[0] = "@"
        return grille
      }
       // Vérifie s'il y a des obstacles dans la direction horizontale
      for (let i = 1; i < word.length; i++) {
        if (grille[x][y + i] == ".") {
          grille[0] = "@"
          return grille
        }
      }
    
        // Vérifie si le mot peut être placé horizontalement sans conflit
        // compte l'espace disponible
      for (let i = 1; i < grille[0].length - y; i++) {
        if (i < word.length) {
          if (
            grille[x][y + i] != "0" && grille[x][y + i] != word[i] && grille[x][y + i] != "1") {
            grille[0] = "@"
            return grille
          }
        } else {
          if (grille[x][y + i] == "0" || grille[x][y + i] == "1") {
            grille[0] = "@"
            return grille
          } else if (grille[x][y + i] == ".") {
            break
          }
        }
      }
    
        // Place le mot dans la grille horizontalement
    
      grille[x] = grille[x].slice(0, y) + word + grille[x].slice(y + word.length)
      return grille
}

// const puzzle = '2001\n0..0\n2000\n0..0'
// const words = ['casa', 'alan', 'ciao', 'anta']
//c good

// const puzzle = '0001\n0..0\n3000\n0..0'
// const words = ['casa', 'alan', 'ciao', 'anta']
// c good

// const puzzle = '2001\n0..0\n1000\n0..0'
// const words = ['casa', 'casa', 'ciao', 'anta']
//c good

// const puzzle = ''
// const words = ['casa', 'alan', 'ciao', 'anta']
// c good

// const puzzle = 123
// const words = ['casa', 'alan', 'ciao', 'anta']
//c good

// const puzzle = ''
// const words = 123
// c good

// const puzzle = ''
// const words = ['123']
// c good
console.log(crosswordSolver(puzzle, words))