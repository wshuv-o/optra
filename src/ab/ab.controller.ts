import { Body, Controller, Get, Param } from '@nestjs/common';
import { AbService } from './ab.service';
import { Post } from '@nestjs/common';
@Controller('ab')
export class AbController {
    constructor(private readonly abService: AbService) {

    }
    @Get()
    getABfunction(){
        return "from controller AB"
    }
    @Get("/add")
    AddUser(@Body() data){
      return this.abService.add(data);
     
    }

    @Post("/showuser:name")
    ShowUser(@Param() name){
        return this.abService.spec(name)
    }

    @Get("/showAll")
    showAll(){
        return this.abService.showAll();
        
    }
}
