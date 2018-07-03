import { GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLObjectType } from 'graphql/type/definition';
import { NodeType } from '../node';
import { Hardware, hardwareFields, HardwareType } from './hardware';

export class Mainboard extends Hardware {
	public socket?: string;
	public chipset?: string;
	public formfactor?: string;
	public maximumSupportedMemory?: { size: number; type: 'GB' };
	constructor(name: string, releaseDate: Date) {
		super(name, releaseDate);
	}
}

export const MainboardType: GraphQLObjectType = new GraphQLObjectType({
	name: Mainboard.name,
	interfaces: [NodeType, HardwareType],
	fields: (): GraphQLFieldConfigMap<any, any> => ({
		...hardwareFields,
		socket: { type: GraphQLString },
		chipset: { type: GraphQLString },
		formfactor: { type: GraphQLString },
		maximumSupportedMemory: {
			type: GraphQLString,
			resolve(mainboard: Mainboard): string | null {
				return mainboard.maximumSupportedMemory
					? `${mainboard.maximumSupportedMemory.size} ${mainboard.maximumSupportedMemory.type}`
					: null;
			}
		}
	}),
	isTypeOf: (value: Hardware): boolean => value instanceof Mainboard
});
