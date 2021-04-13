import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/cell';

const LINE_LENGTH = 9;
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
        this.checkLines(this.selected, option);
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
    for(let i = selected - LINE_LENGTH; i >= 0; i -= LINE_LENGTH){
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
    for(let i = selected + LINE_LENGTH; i < this.list.length; i += LINE_LENGTH){
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


  checkLines(cell1: number, cell2: number){
    let line1Start = cell1 - cell1 % LINE_LENGTH;
    let line2Start = cell2 - cell2 % LINE_LENGTH;
    if (line1Start == line2Start){
      this.checkLine(line1Start);
    }else{
      let smallest = line1Start < line2Start ? line1Start : line2Start;
      let biggest = line1Start > line2Start ? line1Start : line2Start;
      this.checkLine(biggest);
      this.checkLine(smallest);
    }

  }


  checkLine(lineStart: number){
    let lineEnd = lineStart + LINE_LENGTH;
    let line = this.list.slice(lineStart, lineEnd);
    if (!line.some(c=> c.visible)){
      this.list.splice(lineStart, LINE_LENGTH);
    }
  }

  hint(){

  }



}
