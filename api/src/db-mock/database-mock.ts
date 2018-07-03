import { Account } from '../graphql/account/account';
import { Computer } from '../graphql/computer/computer';
import { Hardware } from '../graphql/hardware/hardware';
import { Mainboard } from '../graphql/hardware/mainboard';

export const ACCOUNTS: Account[] = [];
export const COMPUTERS: Computer[] = [];
export const MAINBOARDS: Mainboard[] = [];
export const HARDWARE: Hardware[] = [];

for (let i: number = 0; i < 50; i++) {
	const acc: Account = new Account(`Username${i}`, `user${i}@mail.com`);
	ACCOUNTS.push(acc);
}

for (const owner of ACCOUNTS) {
	for (let j: number = 0; j < 8; j++) {
		const comp: Computer = new Computer(`PC-${j}`, owner);
		owner.computers.push(comp);
		COMPUTERS.push(comp);
	}
}

const mobo1: Mainboard = new Mainboard('P8Z77-V DELUXE', new Date('2012-03-17'));
mobo1.formfactor = 'ATX';
mobo1.chipset = 'Z77';
mobo1.socket = 'LGA 1155';
mobo1.maximumSupportedMemory = { size: 32, type: 'GB' };

MAINBOARDS.push(mobo1);

HARDWARE.push(...MAINBOARDS);
