import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// export { };



/*
const prismaClientPropertyName = `__prevent-name-collision__prisma`;
type GlobalThisWithPrismaClient = typeof globalThis & {
	[prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = () => {
	if (process.env.NODE_ENV === `production`) {
		return new PrismaClient();
	} else {
		const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
		if (!newGlobalThis[prismaClientPropertyName]) {
			newGlobalThis[prismaClientPropertyName] = new PrismaClient();
		}
		return newGlobalThis[prismaClientPropertyName];
	}
};
const prisma = getPrismaClient(); */

export default prisma;
