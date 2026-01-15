export type Piece = { colors: string[] };
export type CubeState = { [index: number]: Piece };

/**
 * Rotate the top face (clockwise) of the cube state and return a new cube state.
 */
export function topClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the top face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[5] = colors[0];
    out[0] = colors[4];
    out[4] = colors[1];
    out[1] = colors[5];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 3; i >= 1; i--) {
    const locationsVector: number[] = [];
    for (let j = 1; j <= 3; j++) {
      locationsVector.push(9 * j - i);
    }
    locationsMatrix.push(locationsVector);
  }

  // Transpose locations_matrix -> rotation_matrix
  const rotationMatrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(locationsMatrix[j][i]);
    }
    rotationMatrix.push(locationsVector);
  }

  // Swap first and third columns
  for (let i = 0; i < 3; i++) {
    const tmp = rotationMatrix[i][0];
    rotationMatrix[i][0] = rotationMatrix[i][2];
    rotationMatrix[i][2] = tmp;
  }

  // Update newState based on the rotation
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newI: number | null = null;
      let newJ: number | null = null;
      for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
          if (rotationMatrix[m][n] === locationsMatrix[i][j]) {
            newI = m;
            newJ = n;
          }
        }
      }

      if (newI === null || newJ === null) continue; // safety

      const fromIdx = locationsMatrix[i][j];
      const toIdx = locationsMatrix[newI][newJ];

      const fromPiece = cubeState[fromIdx];
      if (!fromPiece) continue; // safety

      newState[toIdx] = {
        ...newState[toIdx],
        colors: changeColors(fromPiece.colors.slice()),
      };
    }
  }

  return newState;
}


/**
 * Rotate the top face (counter-clockwise) of the cube state and return a new cube state.
 */
export function topCounterClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the top face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[4] = colors[0];
    out[1] = colors[4];
    out[5] = colors[1];
    out[0] = colors[5];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 3; i >= 1; i--) {
    const locationsVector: number[] = [];
    for (let j = 1; j <= 3; j++) {
      locationsVector.push(9 * j - i);
    }
    locationsMatrix.push(locationsVector);
  }

  // Transpose locations_matrix -> rotation_matrix
  const rotationMatrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(locationsMatrix[j][i]);
    }
    rotationMatrix.push(locationsVector);
  }

  // Swap first and third rows
  const tmp = rotationMatrix[0];
  rotationMatrix[0] = rotationMatrix[2];
  rotationMatrix[2] = tmp;

  // Update newState based on the rotation
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newI: number | null = null;
      let newJ: number | null = null;
      for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
          if (rotationMatrix[m][n] === locationsMatrix[i][j]) {
            newI = m;
            newJ = n;
          }
        }
      }

      if (newI === null || newJ === null) continue; // safety

      const fromIdx = locationsMatrix[i][j];
      const toIdx = locationsMatrix[newI][newJ];

      const fromPiece = cubeState[fromIdx];
      if (!fromPiece) continue; // safety

      newState[toIdx] = {
        ...newState[toIdx],
        colors: changeColors(fromPiece.colors.slice()),
      };
    }
  }

  return newState;
}


/**
 * Rotate the bottom face (clockwise) of the cube state and return a new cube state.
 */
export function bottomClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the bottom face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[4] = colors[0];
    out[1] = colors[4];
    out[5] = colors[1];
    out[0] = colors[5];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(9 * j + i);
    }
    locationsMatrix.push(locationsVector);
  }

  // Transpose locations_matrix -> rotation_matrix
  const rotationMatrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(locationsMatrix[j][i]);
    }
    rotationMatrix.push(locationsVector);
  }

  // Swap first and third rows
  const tmp = rotationMatrix[0];
  rotationMatrix[0] = rotationMatrix[2];
  rotationMatrix[2] = tmp;
  

  // Update newState based on the rotation
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newI: number | null = null;
      let newJ: number | null = null;
      for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
          if (rotationMatrix[m][n] === locationsMatrix[i][j]) {
            newI = m;
            newJ = n;
          }
        }
      }

      if (newI === null || newJ === null) continue; // safety

      const fromIdx = locationsMatrix[i][j];
      const toIdx = locationsMatrix[newI][newJ];

      const fromPiece = cubeState[fromIdx];
      if (!fromPiece) continue; // safety

      newState[toIdx] = {
        ...newState[toIdx],
        colors: changeColors(fromPiece.colors.slice()),
      };
    }
  }

  return newState;
}


/**
 * Rotate the bottom face (counter-clockwise) of the cube state and return a new cube state.
 */
export function bottomCounterClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the bottom face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[5] = colors[0];
    out[0] = colors[4];
    out[4] = colors[1];
    out[1] = colors[5];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(9 * j + i);
    }
    locationsMatrix.push(locationsVector);
  }

  // Transpose locations_matrix -> rotation_matrix
  const rotationMatrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(locationsMatrix[j][i]);
    }
    rotationMatrix.push(locationsVector);
  }

  // Swap first and third columns
  for (let i = 0; i < 3; i++) {
    const tmp = rotationMatrix[i][0];
    rotationMatrix[i][0] = rotationMatrix[i][2];
    rotationMatrix[i][2] = tmp;
  }

  // Update newState based on the rotation
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newI: number | null = null;
      let newJ: number | null = null;
      for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
          if (rotationMatrix[m][n] === locationsMatrix[i][j]) {
            newI = m;
            newJ = n;
          }
        }
      }

      if (newI === null || newJ === null) continue; // safety

      const fromIdx = locationsMatrix[i][j];
      const toIdx = locationsMatrix[newI][newJ];

      const fromPiece = cubeState[fromIdx];
      if (!fromPiece) continue; // safety

      newState[toIdx] = {
        ...newState[toIdx],
        colors: changeColors(fromPiece.colors.slice()),
      };
    }
  }

  return newState;
}

// Example helper for manual testing (not executed automatically)
export function exampleTopClockwise() {
  // Minimal mock cube: pieces at indexes used by algorithm (1..27)
  const mock: CubeState = {};
  for (let i = 1; i <= 27; i++) {
    // fill with distinct colors so we can see rotation (strings of index)
    mock[i] = { colors: [`c0-${i}`, `c1-${i}`, `c2-${i}`, `c3-${i}`, `c4-${i}`, `c5-${i}`] };
  }
  return topClockwise(mock);
}
