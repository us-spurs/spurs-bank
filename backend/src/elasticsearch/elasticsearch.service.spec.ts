import { ElasticsearchService } from './elasticsearch.service';
import { Client } from '@elastic/elasticsearch';
import { Todo } from '../graphql.schema';
import { ElasticSearchConfig } from '../../elasticsearch.config';

jest.mock('@elastic/elasticsearch');

describe('ElasticsearchService', () => {
  let elasticsearchService: ElasticsearchService;
  let elasticsearchClient: Client;

  beforeEach(() => {
    elasticsearchClient = new Client();
    elasticsearchService = new ElasticsearchService(elasticsearchClient);
  });

  describe('createDocument', () => {
    it('should create a document in Elasticsearch', async () => {
      const todo: Todo = { id: '1', title: 'Test Todo', description: 'Test Description' };

      await elasticsearchService.createDocument(todo);

      expect(elasticsearchClient.index).toHaveBeenCalledWith({
        index: ElasticSearchConfig.index,
        body: todo,
      });
    });
  });

  // Add more test cases for other Elasticsearch operations
});
