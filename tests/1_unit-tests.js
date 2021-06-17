const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
  suiteSetup(done => {
    solver = new Solver();
    done();
  });

  suite('Function validate()', () => {
    test('Valid Characters, length of 81', (done) => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.strictEqual(solver.validate(puzzleString),true)
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9" or "."") are not accepted', (done) => {
      const puzzleString = '..X..5.1.85.4....2432.HI...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const error = "Invalid characters in puzzle";
      assert.notEqual(solver.validate(puzzleString),true)
      assert.strictEqual(solver.validate(puzzleString).error,error)
      done();
    });

    // Puzzles that are not 81 numbers/periods long show the message 
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = "Expected puzzle to be 81 characters long";
      let myObject = solver.validate(shortStr);
      let getString = myObject.error;
      assert.strictEqual(getString,errorMsg);
      done();
    });
  });
  
  suite('Function checkRowPlacement()', () => {
    test('Valid placement for a row', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const row = "A";
      const col = "1";
      const value = "3";
      assert.strictEqual(solver.checkRowPlacement(puzzleString,row,col,value),true)
       done();
    });
    
    test('Invalid placement for a row', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const row = "A";
      const col = "4";
      const value = "9";
      assert.strictEqual(solver.checkRowPlacement(puzzleString,row,col,value),false);
      done();
    });
    
  });

  suite('Function checkColPlacement()', () => {
    test('Valid placement for a column', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const row = "B";
      const col = "3";
      const value = "3";
      assert.strictEqual(solver.checkColPlacement(puzzleString,row,col,value),true)
      done();
    });
    
    test('Invalid placement for a column', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const row = "B";
      const col = "3";
      const value = "9";
      assert.strictEqual(solver.checkColPlacement(puzzleString,row,col,value),false)
      done();
    });
    
  });

  suite('Function checkRegionPlacement()', () => {
    test('Valid placement for a region', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const row = "E";
      const col = "4";
      const value = "3";
      assert.strictEqual(solver.checkRegionPlacement(puzzleString,row,col,value),true)
      done();
    });
    
    test('Invalid placement for a region', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const row = "E";
      const col = "4";
      const value = "7";
      assert.strictEqual(solver.checkRegionPlacement(puzzleString,row,col,value),false);
      done();
    });
    
  });

  suite('Function solvePuzzle()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const puzzleString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      assert.strictEqual(solver.solve(puzzleString),true);
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const puzzleString = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      assert.strictEqual(solver.solve(puzzleString).error,"Puzzle cannot be solved");
      done();
    });

    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solvedString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      //console.log(solver.solve(puzzleString).solution);
      assert.strictEqual(solver.solve(puzzleString).solution,solvedString);
      done();
    });
  });
});