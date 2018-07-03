import {
	GraphQLFieldConfigMap,
	GraphQLInterfaceType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType
} from 'graphql/type/definition';
import { Edge, EdgeType } from './edge';
import { Node } from './node';
import { PageInfo, PageInfoType } from './page-info';

export abstract class Connection<T extends Edge<Node>> {
	public pageInfo: PageInfo;
	public edges: T[];

	constructor(pageInfo: PageInfo, edges: T[]) {
		this.pageInfo = pageInfo;
		this.edges = edges;
	}
}

export function connectionFields(edgeType: GraphQLObjectType): GraphQLFieldConfigMap<any, any> {
	return {
		pageInfo: { type: new GraphQLNonNull(PageInfoType) },
		edges: { type: new GraphQLList(edgeType) }
	};
}

export const ConnectionType: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: Connection.name,
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		pageInfo: { type: new GraphQLNonNull(PageInfoType) },
		edges: { type: new GraphQLList(EdgeType) }
	})
});
