import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/cell';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  list=Array<Cell>();

  selected?: number;
  options?: number[];

  constructor() { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame(){
    this.resetBoard();
  }

  resetBoard(){
    this.list = Array<Cell>();
    for (let i = 0; i < 20; i++) {
      this.list.push(new Cell());
    }
  }

  selectCell(index: number){
    if (!this.list[index].visible)
      return;

    if (this.selected && this.options){
      let option = this.options.find(p=> p == index);
      if (option != null){
        this.list[this.selected].visible=false;
        this.list[option].visible=false;
      }
      this.selected = undefined;
      this.options = undefined;
    }else{
      this.selected = index;
      this.optionsAround(index);
    }


  }

  optionsAround(index: number){
    this.options =new Array<number>();
    this.checkUp(index);
    this.checkBack(index);
    this.checkNext(index);
    this.checkDown(index);
  }

  checkUp(selected: number){
    for(let i = selected - 9; i >= 0; i -= 9){
      let done = this.check(selected, i);
      if (done)
        break;
    }
  }


  checkBack(selected: number){
    for(let i = selected - 1; i >= 0; i--){
      let done = this.check(selected, i);
      if (done)
        break;
    }
  }

  checkNext(selected: number){
    for(let i = selected + 1; i < this.list.length; i++){
      let done = this.check(selected, i);
      if (done)
        break;
    }
  }

  checkDown(selected: number){
    for(let i = selected + 9; i < this.list.length; i += 9){
      let done = this.check(selected, i);
      if (done)
        break;
    }
  }

  check(principal: number, secondary: number): boolean{
    let cell1= this.list[principal]
    let cell2 = this.list[secondary];

    if (cell2.visible){
      if (cell1.type == cell2.type){
        this.options?.push(secondary);
      }
      return true;
    }
    return false;
  }

  addPairs(){
    this.list.filter(c=> c.visible).forEach(cell => {
      this.list.push(new Cell(cell.type))
    });
  }



}
