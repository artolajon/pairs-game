import { ThrowStmt } from '@angular/compiler';
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
  hint = Array<number>();

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
    this.hint=[];
    if (!this.list[index].visible)
      return;

    if (this.selected != null && this.options){
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
    let opcion = this.searchSameTypeUp(index);
    if (opcion>=0){
      this.options.push(opcion);
    }
    opcion = this.searchSameTypeBackward(index);
    if (opcion>=0){
      this.options.push(opcion);
    }
    opcion = this.searchSameTypeForward(index);
    if (opcion>=0){
      this.options.push(opcion);
    }
    opcion = this.searchSameTypeDown(index);
    if (opcion>=0){
      this.options.push(opcion);
    }
  }

  searchSameTypeUp(selected: number): number{
    let selectedCell = this.list[selected];
    let loopStart = selected - LINE_LENGTH;
    let isForward = false;
    let step = -LINE_LENGTH;

    let index = this.searchSameType(selectedCell, loopStart, isForward, step);
    return index;
  }


  searchSameTypeBackward(selected: number): number{
    let selectedCell = this.list[selected];
    let loopStart = selected - 1;
    let isForward = false;
    let step = -1;

    let index = this.searchSameType(selectedCell, loopStart, isForward, step);
    return index;

  }

  searchSameTypeForward(selected: number): number{
    let selectedCell = this.list[selected];
    let loopStart = selected + 1;
    let isForward = true;
    let step = 1;

    let index = this.searchSameType(selectedCell, loopStart, isForward, step);
    return index;
  }

  searchSameTypeDown(selected: number): number{

    let selectedCell = this.list[selected];
    let loopStart = selected + LINE_LENGTH;
    let isForward = true;
    let step = LINE_LENGTH;

    let index = this.searchSameType(selectedCell, loopStart, isForward, step);
    return index;
  }

  searchSameType(selectedCell: Cell, loopStart: number, isForward: boolean, step: number): number{
    let i = loopStart;

    while(isForward? i < this.list.length : i >= 0){
      let cell2 = this.list[i];

      if (cell2.visible){
        if (selectedCell.type == cell2.type){
          return i;
        }
        return -1;
      }

      i = i + step;
    }
    return -1;
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

      line.forEach(cell => cell.isBeingDeleted = true);
      setTimeout(() => {
        this.list.splice(lineStart, LINE_LENGTH);
      }, 500);

    }
  }

  giveHint(){
    for (let i = 0; i < this.list.length; i++) {
      if(this.list[i].visible){
        let option = this.searchSameTypeForward(i);
        if (option>=0){
          this.hint = [i, option];
          break;
        }
        option = this.searchSameTypeDown(i);
        if (option>=0){
          this.hint = [i, option];
          break;
        }
      }
    }
  }



}
