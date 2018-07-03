import { GraphQLBoolean, GraphQLInt } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';
import { Connection } from './connection';
import { Edge } from './edge';
import { Node } from './node';

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

export class Factory {
	public create<T>(type: new (...args: any[]) => T, ...args: any[]): T {
		return new type(...args);
	}
}

export function paginateConnection<T extends Node, E extends Edge<T>, C extends Connection<E>>(
	maxElements: number,
	subElements: T[],
	{ limit, offset }: { limit: number; offset: number },
	edgeClass: new (element: T) => E,
	connectionClass: new (pageInfo: PageInfo, edges: E[]) => C
): C {
	if (limit < 1) {
		throw new Error('Limit must be greater than or equal to 1');
	}
	if (offset < 0) {
		throw new Error('Offset must be greater than or equal to 0');
	}
	const factory: Factory = new Factory();
	const currentPage: number = Math.ceil(offset / limit) + 1;
	const edges: E[] = subElements.map((element: T) => factory.create<E>(edgeClass, element));
	const hasPreviousPage: boolean = offset > 0;
	const totalPages: number = Math.ceil(maxElements / limit);
	const hasNextPage: boolean = maxElements > limit + offset;
	const pageInfo: PageInfo = new PageInfo(maxElements, currentPage, hasPreviousPage, hasNextPage, totalPages);
	const connection: C = factory.create<C>(connectionClass, pageInfo, edges);
	return connection;
}
