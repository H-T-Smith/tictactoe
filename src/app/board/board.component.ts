import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import currentUserJson from '../_helpers/currentUser.json'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public board: string[][] = [["", "", ""], ["","",""],["","",""]];
  private userId: string;
  private playerNum: number;


  change(cell: number): any {
    console.log(this.playerNum);

    if (this.board[Math.floor(cell/3)][cell%3] !== "") {
      // TODO: error animation, allow player to choose a different square
    }
    // Changing the values of the cells locally. This will be a backend service.
    else {
      if (this.playerNum === 1) this.board[Math.floor(cell/3)][cell%3] = "X";
      else if (this.playerNum === -1) this.board[Math.floor(cell/3)][cell%3] = "O";
      
      // check for a winner
      const isX = (val: string) => val === "X";
      const isO = (val: string) => val === "O";

      // diagonal
      if (isX(this.board[1][1])) {
        if ((isX(this.board[0][0]) && isX(this.board[2][2])) || (isX(this.board[0][2]) && isX(this.board[2][0]))) {} // player 1 wins!
      }
      if (isO(this.board[1][1])) {
        if ((isO(this.board[0][0]) && isO(this.board[2][2])) || (isO(this.board[0][2]) && isO(this.board[2][0]))) {} // player 2 wins!
      }
      

      for (let i = 0; i < 3; i++) {
        // horizontal
        if (this.board[i].every(isX)) {} // player 1 wins!
        if (this.board[i].every(isO)) {} // player 2 wins!

        // vertical
        if (isX(this.board[0][i]) && isX(this.board[1][i]) && isX(this.board[2][i])) {} // player 1 wins!
        if (isO(this.board[0][i]) && isO(this.board[1][i]) && isO(this.board[2][i])) {} // player 2 wins!
      }

      // check if board is full
      if (this.board.every((row: string[]) => row.every((val: string) => val === ""))) {} // draw!

      // switch player after click
    this.playerNum *= -1;
    }
    
  }


  constructor(@Inject(DOCUMENT) private document: Document) {
    // for now I'm storing all the user's details locally in a JSON file. We can implement a user database as a service later.
    this.userId = currentUserJson["userId"];
    this.playerNum = currentUserJson["playerNum"];
   }

   ngOnInit(): void {

  }
  

  

}
