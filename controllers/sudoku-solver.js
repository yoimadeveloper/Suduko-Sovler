let lookMe = {
  'A':0,
  'B':1,
  'C':2,
  'D':3,
  'E':4,
  'F':5,
  'G':6,
  'H':7,
  'I':8
 }
 class SudokuSolver {
 
   validate(puzzleString) {
    let numTest = /^[\d.]+$/;
    
    if(puzzleString.length != 81){
      return {error: 'Expected puzzle to be 81 characters long'}
    }
    
   if(numTest.test(puzzleString)=== false){
     return { error: 'Invalid characters in puzzle' }
    }
    
    return true;
   }
 
   dividedGrid(puzzleString){
     let replaceChar = puzzleString.replace(/\./g,'0');
     let multiArray = [[], [], [], [], [], [], [], [], []];
     let nextRow = -1;
     puzzleString = replaceChar.split('');
     for (let i = 0; i < puzzleString.length; i++) {
       if (i % 9 === 0) {
         nextRow++;
       }
       multiArray[nextRow].push(puzzleString[i]);
     }
     return multiArray;
   }
 
   evaluatePuzzle(puzzleString,row,column,value){
      if(this.validate(puzzleString).error)return this.validate(puzzleString);
     let alphabet = /^[a-iA-I]$/g;
     let number = /^[1-9]$/g;
     if (!puzzleString ||!row||!column|| !value) {
       return { error: 'Required field(s) missing'};
     }
 
   let alphabetTest = alphabet.test(row);
       if(!alphabetTest){
         return {error:'Invalid coordinate'}
       } 
 
   let myColumn = column.match(number);
       if(!myColumn){
       return { error: 'Invalid coordinate'};
     }
       
   let numTest = value.match(number);
       if(!numTest){
        return { error: 'Invalid value' };
     }
         
   let myObj = {valid:false,conflict:[]};
   console.log(this.checkColPlacement(puzzleString,row,column,value));
   if(this.checkRowPlacement(puzzleString,row,column,value) !== true){
     myObj.conflict.push('row');
   }
 
   if(this.checkColPlacement(puzzleString,row,column,value) !== true){
     myObj.conflict.push('column');
   }
   
   if(this.checkRegionPlacement(puzzleString,row,column,value) !== true){
     myObj.conflict.push('region');
   }
   
   if(myObj.conflict.length > 0){
     return myObj
   }
 
    return {valid:true}
    
   }
 
   checkRowPlacement(puzzleString, row, column, value) {
     let replaceChar = puzzleString.replace(/\./g,'0');
     let multiArray = [[], [], [], [], [], [], [], [], []];
     let nextRow = -1;
     puzzleString = replaceChar.split('');
     for (let i = 0; i < puzzleString.length; i++) {
       if (i % 9 === 0) {
         nextRow++;
       }
       multiArray[nextRow].push(puzzleString[i]);
     }
     row = row.toUpperCase();
     let currentRow = lookMe[row];
     let myCol = column -1;
     let currentIndexValue = multiArray[currentRow].indexOf(value);
     let expectedIndexValue = myCol;
     if(currentIndexValue != expectedIndexValue&&multiArray[currentRow].includes(value)){
       return false;
     }
    return true;
 
   }
   
   checkColPlacement(puzzleString, row, column, value) {
     let replaceChar = puzzleString.replace(/\./g,'0');
     let multiArray = [[], [], [], [], [], [], [], [], []];
     let nextRow = -1;
     puzzleString = replaceChar.split('');
     for (let i = 0; i < puzzleString.length; i++) {
       if (i % 9 === 0) {
         nextRow++;
       }
       multiArray[nextRow].push(puzzleString[i]);
     }
     row = row.toUpperCase();
     let currentRow = lookMe[row];
     let myCol = column -1;
     let currentIndexValue;
       for(let i = 0; i < multiArray.length;i++){
           if(multiArray[i][myCol].indexOf(value) !== -1){
           currentIndexValue = i;
           console.log(currentIndexValue)
           if(currentIndexValue != currentRow){
             if(multiArray[i][myCol] === value){
              return false
            }
           }
           }
         
       }
       return true;
   }
 
   checkRegionPlacement(puzzleString, row, column, value) {
     let replaceChar = puzzleString.replace(/\./g,'0');
     let multiArray = [[], [], [], [], [], [], [], [], []];
     let nextRow = -1;
     puzzleString = replaceChar.split('');
     for (let i = 0; i < puzzleString.length; i++) {
       if (i % 9 === 0) {
         nextRow++;
       }
       multiArray[nextRow].push(puzzleString[i]);
     }
     let myCol = column -1;
     row = row.toUpperCase();
     let currentRow = lookMe[row];
     let areaStartRow = parseInt(currentRow / 3) * 3;
     let areaStartCol = parseInt(myCol/ 3) * 3;
     for (let i = areaStartRow; i <  areaStartRow + 3; i++) {
       for (let j = areaStartCol; j < areaStartCol + 3; j++) {
         
           if(multiArray[currentRow][myCol].indexOf(value)!== -1){
             return true
           }
         
            if (multiArray[i][j] == value) {
           return false;
         }
         
       }
     }
     
     return true;
    
   }
 
   solve(puzzleString) {
    if(!puzzleString){
      return { error: 'Required field missing'};
    }
    if(this.validate(puzzleString).error)return this.validate(puzzleString);
   
     let replaceChar = puzzleString.replace(/\./g,'0');
     let multiArray = [[], [], [], [], [], [], [], [], []];
     let nextRow = -1;
     puzzleString = replaceChar.split('');
     for (let i = 0; i < puzzleString.length; i++) {
       if (i % 9 === 0) {
         nextRow++;
       }
       multiArray[nextRow].push(puzzleString[i]);
     }
    let board = multiArray;//this.dividedGrid(puzzleString);
    let testBoard = board;
    for(const key of testBoard){
      if(key.includes('0') !== true){
        for(let i = 0;i < key.length;i++){
          if(key.indexOf(key[i])!= key.lastIndexOf(key[i])){
            return { error: 'Puzzle cannot be solved' };
          }
          return true;
        }
      }
    }
    let testEmptySpot = (board)=>{
     for (var i = 0; i < 9; i++) {
         for (var j = 0; j < 9; j++) {
             if (board[i][j] == '0') 
                 return [i, j];
         }
     }
     return [-1, -1];
    }
    
    let testRow = (board, row, value)=>{
     for(var i = 0; i < board[row].length; i++) {
         if(board[row][i] == value) {
             return false;
         }
     }
    
     return true;
     }
     
   let testColumn = (board, column, value)=>{
     for(var i = 0; i < board.length; i++) {
         if(board[i][column] == value) {
             return false;
         }
     }
 
     return true;
   }
   
   let testSquare = (board, row, column, value)=>{
    let areaStartRow = Math.floor(row / 3) * 3;
    let areaStartCol = Math.floor(column / 3) * 3;
     
     for (var r = 0; r < 3; r++){
         for (var c = 0; c < 3; c++){
             if (board[areaStartRow + r][areaStartCol + c] == value)
                 return false;
         }
     }
 
     return true;
   }
 
   let testValue = (board, row, column, value)=>{
     if(testRow(board, row, value) &&
       testColumn(board, column, value) &&
       testSquare(board, row, column, value)) {
         return true;
     }
     
     return false; 
   }
   
 
   let solveMe = (board)=>{  
     let emptySpot = testEmptySpot(board);
     let row = emptySpot[0];
     let col = emptySpot[1];
 
     if (row === -1){
         return board;
     }
 
     for(let num = 1; num<=9; num++){
         if (testValue(board, row, col, num)){
             board[row][col] = num;
             solveMe(board);
         }
     }
 
     if (testEmptySpot(board)[0] !== -1)
         board[row][col] = 0;
     return board;
   }
   
   let answer = solveMe(board).toString();
   answer = answer.replace(/\,/g,"");
   for(let i =0;i < answer.length;i++){
    if(answer[i] == '0'){
    return { error: 'Puzzle cannot be solved' };
    }
   }
   
   return {solution:answer}
 
   }
 
 }
 
 module.exports = SudokuSolver;
   
 