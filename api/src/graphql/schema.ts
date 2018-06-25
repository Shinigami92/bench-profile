import { GraphQLList, GraphQLObjectType } from 'graphql/type/definition';
import { GraphQLSchema } from 'graphql/type/schema';
import { Account, AccountType } from './account/account';

export const schema: GraphQLSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			accounts: {
				type: new GraphQLList(AccountType),
				resolve(): Account[] {
					const acc1: Account = new Account('Username1', 'user1@mail.com');
					const acc2: Account = new Account('Username2', 'user2@mail.com');
					return [acc1, acc2];
				}
			}
		}
	})
});
