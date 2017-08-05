/**
 * Entry point for your program
 * 
 * @param {Array} ttt - The 2 dimensional array which shows the current state of game.
 * @param {string}  symbol - Denotes your symbol - 'X' or 'O'.
 * @returns {Array} The updated state of tictac board
 */
function spartans(input, ourChar) {
  theirChar = ourChar === 'X' ? 'O' : 'X';
  let combinations = [
    [input[0][0], input[0][1], input[0][2]],
    [input[1][0], input[1][1], input[1][2]],
    [input[2][0], input[2][1], input[2][2]],

    [input[0][0], input[1][0], input[2][0]],
    [input[0][1], input[1][1], input[2][1]],
    [input[0][2], input[1][2], input[2][2]],

    [input[0][0], input[1][1], input[2][2]],
    [input[2][0], input[1][1], input[0][2]],

  ];

  let findIJ = function(i, j) {
    if (i < 3) {
      return [i, j];
    } else if (i > 2 && i < 6) {
      return [j, i - 3];
    } else if (i === 6) {
      return [j, j]
    } else {
      if (j === 0) {
        return [2, 0];
      } else if (j === 1) {
        return [1, 1];
      } else if (j === 2) {
        return [0, 2];
      }
    }

  }
  let uniqueArrPush = function(arr, set) {
    let found = false;
    for (let i = 0; i < set.length; i++) {
      if (arr[0] == set[i][0] && arr[1] == set[i][1]) {
        found = true;
      }
    }
    // console.log(arr)
    if (!found) {
      set.push(arr)
    }
    return set;
  }
  let combLength = combinations.length;
  let loosePoints = [];
  let winNxtPoints = [];
  let theirPositions = [];
  let allNullPositions = [];
  let ourPositions = [];
  // console.log(combLength)
  for (let i = 0; i < combLength; i++) {
    let ourCount = 0;
    let theirCount = 0;
    let nullCount = 0;
    let nullPointJ = 0;
    for (let j = 0; j < 3; j++) {
      let ourPositioninInput = findIJ(i, j);
      // console.log(i+", "+j)
      if (combinations[i][j] === ourChar) {
        ourCount++;
      } else if (combinations[i][j] === theirChar) {
        theirCount++;
        theirPositions.push(ourPositioninInput);
      } else {
        nullCount++;
        nullPoint = ourPositioninInput;
        allNullPositions = uniqueArrPush(ourPositioninInput, allNullPositions);
      }
    }
    if (ourCount == 2 && nullCount == 1) {
      input[nullPoint[0]][nullPoint[1]] = ourChar;
      return input;
    } else if (theirCount == 2 && nullCount == 1) {
      loosePoints.push(nullPoint);
    }
  }
  if (loosePoints.length > 0) {

    input[loosePoints[0][0]][loosePoints[0][1]] = ourChar;
    return input;
  } else if (allNullPositions.length === 9) {
    input[1][1] = ourChar;
  } else if (allNullPositions.length === 8) {
    if (input[1][1] === theirChar) {
      input[2][0] = ourChar;
    } else if (input[0][1] === theirChar) {
      input[0][0] = ourChar;
    } else if (input[1][0] === theirChar) {
      input[2][0] = ourChar;
    } else if (input[2][1] === theirChar) {
      input[2][2] = ourChar;
    } else if (input[1][2] === theirChar) {
      input[0][2] = ourChar;
    } else {
      input[1][1] = ourChar;
    }
  } else {
    input[allNullPositions[0][0], allNullPositions[0][1]] = ourChar;
  }
  return [input];
}
