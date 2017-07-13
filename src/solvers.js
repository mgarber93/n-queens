/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  if (n === 1) { return [[1]]; }
  let matrix = window.findNRooksSolution(n - 1);
  matrix.forEach(array => array.push(0));
  matrix.push(Array(n).fill(0, 0, n - 1).fill(1, n - 1, n));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such
// that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return n <= 1 ? 1 : n * window.countNRooksSolutions(n - 1);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) { return {'n': 0}; }
  if (n === 1) { return [[1]]; }
  var solution = new Board({'n': n}); 
  //place first queen y, x
  let helperFunction = function(foundPieces) {
    if (foundPieces >= n) {
      return solution;
    }
    for (let col = 0; col < n; col++) {
      solution.togglePiece(foundPieces, col);
      if (!solution.hasAnyQueenConflictsOn(foundPieces, col)) {
        if (helperFunction(foundPieces + 1) === false) {
          solution.togglePiece(foundPieces, col);     
          continue;
        } else {
          return solution;
        }
      } 
      solution.togglePiece(foundPieces, col);     
    }
    return false;
  };
  helperFunction(0);
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.getBoard();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0;
  var solution = new Board({'n': n}); 
  //place first queen y, x
  let helperFunction = function(foundPieces) {
    if (foundPieces >= n) {
      solutionCount++;
      return true;
    }
    for (let col = 0; col < n; col++) {
      solution.togglePiece(foundPieces, col);
      if (!solution.hasAnyQueenConflictsOn(foundPieces, col)) {
        if (helperFunction(foundPieces + 1) !== false) {
          solution.togglePiece(foundPieces, col);
          continue;
        } else {
          solution.togglePiece(foundPieces, col);     
          continue;
        }
      } 
      solution.togglePiece(foundPieces, col);     
    }
    return false;
  };
  helperFunction(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
