import { GraphQLID } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLInterfaceType, GraphQLNonNull } from 'graphql/type/definition';

export abstract class Node {
	public readonly uuid: string;
	constructor(uuid?: string) {
		this.uuid = uuid
			? uuid
			: Math.random()
					.toString(16)
					.substring(2)
					.toUpperCase();
	}
}

export const nodeFields: GraphQLFieldConfigMap<any, any> = {
	uuid: { type: new GraphQLNonNull(GraphQLID) }
};

export const NodeType: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: Node.name,
	fields: (): GraphQLFieldConfigMap<any, any> => nodeFields
});
