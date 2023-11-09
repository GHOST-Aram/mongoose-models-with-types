import mongoose from "mongoose";

interface IChild{
    name: string
    age: number,
    // Types from document interface
    friends: mongoose.Types.ObjectId[]
    electra: string
}

type ChildModel = mongoose.Model<IChild>

const ChildSchema: mongoose.Schema = new mongoose.Schema<IChild, ChildModel>({
    name: String,
    age: Number,
    // Types from Schema
    friends: [mongoose.Schema.Types.ObjectId],
    electra: String
})

const Child: ChildModel  = mongoose.model<
IChild, ChildModel>('Child', ChildSchema)

//Create custom type representing to 
//avoid typing long statements several times
type HydrateChildDoc = mongoose.HydratedDocument<IChild>

const child: HydrateChildDoc  = new Child({
    name: 'John',
    age: 44
})

const get = (doc: HydrateChildDoc): string =>{
    doc.__v
    return doc.id
}

const l = get(child)
console.log(l)


