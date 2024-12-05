import {MongoClient, WithId, Collection, InsertOneResult, OptionalUnlessRequiredId} from "mongodb";
import {Document} from "mongodb";

const uri: string = process.env.MONGO_URI as string;
const def_dbName: string = process.env.MONGO_DBNAME as string;
const def_collectionName: string = 'article_data'
export async function create<T extends Document>(data: T, dbName?: string, collectionName?: string, options?: object) : Promise<boolean> {
    if(!data) {
        console.log('put data on argument')
        return false
    }else {
        const D: string = !(dbName == undefined) ? dbName : def_dbName
        const C: string = !(collectionName == undefined) ? collectionName : def_collectionName

        const client: MongoClient = await MongoClient.connect(uri, options)
        const col: Collection<T> = client.db(D).collection<T>(C)
        const doc: InsertOneResult<T> = await  col.insertOne(data as OptionalUnlessRequiredId<T>)
        return doc.acknowledged
    }
}

export async function read<T extends Document>(filter?: T, dbName?: string, collectionName?: string, options?: object) {
    const D: string = !(dbName == undefined) ? dbName : def_dbName
    const C: string = !(collectionName == undefined) ? collectionName : def_collectionName
    const filter_condition: any = {};

    if (filter !== undefined) {
        for (const key in filter) {
            if (filter[key] !== undefined) {
                filter_condition[key] = filter[key];
            }
        }
    }


    const client: MongoClient = await MongoClient.connect(uri, options)
    const col: Collection<T> = client.db(D).collection<T>(C)
    const data: WithId<T>[] = await col.find<WithId<T>>(filter_condition).toArray()
    return data
}

export async function update<T extends Document>(data: T, filter: object, dbName?: string, collectionName?: string, options?: object){
    if(!data){
        console.log('put data on argument')
        return false
    }
    const D: string = !(dbName == undefined) ? dbName : def_dbName
    const C: string = !(collectionName == undefined) ? collectionName : def_collectionName

    const client: MongoClient = await MongoClient.connect(uri, options)
    const col: Collection<T> = client.db(D).collection<T>(C)
    const doc = await  col.updateOne(filter, data, options)
    return doc.acknowledged

}

export async function count(dbName?: string, collectionName?: string, options?: object){
    const D: string = !(dbName == undefined) ? dbName : def_dbName
    const C: string = !(collectionName == undefined) ? collectionName : def_collectionName


    const client: MongoClient = await MongoClient.connect(uri, options)
    const col = client.db(D).collection(C)
    return col.countDocuments()
}