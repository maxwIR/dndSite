import { Router, Request, Response } from 'express';
import { getCharacter } from '../characterManager/character';
import { getBody } from '../tools/requestUtil';
import { DBTool } from '../tools/dbTool';

const endpoint = 'https://dnd-cosmos-instance.documents.azure.com:443/';
const key = 'rUjF8GjpqSbmohszfS8C5pMNRlfIwPeOsN3k6wnc5xXTmtJyiFgdKCkEXVWq4yRt0dc8l4nYZkZI2ifZUjKZSg==';
const schemaName = 'dnd';
const campaignTableName = 'campaign';

const campaignDB = new DBTool(endpoint, key, schemaName, campaignTableName);

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

router.use('/new/campaign', async (req: Request, res: Response) => {
  let data = await getBody(req) as string;
  let item;
  try {
    item = JSON.parse(data);
  }catch (e) {
    console.error(e);
  }
  if (!(item.id && item.name)){
    res.send('Badly formed campaign');
    return;
  }
  let result = await campaignDB.putData(item);
  res.send(("result: " + result.statusCode + " for item " + JSON.stringify(item)));
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