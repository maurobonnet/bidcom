//do controller nest
import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LinkResponse, Links } from './interfaces/links.interface';
import { CreateLinksDto } from './dto/createLinks.dto';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}
    @Get("/get")
    getLinks(): LinkResponse[] {
        return this.appService.getLinks();
    }
    @Get("/:id")
    redirect(@Param("id") id: string, @Res() res, @Query("password") password: string) {
        const element = this.appService.links.find(link => link.id === id);
        if(element){
            if(element.expiry < new Date()) return res.status(500).json({message: "Este link expiró"});
            if(!element.valid) return res.status(404);
            if(element.password && password !== element.password) return res.status(500).json({message: "Contrasenya incorrecta"});
            this.appService.links.map(link => link.clicks = link.clicks + 1);
            res.redirect(this.appService.links.find(link => link.id === id).originalUrl);
        } else {
            res.status(500).json({message: "error"});
        }
    }
    @Get("/:id/stats")
    stats(@Param("id") id: string) {
        return this.appService.stats(id);
    }
    @Post("/create")
    create(@Body() param: CreateLinksDto, @Query("password") password: string): LinkResponse[] {
        if(password) param.password = password;
        this.appService.create(param);
        return this.appService.getLinks();
    }
    @Put("/:id")
    update(@Param("id") id: string, @Body() param: CreateLinksDto) {
        this.appService.update(id);
        return this.appService.getLinks();
    }
}