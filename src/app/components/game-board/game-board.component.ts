import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  showDisc: boolean = false;
  currentPlayer: number = 1;
  positionState: number[] = 
    [0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,
      0,0,0,0,0,0,0];

  positionSelected(pos: number) {
    console.log("Position selected (click): " + pos);
    let columnSelected: number = pos % 7;       // CALCULATE COLUMN SELECTED
    let position: number = this.positionState.findIndex(
      (element, index) => index % 7 === columnSelected && element !== 0); // CALCULATE THE LOWEST OCCUPIED POS IN THE COLUMN

    console.log("DSASFSDFSAFDSF: " + position);
    if(position === -1) {
      this.positionState[columnSelected + 35] = this.currentPlayer; // OCCUPIE LOWEST POS IN THE COLUMN
      this.changePlayerTurn();
    } else if(position > 6) {
      this.positionState[position - 7] = this.currentPlayer;  // OCCUPIE ABOVE POSITION
      this.changePlayerTurn();
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
}
