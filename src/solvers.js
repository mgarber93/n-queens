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

window.generateEveryRooksSolution = function(n) {
  if (n === 1) { return [[[1]]]; }
  let matrices = window.generateEveryRooksSolution(n - 1);
  let nextColumn = Array(n).fill(0, 0, n - 1).fill(1, n - 1, n);
  matrices.push(nextColumn);
  return matrices;
};

/**
 * Return the given matrix with every permutation of the col inserted inbetween
 * each col in that matrix.
 */
let permute = function(matrix, col) {
  return [matrix];
};

let fact = function(x) {
  if (x === 0) { return 1; }
  return x * fact(x - 1);
};

// return the number of nxn chessboards that exist, with n rooks placed such
// that none of them can attack each other
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
