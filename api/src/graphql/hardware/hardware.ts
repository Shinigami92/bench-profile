import { GraphQLString } from 'graphql/index';
import { GraphQLFieldConfigMap, GraphQLInterfaceType, GraphQLNonNull } from 'graphql/type/definition';
import { Node, nodeFields } from '../node';

export abstract class Hardware extends Node {
	public name: string;
	public releaseDate: Date;
	constructor(name: string, releaseDate: Date) {
		super();
		this.name = name;
		this.releaseDate = releaseDate;
	}
}

export const hardwareFields: GraphQLFieldConfigMap<any, any> = {
	...nodeFields,
	name: { type: new GraphQLNonNull(GraphQLString) },
	releaseDate: {
		type: new GraphQLNonNull(GraphQLString),
		resolve(hardware: Hardware): string {
			return hardware.releaseDate.toISOString().substring(0, 10);
		}
	}
};

// tslint:disable-next-line:variable-name
export const HardwareType: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: Hardware.name,
	fields: (): GraphQLFieldConfigMap<any, any> => hardwareFields
});
