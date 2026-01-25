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
  for (let i = -3; i <= -1; i++) {
    const locationsVector: number[] = [];
    for (let j = 1; j <= 3; j++) {
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
  for (let i = -3; i <= -1; i++) {
    const locationsVector: number[] = [];
    for (let j = 1; j <= 3; j++) {
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
  for (let i = 0; i <= 2; i++) {
    const locationsVector: number[] = [];
    for (let j = 2; j >= 0; j--) {
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
  for (let i = 0; i <= 2; i++) {
    const locationsVector: number[] = [];
    for (let j = 2; j <= 0; j--) {
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
 * Rotate the right face (clockwise) of the cube state and return a new cube state.
 */
export function rightClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the right face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[2] = colors[0];
    out[0] = colors[3];
    out[3] = colors[1];
    out[1] = colors[2];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 0; i > -3; i--) {
    const locationsVector: number[] = [];
    for (let j = -1; j > -4; j--) {
      locationsVector.push(3*(9 + i) + j);
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
 * Rotate the right face (counter-clockwise) of the cube state and return a new cube state.
 */
export function rightCounterClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the right face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[3] = colors[0];
    out[1] = colors[3];
    out[2] = colors[1];
    out[0] = colors[2];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 0; i > -3; i--) {
    const locationsVector: number[] = [];
    for (let j = -1; j > -4; j--) {
      locationsVector.push(3*(9 + i) + j);
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
 * Rotate the left face (clockwise) of the cube state and return a new cube state.
 */
export function leftClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the left face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[3] = colors[0];
    out[1] = colors[3];
    out[2] = colors[1];
    out[0] = colors[2];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 2; i > -1; i--) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(3*i + j);
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
 * Rotate the left face (counter-clockwise) of the cube state and return a new cube state.
 */
export function leftCounterClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the left face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[2] = colors[0];
    out[0] = colors[3];
    out[3] = colors[1];
    out[1] = colors[2];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 2; i > -1; i--) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 3; j++) {
      locationsVector.push(3*i + j);
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
 * Rotate the front face (clockwise) of the cube state and return a new cube state.
 */
export function frontClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the front face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[4] = colors[2];
    out[2] = colors[5];
    out[5] = colors[3];
    out[3] = colors[4];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 3; i > 0; i--) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 27; j+=9) {
      locationsVector.push(3*i -1 + j);
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
 * Rotate the front face (counter-clockwise) of the cube state and return a new cube state.
 */
export function frontCounterClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the front face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[5] = colors[2];
    out[3] = colors[5];
    out[4] = colors[3];
    out[2] = colors[4];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 3; i > 0; i--) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 27; j+=9) {
      locationsVector.push(3*i -1 + j);
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
 * Rotate the back face (clockwise) of the cube state and return a new cube state.
 */
export function backClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the back face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[5] = colors[2];
    out[3] = colors[5];
    out[4] = colors[3];
    out[2] = colors[4];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 1; i < 4; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 27; j+=9) {
      locationsVector.push(3*(9-i) - j);
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
 * Rotate the back face (counter-clockwise) of the cube state and return a new cube state.
 */
export function backCounterClockwise(cubeState: CubeState): CubeState {
  // Helper: deep copy to avoid mutating the original
  const newState: CubeState = JSON.parse(JSON.stringify(cubeState));

  // Helper to change colors for a piece when rotating it on the back face
  function changeColors(colors: string[]): string[] {
    const out = colors.slice(); // copy
    out[4] = colors[2];
    out[2] = colors[5];
    out[5] = colors[3];
    out[3] = colors[4];
    return out;
  }

  // Build locations_matrix
  const locationsMatrix: number[][] = [];
  for (let i = 1; i < 4; i++) {
    const locationsVector: number[] = [];
    for (let j = 0; j < 27; j+=9) {
      locationsVector.push(3*(9-i) - j);
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