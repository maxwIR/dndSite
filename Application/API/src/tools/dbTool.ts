import { CosmosClient, CosmosClientOptions, Container } from "@azure/cosmos";

export class DBTool {
    cosmos: CosmosClient;
    container: Container;
    constructor(endpoint: string, key: string, dbName: string, containerName: string){
        let opts = {endpoint, key} as CosmosClientOptions;
        this.cosmos = new CosmosClient(opts);
        this.container = this.cosmos.database(dbName).container(containerName);
    }
    putData(data: any){
        let item = data;
        if (item.id && item.id.length > 2){
            item.shortid = item.id.substring(0,2);
        }
        let promise = this.container.items.create(item);
        return promise;
    }
    getAll() {
        let it = this.container.items.readAll();
        return it.fetchAll();
    }
    get(id:string) {
        let it = this.container.items.query(`SELECT * from ${this.container.id} WHERE id = ${id}`);
        return it.fetchAll();
    }
}