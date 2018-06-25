import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';

export class Account {
	public readonly uuid: string;
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

	// private password: string;

	constructor(username: string, email: string) {
		this.uuid = Math.random()
			.toString(16)
			.substring(2)
			.toUpperCase();
		this.username = username;
		this.email = email;
	}
}

// tslint:disable-next-line:variable-name
export const AccountType: GraphQLObjectType = new GraphQLObjectType({
	name: Account.name,
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		uuid: { type: new GraphQLNonNull(GraphQLID) },
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
		discord: { type: GraphQLString }
	})
});
