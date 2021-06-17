/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
     let {puzzle,coordinate,value} = req.body;//deconstruction es6
     if(!puzzle||!coordinate||!value){
       return res.json({ error: 'Required field(s) missing'})
     }
     let column = coordinate.slice(1);
     let row = coordinate.slice(0,1);
     return res.json(solver.evaluatePuzzle(puzzle, row, column, value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {
     let {puzzle,coordinate,value} = req.body;
      return res.json(solver.solve(puzzle));
    });
};