import { Component } from '@angular/core';

import winningCombinations from '../../../../fixtures/winning-combinations.json';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  showDisc: boolean = false;
  showRules: boolean = false;
  gameOver: boolean = false;
  currentPlayer: number = 1;
  playerOneFirst: boolean = true;
  winner: string = 'fsdfs';
  playerOnePoints: number = 0;
  playerTwoPoints: number = 0;

  positionState: number[] = 
    [0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0];
  
  winningArrays: number[][] = winningCombinations;

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
  
  changePlayerTurn() {
    this.currentPlayer === 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
  }

  restartGame() {
    this.positionState.fill(0);
    this.gameOver = false;
    this.playerOneFirst ? this.currentPlayer = 2 : this.currentPlayer = 1;  // CHANGE STARTER PLAYER  
    this.playerOneFirst = !this.playerOneFirst; // INDICATE WHETHER PLAYER 1 IS THE STARTER OR NOT
  }

  checkBoard() {
    for (let y = 0; y < this.winningArrays.length; y++) {
      const pos1 = this.positionState[this.winningArrays[y][0]]
      const pos2 = this.positionState[this.winningArrays[y][1]]
      const pos3 = this.positionState[this.winningArrays[y][2]]
      const pos4 = this.positionState[this.winningArrays[y][3]]

      if (pos1 === 1 && pos2 === 1 && pos3 === 1 && pos4 === 1) {
        this.winner = 'Winner is player 1'; 
        this.gameOver = true;
        this.playerOnePoints++;       
      }
      if (pos1 === 2 && pos2 === 2 && pos3 === 2 && pos4 === 2) {
        this.winner = 'Winner is player 2';        
        this.gameOver = true;  
        this.playerTwoPoints++;     
      }
    }
  }  
}
