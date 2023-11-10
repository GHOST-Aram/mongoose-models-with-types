import mongoose from "mongoose";

/**
 * Use mongoose.Types.ObjectID when defining a document interface
 * and mongoose.Schema.Types.ObjectId when  defining the document
 * Schema
 */
interface IChild{
    name: string
    age: number,
    //mongoose.Types.ObjectId - creates ObjectIds
    friends: mongoose.Types.ObjectId[]
    electra: string
}

type ChildModel = mongoose.Model<IChild>

const ChildSchema: mongoose.Schema = new mongoose.Schema<IChild, ChildModel>({
    name: String,
    age: Number,
    // Types from Schema -> Does not create ObjectID but serves
    // Only as a path configuration type
    // You can also use mongoose.ObjectID
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        
    },
    electra: {
        type: String, 
        lowercase: true, 
        required: true
    }
})

const Child: ChildModel  = mongoose.model<
IChild, ChildModel>('Child', ChildSchema)

//Create custom type representing to 
//avoid typing long statements several times
type HydrateChildDoc = mongoose.HydratedDocument<IChild>

const child  = new Child({
    name: 'John',
    age: 44,
    elvis:67
})



const get = (doc: HydrateChildDoc): string =>{
    doc.__v
    doc.age
    doc.name
    return doc.id
}

const l = get(child)
console.log(l)


