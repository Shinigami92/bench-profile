import { GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';
import { Computer, ComputerType } from '../computer/computer';
import { Connection, connectionFields, ConnectionType } from '../connection';
import { Edge, edgeFields, EdgeType } from '../edge';
import { Node, nodeFields, NodeType } from '../node';
import { PageInfo } from '../page-info';

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

	public computersConnection({ limit, offset }: { limit: number; offset: number }): AccountComputersConnection {
		if (limit < 1) {
			throw new Error('Limit must be greater than or equal to 1');
		}
		if (offset < 0) {
			throw new Error('Offset must be greater than or equal to 0');
		}
		const maxElements: number = this.computers.length;
		const currentPage: number = Math.ceil(offset / limit) + 1;
		const edges: AccountComputersEdge[] = this.computers
			.slice(offset, limit + offset)
			.map((computer: Computer) => new AccountComputersEdge(computer));
		const hasPreviousPage: boolean = offset > 0;
		const totalPages: number = Math.ceil(maxElements / limit);
		const hasNextPage: boolean = maxElements > limit + offset;
		const pageInfo: PageInfo = new PageInfo(maxElements, currentPage, hasPreviousPage, hasNextPage, totalPages);
		const connection: AccountComputersConnection = new AccountComputersConnection(pageInfo, edges);
		return connection;
	}
}

export class AccountComputersEdge extends Edge<Computer> {
	constructor(computer: Computer) {
		super(computer);
	}
}

export class AccountComputersConnection extends Connection<AccountComputersEdge> {
	constructor(pageInfo: PageInfo, edges: AccountComputersEdge[]) {
		super(pageInfo, edges);
	}
}

export const AccountComputersEdgeType: GraphQLObjectType = new GraphQLObjectType({
	name: AccountComputersEdge.name,
	interfaces: [EdgeType],
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		...edgeFields(ComputerType)
	}),
	isTypeOf: (value: Edge<Computer>): boolean => value instanceof AccountComputersEdge
});

export const AccountComputersConnectionType: GraphQLObjectType = new GraphQLObjectType({
	name: AccountComputersConnection.name,
	interfaces: [ConnectionType],
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		...connectionFields(AccountComputersEdgeType)
	}),
	isTypeOf: (value: Connection<Edge<Node>>): boolean => value instanceof AccountComputersConnection
});

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
		computers: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ComputerType))) },
		computersConnection: {
			args: {
				limit: { type: GraphQLInt, defaultValue: 50 },
				offset: { type: GraphQLInt, defaultValue: 0 }
			},
			type: new GraphQLNonNull(AccountComputersConnectionType)
		}
	})
});
