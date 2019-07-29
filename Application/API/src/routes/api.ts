import { Router, Request, Response } from 'express';
import { getCharacter } from '../characterManager/character';
import { getBody } from '../tools/requestUtil';
import { DBTool } from '../tools/dbTool';

const endpoint = 'https://dnd-cosmos-instance.documents.azure.com:443/';
const key = 'rUjF8GjpqSbmohszfS8C5pMNRlfIwPeOsN3k6wnc5xXTmtJyiFgdKCkEXVWq4yRt0dc8l4nYZkZI2ifZUjKZSg==';
const schemaName = 'dnd';
const campaignTableName = 'campaign';
const characterTableName = 'character';

const campaignDB = new DBTool(endpoint, key, schemaName, campaignTableName);
const characterDB = new DBTool(endpoint, key, schemaName, characterTableName);

const router: Router = Router();

router.use('/character/:id', (req: Request, res: Response) => {
  var id = req.params.id;
  if(id){
    characterDB.get(id)
      .then((char) => {
        console.log("checking id " + JSON.stringify(char)); 
        res.send(JSON.stringify({
          character: char,
          exists: true,
        }));
      })
      .catch(e => {
        res.send(JSON.stringify({
          error: e,
          exists: false,
        }));
      });
  } else {
    res.send(new Error('No ID provided'));
  }
});

router.use('/campaign/all', async (req: Request, res: Response) => {
  let data = await campaignDB.getAll();
  //console.log(data.resources);
  res.send(JSON.stringify(data.resources.map(el => {return {"name": el.name, "id": el.id}})));
});

router.use('/campaign/new', async (req: Request, res: Response) => {
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

router.use('/character/new', async (req: Request, res: Response) => {
  let data = await getBody(req) as string;
  let item;
  try {
    item = JSON.parse(data);
  }catch (e) {
    console.error(e);
  }
  if (!(item.id && item.name && item.nickName)){
    res.send('Badly formed campaign');
    return;
  }
  let result = await characterDB.putData(item);
  res.send(("result: " + result.statusCode + " for item " + JSON.stringify(item)));
});

router.use('/', (req: Request, res: Response) => {
    console.log('in index');
      res.sendFile('basic.html', {root: __dirname+'/../../public'});
});

export const APIRouter: Router = router;