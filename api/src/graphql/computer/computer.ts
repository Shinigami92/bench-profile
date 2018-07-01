import { GraphQLID, GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';
import { Account, AccountType } from '../account/account';

export class Computer {
	public readonly uuid: string;
	public name: string;

	public description: string;

	public owner: Account;

	constructor(name: string, owner: Account, description: string = '') {
		this.uuid = Math.random()
			.toString(16)
			.substring(2)
			.toUpperCase();
		this.name = name;
		this.owner = owner;
		this.description = description;
	}
}

// tslint:disable-next-line:variable-name
export const ComputerType: GraphQLObjectType = new GraphQLObjectType({
	name: Computer.name,
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		uuid: { type: new GraphQLNonNull(GraphQLID) },
		name: { type: new GraphQLNonNull(GraphQLString) },
		owner: { type: new GraphQLNonNull(AccountType) },
		description: { type: new GraphQLNonNull(GraphQLString) }
	})
});
