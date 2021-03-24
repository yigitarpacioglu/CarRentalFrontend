import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[]=[];
  currentColor:Color | null;
  filterText="";
  

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    })
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
    console.log(this.currentColor);
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){  
      return "list-group-item active bg-warning text-dark"
    }
    else{
      return "list-group-item"
    }
  }
  clearCurrentColor(){
    this.currentColor=null;
    
  }
}
