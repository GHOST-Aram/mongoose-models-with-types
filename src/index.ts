import { 
    HydratedDocument, 
    Model, 
    Schema, 
    Types, 
    model 
} from "mongoose";

interface IChild{
    name: string
    age: number,
    // Types from document interface
    friends: Types.ObjectId[]
    electra: string
}
const ChildSchema = new Schema<IChild>({
    name: String,
    age: Number,
    // Types from Schema
    friends: [Schema.Types.ObjectId],
    electra: String
})

const Child: Model<IChild> = model<IChild>('Child', ChildSchema)

const child: HydratedDocument<IChild> = new Child({
    name: 'John',
    age: 44
})

const get = (doc: HydratedDocument<IChild>): string =>{
    doc.__v
    return doc.id
}
const l = get(child)
console.log(l)


