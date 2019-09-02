import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  columns: string[];
  start: number = 5;
  end: number = 10;

  constructor( private userService: UserService) { }
  
  ngOnInit() {
    this.columns = this.userService.getColumns(this.start, this.end);
  }
  
  @Output() voted = new EventEmitter<number>();
 
  vote(s){
    this.voted.emit(s);
  }


  

}
