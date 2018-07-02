import { Request, Response } from 'express';

import app from './app';

const PORT: number = 3000;

app.get('/', (_req: Request, res: Response) => {
	res.json({ test: 'Test' });
});

app.listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}`);
	console.info(`http://localhost:${PORT}`);
	console.info(`http://localhost:${PORT}/graphql`);
});
