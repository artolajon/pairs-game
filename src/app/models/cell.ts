export class Cell {
  type: number = 0;
  visible: boolean = true;
  isBeingDeleted: boolean = false;
  constructor(type?: number){
    if (type != undefined){
      this.type = type;
    }else{
      this.type = Math.floor(Math.random() * 5);
    }

  }
}
