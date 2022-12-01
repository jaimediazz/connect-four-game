import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  showDisc: boolean = false;
  currentPlayer: number = 1;
  winner: string = 'fsdfs';
  gameOver: boolean = false;
  positionState: number[] = 
    [0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0];
  
  winningArrays: number[][] = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
    [41, 34, 27, 20]
  ]

  positionSelected(pos: number) {
    let columnSelected: number = pos % 7;       // CALCULATE COLUMN SELECTED
    let position: number = this.positionState.findIndex(
      (element, index) => index % 7 === columnSelected && element !== 0); // CALCULATE THE LOWEST OCCUPIED POS IN THE COLUMN

    if(!this.gameOver) {
      if(position === -1) {
        this.positionState[columnSelected + 35] = this.currentPlayer; // OCCUPIE LOWEST POS IN THE COLUMN
        this.changePlayerTurn();
      } else if(position > 6) {
        this.positionState[position - 7] = this.currentPlayer;  // OCCUPIE ABOVE POSITION
        this.changePlayerTurn();
      }
      this.checkBoard();
    }
  }
  
  mouseOverPosition(pos: number) {
    console.log("Position selected (over): " + pos);
  }
  
  mouseOutPosition(pos: number) {
    console.log("Position selected (out): " + pos);
  }

  changePlayerTurn() {
    this.currentPlayer === 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
  }

  restartGame() {
    this.positionState.fill(0);
    this.gameOver = false;
  }

  checkBoard() {
    for (let y = 0; y < this.winningArrays.length; y++) {
      const square1 = this.positionState[this.winningArrays[y][0]]
      const square2 = this.positionState[this.winningArrays[y][1]]
      const square3 = this.positionState[this.winningArrays[y][2]]
      const square4 = this.positionState[this.winningArrays[y][3]]

      //check those squares to see if they all have the class of player-one
      if (square1 === 1 && square2 === 1 && square3 === 1 && square4 === 1) {
        this.winner = 'Winner is player 1'; 
        this.gameOver = true;       
      }
      //check those squares to see if they all have the class of player-two
      if (square1 === 2 && square2 === 2 && square3 === 2 && square4 === 2) {
        this.winner = 'Winner is player 2';        
        this.gameOver = true;       
      }
    }
  }  
}
