import { Injectable } from '@nestjs/common';

import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  async create() {
    const res = this.elasticSearchService.indices.create({
      index: 'test',
    });
    return res;
  }

  findAll() {
    return `This action returns all search`;
  }

  findOne() {
    return `This action returns  search`;
  }

  update() {
    return `This action updates a search`;
  }

  remove() {
    return `This action removes  search`;
  }
}
