//do service nest
import { Injectable } from '@nestjs/common';
import { Links, LinkResponse } from './interfaces/links.interface';
import { CreateLinksDto } from './dto/createLinks.dto';

@Injectable()
export class AppService {
    links:Links[] = [];
    
    create(param: CreateLinksDto){
        this.links.push({
            originalUrl: param.link,
            id: `${Math.random().toString(36).slice(2, 7)}`,
            valid: true,
            password: param.password,
            expiry: param.expiry ? new Date(param.expiry) : new Date(),
            clicks: 0
        });
    }
    getLinks(): LinkResponse[] {
        const links = this.links.map(link => {
            return {
                target: link.originalUrl,
                link: `http://localhost:3000/${link.id}`,
                valid: link.valid
            }
        })
        return links;
    }
    update(id: string){
        this.links.map(link => {
            if(link.id === id){
                link.valid = false;
            }
        });
    }
    stats(id: string){
        const element = this.links.find(link => link.id === id);
        if(element){
            return `Este enlace fue visitado: ${element.clicks}`;
        } else {
            return 0;
        }
    }
}
