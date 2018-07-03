import { GraphQLBoolean, GraphQLInt } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';

export class PageInfo {
	public totalCount: number;
	public currentPage: number;
	public hasPreviousPage: boolean;
	public hasNextPage: boolean;
	public totalPages: number;

	constructor(
		totalCount: number,
		currentPage: number,
		hasPreviousPage: boolean,
		hasNextPage: boolean,
		totalPages: number
	) {
		this.totalCount = totalCount;
		this.currentPage = currentPage;
		this.hasPreviousPage = hasPreviousPage;
		this.hasNextPage = hasNextPage;
		this.totalPages = totalPages;
	}
}

export const PageInfoType: GraphQLObjectType = new GraphQLObjectType({
	name: PageInfo.name,
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		totalCount: { type: new GraphQLNonNull(GraphQLInt) },
		currentPage: { type: new GraphQLNonNull(GraphQLInt) },
		hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
		hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
		totalPages: { type: new GraphQLNonNull(GraphQLInt) }
	})
});
