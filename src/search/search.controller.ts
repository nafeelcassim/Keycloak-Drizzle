import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  create() {
    return this.searchService.create();
  }

  @Get()
  findAll() {
    return this.searchService.findAll();
  }

  @Get(':id')
  findOne() {
    return this.searchService.findOne();
  }

  @Patch(':id')
  update() {
    return this.searchService.update();
  }

  @Delete(':id')
  remove() {
    return this.searchService.remove();
  }
}
