* crosswordSolver.js
 
 This script contains the crosswordSolver function, which solves an empty crossword puzzle.
 The function takes an empty puzzle and a list of words to fill in the puzzle.
 The filled puzzle is printed on the console.
 
 Rules for the empty puzzle:
 - Each character can be a number, a '.', or a '\n'.
 - A number represents the number of words starting from the specific position.
 - A '.' represents a space that does not need to be filled.
 
 If the puzzle or list of words provided does not guarantee a unique solution,
 or if any other conditions are not met, the function prints 'Error'.
 
 Example Usage:
 const emptyPuzzle = "1.2.\n..3..\n.4...\n";
 const wordList = ["apple", "banana", "cherry", "date"];
 crosswordSolver(emptyPuzzle, wordList);
 

