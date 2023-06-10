import { Injectable } from '@nestjs/common'
import { Client } from '@elastic/elasticsearch'
import { Todo } from '../graphql.schema'
import { ElasticSearchConfig } from '../../elasticsearch.config'

@Injectable()
export class ElasticsearchService {
    private readonly client: Client

    constructor() {
        this.client = new Client({ node: ElasticSearchConfig.node })
    }

    async createDocument(todo: Todo): Promise<void> {
        await this.client.index({
            index: ElasticSearchConfig.index,
            body: todo,
        })
    }
}
