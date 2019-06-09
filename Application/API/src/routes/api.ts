import { Router, Request, Response } from 'express';
import { getCharacter } from '../characterManager/character';

const router: Router = Router();

router.use('/character/:id', (req: Request, res: Response) => {
  var id = req.params.id;
  if(id){
    getCharacter(id).then((char) => res.send(JSON.stringify(char)));
  } else {
    res.send(new Error('Character not found'));
  }
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