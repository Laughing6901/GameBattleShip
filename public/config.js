// Constant config for battleship game

export const config = {
  // Game
  phaser: {
    width: 800,
    height: 600,
  },
  // Board size
  board: {
    width: 10,
    height: 10,
  },
  // Square setup
  square: {
    width: 50,
    height: 50,
  },
  //ship panel
  ship: {
    width: 275,
    height: 70,
  },
  // These 2 objects belong to each other. If change in one, take a look at the
  // other
  shipsArr: [
    { ship2: 2 },
    { ship3: 3 },
    { ship32: 3 },
    { ship4: 4 },
    { ship5: 5 },
  ],
};
