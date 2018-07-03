import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql/type/definition';
import { GraphQLSchema } from 'graphql/type/schema';
import { ACCOUNTS, HARDWARE } from '../db-mock/database-mock';
import { Account, AccountComputersConnectionType, AccountComputersEdgeType, AccountType } from './account/account';
import { ComputerType } from './computer/computer';
import { ConnectionType } from './connection';
import { EdgeType } from './edge';
import { Hardware, HardwareType } from './hardware/hardware';
import { MainboardType } from './hardware/mainboard';
import { NodeType } from './node';

export const schema: GraphQLSchema = new GraphQLSchema({
	types: [
		NodeType,
		EdgeType,
		ConnectionType,
		AccountType,
		AccountComputersEdgeType,
		AccountComputersConnectionType,
		ComputerType,
		HardwareType,
		MainboardType
	],
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			accounts: {
				type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AccountType))),
				resolve(): Account[] {
					return ACCOUNTS;
				}
			},
			hardware: {
				type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(HardwareType))),
				resolve(): Hardware[] {
					return HARDWARE;
				}
			}
		}
	})
});
