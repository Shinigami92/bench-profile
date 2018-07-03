import {
	GraphQLFieldConfigMap,
	GraphQLInterfaceType,
	GraphQLNonNull,
	GraphQLObjectType
} from 'graphql/type/definition';
import { Node, NodeType } from './node';

export abstract class Edge<T extends Node> {
	public node: T;
	constructor(node: T) {
		this.node = node;
	}
}

export function edgeFields(nodeType: GraphQLObjectType): GraphQLFieldConfigMap<any, any> {
	return {
		node: { type: new GraphQLNonNull(nodeType) }
	};
}

export const EdgeType: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: Edge.name,
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		node: { type: new GraphQLNonNull(NodeType) }
	})
});
