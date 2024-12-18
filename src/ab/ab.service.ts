import { Injectable } from '@nestjs/common';

@Injectable()
export class AbService {
    private users=[]
    add(user){
      this.users.push(user);
      return {message: "inside add method"}
    }
    spec(name){
      return this.users.find((user)=>user.name=name)||
      {message: "data not found"}
    }
    showAll(){
     return this.users;
    }
}
