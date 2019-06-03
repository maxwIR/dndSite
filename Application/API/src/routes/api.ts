import { Router, Request, Response } from 'express';

const router: Router = Router();

router.use('/character/:id', (req: Request, res: Response) => {
  var id = req.params.id;
  if(id){
    res.send({id: id, name: "Kwothe", player: "Max"});
  }
    res.send(new Error('Character not found'));
});

router.use('/verify/:id', (req: Request, res: Response) => {
  var id = req.params.id;
  if(id){
    res.send(true);
  }
    res.send(false);
});

router.use('/', (req: Request, res: Response) => {
    console.log('in index');
      res.sendFile('basic.html', {root: __dirname+'/../../public'});
});

export const APIRouter: Router = router;