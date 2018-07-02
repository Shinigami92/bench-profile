import { GraphQLList, GraphQLObjectType } from 'graphql/type/definition';
import { GraphQLSchema } from 'graphql/type/schema';
import { Account, AccountType } from './account/account';
import { Computer, ComputerType } from './computer/computer';
import { Hardware, HardwareType } from './hardware/hardware';
import { Mainboard, MainboardType } from './hardware/mainboard';
import { NodeType } from './node';

export const schema: GraphQLSchema = new GraphQLSchema({
	types: [NodeType, AccountType, ComputerType, HardwareType, MainboardType],
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			accounts: {
				type: new GraphQLList(AccountType),
				resolve(): Account[] {
					const acc1: Account = new Account('Username1', 'user1@mail.com');
					const acc2: Account = new Account('Username2', 'user2@mail.com');
					const comp1: Computer = new Computer('PC1', acc1);
					acc1.computers.push(comp1);
					return [acc1, acc2];
				}
			},
			hardware: {
				type: new GraphQLList(HardwareType),
				resolve(): Hardware[] {
					const mobo1: Mainboard = new Mainboard('P8Z77-V DELUXE', new Date('2012-03-17'));
					mobo1.formfactor = 'ATX';
					mobo1.chipset = 'Z77';
					mobo1.socket = 'LGA 1155';
					mobo1.maximumSupportedMemory = { size: 32, type: 'GB' };
					return [mobo1];
				}
			}
		}
	})
});
