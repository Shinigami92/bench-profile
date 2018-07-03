import { GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';
import { Account, AccountType } from '../account/account';
import { Node, nodeFields, NodeType } from '../node';

export class Computer extends Node {
	public name: string;

	public description: string;

	public owner: Account;

	constructor(name: string, owner: Account, description: string = '') {
		super();
		this.name = name;
		this.owner = owner;
		this.description = description;
	}
}

export const ComputerType: GraphQLObjectType = new GraphQLObjectType({
	name: Computer.name,
	interfaces: [NodeType],
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		...nodeFields,
		name: { type: new GraphQLNonNull(GraphQLString) },
		owner: { type: new GraphQLNonNull(AccountType) },
		description: { type: new GraphQLNonNull(GraphQLString) }
	})
});
