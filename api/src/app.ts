import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const schema: GraphQLSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			hello: {
				type: GraphQLString,
				resolve(): string {
					return 'world';
				}
			}
		}
	})
});

class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
	}

	private config(): void {
		// support application/json type post data
		this.app.use(bodyParser.json());
		// support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }));
		// support graphql
		this.app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
	}
}

export default new App().app;
