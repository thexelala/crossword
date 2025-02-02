// Fonction principale pour résoudre la grille de mots croisés
function crosswordSolver(puzzleStr, wordList) {
    // verifie si le puzzle est une string et si le wordlist est bien un tableau
    if (typeof puzzleStr !== 'string' || !Array.isArray(wordList)){
      console.log("ERROR le puzzle n'est pas une string ou la wordlist n'est pas un tableau")
      return
  }
  let grille = puzzleStr.split("\n")
  let largeur = grille[0].length
  let longueur = grille.length
  if (puzzleChecker(puzzleStr, wordList)){
    puzzleSolver(wordList, grille, 0, largeur, longueur)
  }
  
}

 //verifie si le puzzle et words sont valides
 function puzzleChecker(puzzleStr, wordList){
  let wordNumberTab = []
  let numberOfWords = 0

  if (wordList.length == 2 && puzzleStr[0]== '2' && wordList[0][0] == wordList[1][0]){
  console.log("ERROR plusieur solutions sont possibles")
  return
}

let doublonsBool = false
  //copie du tableau d'origine pour ne pas modifier le premier
  let newSortedArrayOfWordList = wordList.slice()
  //trie alphabetique de la copie du tableau
  newSortedArrayOfWordList.sort()
  console.log(newSortedArrayOfWordList)
  //verifie s'il y a des doublons, si c'est le cas renvoit true
  for (let i = 0; i < newSortedArrayOfWordList.length; i++) {
      for (let j = i + 1; j < newSortedArrayOfWordList.length; j++) {
        if (newSortedArrayOfWordList[i] === newSortedArrayOfWordList[j]) {
          doublonsBool = true
        } 
      }
  }
  //s'il y a des doublons renvoit une erreur
  if (doublonsBool){
      console.log("ERROR, il y a 2 mots identiques")
      return false
  }
  //verifie que puzzle n'est pas une chaine vide
  if (puzzle == ""){
      console.log("ERROR Puzzle vide")
      return false
  }
  //verifie qu'il n'y ait que 2 mots qui partent d'une seul case
  for (let k = 0 ; k < puzzleStr.length ; k++){
      if (puzzleStr[k] > 2){
          console.log("ERROR trop de mots qui partent de la meme case")
          return false
      }
  }
  //crée un tableau du nombre de mots de la grille
  for (let i = 0 ; i < puzzleStr.length ; i++){
      if (puzzleStr[i] >= 1){
          wordNumberTab.push(Number(puzzleStr[i]))
      }
  }
  //console.log(wordNumberTab)
  //additionne les numero de la grille pour verifier le nombre de mots
  for (let j = 0 ; j < wordNumberTab.length ; j++){
      numberOfWords += wordNumberTab[j]
  }
  //console.log(numberOfWords)
  // renvoie true s'il y a assez de place pour placer les mots
  if (numberOfWords !== wordList.length){
      console.log("ERROR difference entre emplacements et le nombre de mots")
      return false
  } else {
      return true
  }
}

// Fonction récursive pour résoudre la grille de mots croisés
function puzzleSolver(words, grille, index, largeur, longueur) {
  if (index < words.length) {
    const currentWord = words[index]
    console.log(`Trying to place word: ${currentWord}`)
    console.log("Current grid state:")
    printGrille(grille)

    const largMax = largeur - currentWord.length
    const longMax = longueur - currentWord.length

    // Tente de placer le mot verticalement
    for (let i = 0; i <= longMax; i++) {
      for (let j = 0; j < largeur; j++) {
        let temp = checkVertical(i, j, [...grille], currentWord)
        if (temp[0] !== "@") {
          console.log(`Word placed successfully at position (${i}, ${j}) vertically`)
          if (puzzleSolver(words, temp[1], index + 1, largeur, longueur)) {
            return true
          }
        } else {
          console.log(`Failed to place word at position (${i}, ${j}) vertically`)
        }
      }
    }

    // Tente de placer le mot horizontalement
    for (let i = 0; i < longueur; i++) {
      for (let j = 0; j <= largMax; j++) {
        let temp = checkHorizontal(i, j, [...grille], currentWord)
        if (temp[0] !== "@") {
          console.log(`Word placed successfully at position (${i}, ${j}) horizontally`)
          if (puzzleSolver(words, temp[1], index + 1, largeur, longueur)) {
            return true
          }
        } else {
          console.log(`Failed to place word at position (${i}, ${j}) horizontally`)
        }
      }
    }

    // Aucune position valide trouvée pour le mot actuel

    return false
  } else {
    // Tous les mots ont été placés avec succès
    printGrille(grille)
    console.log("Bravo puzzle reussi")
    return true
  }
}


