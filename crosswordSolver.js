function crosswordSolver(puzzleStr, wordList){
    let grille = puzzleStr.split("\n")
    let largeur = grille[0].length
    let longueur = grille.length

    puzzleSolver(wordList, grille, 0, largeur, longueur)
}

function puzzleSolver(words, grille, index, largeur, longueur){
    if(index < words.length){
        const currentWord = words[index]
        const largMax = largeur - currentWord.length
        const longMax = longueur - currentWord.length

        for (let i = 0; i <= longMax; i++) {
            for (let j = 0; j < largeur; j++) {
              let temp = checkVertical(i, j, [...grille], currentWord)
              if (temp[0] !== "@") {
                  console.log(currentWord);
                  console.log(temp);
                  console.log("--------------------------");
                puzzleSolver(words, temp, index + 1, largeur, longueur)
              }
            }
          }
          //---------------------------------------
          for (let i = 0; i <= longueur; i++) {
            for (let j = 0; j < largMax; j++) {
              let temp = checkHorizontal(i, j, [...grille], currentWord)
              if (temp[0] !== "@") {
                  console.log(currentWord);
                  console.log(temp);
                  console.log("--------------------------");
                solvePuzzle(words, temp, index + 1, largeur, longueur)
              }
            }
          }
    } else {
        printGrille(grille) 

    return
    }
}

function printGrille(grille) {
    for (let i = 0; i < grille.length; i++) {
      console.log(grille[i]);
    }
  }

function checkVertical(x, y , grille, word){
    if (grille[x][y] != "1" && grille[x][y] != "2" && grille[x][y] != word[0]) {
        grille[0] = "@"
        return grille
      }

      for (let i = 1; i < word.length; i++) {
        if (grille[x + i][y] == ".") {
          grille[0] = "@"
          return grille
        }
      }
      //---------------------------
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
//----------------------------------------
for (let i = 0; i < word.length; i++) {
    grille[x + i] =
    grille[x + i].slice(0, y) + word[i] + grille[x + i].slice(y + 1);
    }
  return grille;

}

function checkHorizontal(x, y, grille, word){
    if (grille[x][y] != "1" && grille[x][y] != "2" && grille[x][y] != word[0]) {
        grille[0] = "@"
        return grille
      }
      //vérifie les cases suivantes
      for (let i = 1; i < word.length; i++) {
        if (grille[x][y + i] == ".") {
          grille[0] = "@"
          return grille
        }
      }
    
      //Compte la longueur de l'espace disponible
      for (let i = 1; i < grille[0].length - y; i++) {
        if (i < word.length) {
          if (
            grille[x][y + i] != "0" &&
            grille[x][y + i] != word[i] &&
            grille[x][y + i] != "1"
          ) {
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
    
      //si ok place le mot dans la grille et renvoie
    
      grille[x] = grille[x].slice(0, y) + word + grille[x].slice(y + word.length)
      return grille
}

const puzzleStr = "2001\n0..0\n1000\n0..0";
const wordList = ["casa", "alan", "ciao", "anta"];
console.log(crosswordSolver(puzzleStr, wordList));