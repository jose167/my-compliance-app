import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  users: User[];
  columns: string[];
  labels: string[];
  start: number = 0;
  end: number = 5;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    
    this.getUsers();

    this.columns = this.userService.getColumns(this.start, this.end); 

    this.labels = this.userService.getJsonLabels();
     
  }
  getUsers():void {
    this.userService.getUser()
    .subscribe(users => this.users = users,
     error => console.log("Error: ", error),
     () => this.onSelect(this.users[0])
    );
  }

  selectedUser: User;
  onSelect(user: User): void{
    this.selectedUser = user;
  }

  onVoted(id){
    var found = this.users.find(function(e) {
      return e.id == id;
    });
    found.vote++;
  }

 

}
