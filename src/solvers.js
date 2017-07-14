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
// var solutionCount = undefined;
// countNRooksSolutions(n) = n!;
window.countNRooksSolutions = function(n) {
  var board = new Board({'n': n});
  var solutionCount = 0;
  findSolution(0, n, board, 'hasAnyColConflicts', function() {
    solutionCount++;
  });
  return solutionCount;
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
  let helperFunction = function(foundPieces, occCols = 0, majorDiags = [],
    minorDiags = []) {
    if (foundPieces >= n) {
      solutionCount++;
      return true;
    }
    for (let col = 0; col < n; col++) {
      if (occCols & (1 << col) || majorDiags.includes(col) ||
        minorDiags.includes(col)) {
        continue;
      }
      solution.togglePiece(foundPieces, col);
      majorDiags.push(col);
      minorDiags.push(col);
      if (!solution.hasAnyQueenConflictsOn(foundPieces, col)) {
        helperFunction(foundPieces + 1, occCols | (1 << col),
          majorDiags.reduce((acc, b) => b + 1 < n ? acc.concat([b + 1]) : acc, []),
          minorDiags.reduce((acc, b) => b - 1 >= 0 ? acc.concat([b - 1]) : acc, [])
        );
        majorDiags.pop();
        minorDiags.pop();
        solution.togglePiece(foundPieces, col);
        continue; // 100 ms difference
      }
      majorDiags.pop();
      minorDiags.pop();
      solution.togglePiece(foundPieces, col);
    }
    return false;
  };
  helperFunction(0, 0);
  return solutionCount;
};

window.countNQueensSolutionsFaster = function(n) {
  let solutionCount = 0;
  let helperFunction = function(foundPieces = 0,
    occCols = 0,
    majorDiags = 0,
    minorDiags = 0) {
    if (foundPieces >= n) {
      solutionCount++;
      return;
    } else {
      for (let col = 0; col < n; col++) {
        if (occCols & (1 << col) || (majorDiags & (1 << col)) ||
        (minorDiags & (1 << col))) {
          continue;
        }
        helperFunction(foundPieces + 1, occCols | (1 << col),
          (majorDiags | (1 << col)) << 1,
          (minorDiags | (1 << col)) >> 1);
      }
    }
  };
  helperFunction();
  return solutionCount;
};

window.findSolution = function(row, n, board, validator, callback) {
  if (row === n) {
    return callback();
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, i);
  }
};