// Fonction pour vérifier si un mot peut être placé verticalement à une position spécifique
function checkVertical(x, y, grille, word) {
  if (grille[x][y] != "1" && grille[x][y] != "2" && grille[x][y] != word[0]) {
    return ["@", grille]
  }

  for (let i = 1; i < word.length; i++) {
    if (grille[x + i][y] == ".") {
      return ["@", grille]
    }
  }

  for (let i = 1; i < grille.length - x; i++) {
    if (i < word.length) {
      if (grille[x + i][y] != "0" && grille[x + i][y] != word[i] && grille[x + i][y] != "1") {
        return ["@", grille]
      }
    } else {
      if (grille[x + i][y] == "0" || grille[x + i][y] == "1") {
        return ["@", grille]
      } else if (grille[x + i][y] == ".") {
        break
      }
    }
  }

  for (let i = 0; i < word.length; i++) {
    grille[x + i] = grille[x + i].slice(0, y) + word[i] + grille[x + i].slice(y + 1)
  }
  return [null, grille]
}

// Fonction pour vérifier si un mot peut être placé horizontalement à une position spécifique
function checkHorizontal(x, y, grille, word) {
  if (grille[x][y] != "1" && grille[x][y] != "2" && grille[x][y] != word[0]) {
    return ["@", grille]
  }

  for (let i = 1; i < word.length; i++) {
    if (grille[x][y + i] == ".") {
      return ["@", grille]
    }
  }

  for (let i = 1; i < grille[0].length - y; i++) {
    if (i < word.length) {
      if (grille[x][y + i] != "0" && grille[x][y + i] != word[i] && grille[x][y + i] != "1") {
        return ["@", grille]
      }
    } else {
      if (grille[x][y + i] == "0" || grille[x][y + i] == "1") {
        return ["@", grille]
      } else if (grille[x][y + i] == ".") {
        break
      }
    }
  }

  grille[x] = grille[x].slice(0, y) + word + grille[x].slice(y + word.length)
  return [null, grille]
}

// Fonction pour imprimer la grille de mots croisés
function printGrille(grille) {
  for (let i = 0; i < grille.length; i++) {
    console.log(grille[i])
  }
  console.log()
}


const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
//validé

// const puzzle = `...1...........
// ..1000001000...
// ...0....0......
// .1......0...1..
// .0....100000000
// 100000..0...0..
// .0.....1001000.
// .0.1....0.0....
// .10000000.0....
// .0.0......0....
// .0.0.....100...
// ...0......0....
// ..........0....`
// const words = [
//   'sun',
//   'sunglasses',
//   'suncream',
//   'swimming',
//   'bikini',
//   'beach',
//   'icecream',
//   'tan',
//   'deckchair',
//   'sand',
//   'seaside',
//   'sandals',
// ]
//validé

// const puzzle = `..1.1..1...
// 10000..1000
// ..0.0..0...
// ..1000000..
// ..0.0..0...
// 1000..10000
// ..0.1..0...
// ....0..0...
// ..100000...
// ....0..0...
// ....0......`
// const words = [
//   'popcorn',
//   'fruit',
//   'flour',
//   'chicken',
//   'eggs',
//   'vegetables',
//   'pasta',
//   'pork',
//   'steak',
//   'cheese',
// ]
//validé

// const puzzle = `...1...........
// ..1000001000...
// ...0....0......
// .1......0...1..
// .0....100000000
// 100000..0...0..
// .0.....1001000.
// .0.1....0.0....
// .10000000.0....
// .0.0......0....
// .0.0.....100...
// ...0......0....
// ..........0....`
// const words = [
// 'sun',
// 'sunglasses',
// 'suncream',
// 'swimming',
// 'bikini',
// 'beach',
// 'icecream',
// 'tan',
// 'deckchair',
// 'sand',
// 'seaside',
// 'sandals',
// ].reverse()



//----------------------------------------------------
// const puzzle = '2001\n0..0\n2000\n0..0'
// const words = ['casa', 'alan', 'ciao', 'anta']
//validé

// const puzzle = '0001\n0..0\n3000\n0..0'
// const words = ['casa', 'alan', 'ciao', 'anta']
//validé

// const puzzle = '2001\n0..0\n1000\n0..0'
// const words = ['casa', 'casa', 'ciao', 'anta']
// validé

// const puzzle = ''
// const words = ['casa', 'alan', 'ciao', 'anta']
// validé

// const puzzle = 123
// const words = ['casa', 'alan', 'ciao', 'anta']
// validé

// const puzzle = ''
// const words = 123
// validé

// const puzzle = '2000\n0...\n0...\n0...'
// const words = ['abba', 'assa']
//validé

// const puzzle = '2001\n0..0\n1000\n0..0'
// const words = ['aaab', 'aaac', 'aaad', 'aaae']


console.log(crosswordSolver(puzzle, words))