import { Router, Request, Response } from 'express';
import { getFeats } from '../tools/feats/filter';

const router: Router = Router();
router.use('/search', (req: Request, res: Response) => {
   let searchItem : any = {};
   Object.keys(req.query).forEach(key => {
      searchItem[key] = req.query[key];
   });
   const filtereFeats = getFeats(searchItem);
   
   res.send(filtereFeats);
});
router.use('/',  (req: Request, res: Response) => {
   res.sendFile('feats.json', {root: __dirname+'/../public'});
});

export const FeatsRouter: Router = router;