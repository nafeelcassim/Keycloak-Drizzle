import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ELASTIC_SEARCH_CONSTANTS } from './constants/constants';

console.log(ELASTIC_SEARCH_CONSTANTS.NODE);
@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        node: ELASTIC_SEARCH_CONSTANTS.NODE,
        auth: {
          apiKey: ELASTIC_SEARCH_CONSTANTS.API_KEY,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SearchModule {}
