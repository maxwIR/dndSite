import { Router, Request, Response } from 'express';

const router: Router = Router();
router.use('/', (req: Request, res: Response) => {
    console.log('in index');
      res.sendFile('basic.html', {root: __dirname+'/../public'});
});

export const IndexRouter: Router = router;