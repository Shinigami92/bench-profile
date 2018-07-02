import { GraphQLBoolean, GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';
import { Computer, ComputerType } from '../computer/computer';
import { Node, nodeFields, NodeType } from '../node';

export class Account extends Node {
	public username: string;
	public email: string;
	public enabled: boolean = true;
	public birthdate: Date | null = null;
	public avatar: string | null = null;
	public skype?: string;
	public homepage?: string;
	public steam?: string;
	public facebook?: string;
	public twitter?: string;
	public discord?: string;

	public computers: Computer[] = [];

	// private password: string;

	constructor(username: string, email: string) {
		super();
		this.username = username;
		this.email = email;
	}
}

// tslint:disable-next-line:variable-name
export const AccountType: GraphQLObjectType = new GraphQLObjectType({
	name: Account.name,
	interfaces: [NodeType],
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		...nodeFields,
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		enabled: { type: new GraphQLNonNull(GraphQLBoolean) },
		skype: { type: GraphQLString },
		homepage: { type: GraphQLString },
		steam: { type: GraphQLString },
		birthdate: { type: GraphQLString },
		avatar: { type: GraphQLString },
		facebook: { type: GraphQLString },
		twitter: { type: GraphQLString },
		discord: { type: GraphQLString },
		computers: { type: new GraphQLNonNull(new GraphQLList(ComputerType)) }
	})
});
