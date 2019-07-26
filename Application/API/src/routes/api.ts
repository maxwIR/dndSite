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

router.use('/campaign/:id', (req: Request, res: Response) => {
  res.send("Not implemented yet");
});

router.use('/new/campaign', (req: Request, res: Response) => {
  let data = JSON.stringify(req)
  console.log(data);
  res.send(("Not implemented yet. Recieved: " + data));
});

router.use('/new/character', (req: Request, res: Response) => {
  res.send("Not implemented yet");
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