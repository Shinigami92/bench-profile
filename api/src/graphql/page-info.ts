import { GraphQLBoolean, GraphQLInt } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';

export class PageInfo {
	public hasNextPage: boolean;
	public totalCount: number;

	constructor(hasNextPage: boolean, totalCount: number) {
		this.hasNextPage = hasNextPage;
		this.totalCount = totalCount;
	}
}

export const PageInfoType: GraphQLObjectType = new GraphQLObjectType({
	name: PageInfo.name,
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
		totalCount: { type: new GraphQLNonNull(GraphQLInt) }
	})
});
