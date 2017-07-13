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
  let nextColumn = Array(n - 1).fill(0, 0, n - 1);
  nextColumn.push(1);
  matrix.push(nextColumn);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};

let fact = function(x) {
  if (x === 0) {
    return 1;
  }
  return x * fact(x - 1);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return fact(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
