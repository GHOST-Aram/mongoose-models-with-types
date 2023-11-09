import mongoose, { HydratedDocument } from "mongoose"

interface IUser{
    first_name: string
    last_name:string
    email: string
}

/**
 * IUserMethods defines custom instance methods 
 * that the user schema should implement
 */
interface IUserMethods{
    full_name:() => string,
    to_string: () => string
}
/**
 * UserModel Types derived from generic class Model
 * 
 * First parameter - Raw Document Interface - The interface that
 * defines the shape of User Schema. Dictates what fields should
 * be present in the User schema.
 * 
 * Second parameter - Custom Query Helpers filled by 
 * empty object {} as place holder. 
 * Because we don't want to define any
 * 
 * Third parameter - Instance methods Interface - The interface
 *  that that defines the custom instance methods that 
 * the User model in suppossed to implement
 */
type UserModel = mongoose.Model<IUser,{}, IUserMethods>


const userSchema: mongoose.Schema = new mongoose.Schema<
IUser, UserModel, IUserMethods>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}) 

userSchema.method('full_name', function(){
    return `${this.first_name} ${this.last_name}`
})

userSchema.method('to_string', function(){
    return `Name: ${this.full_name()}  email: ${this.email}`
})

const User: UserModel = mongoose.model<IUser, UserModel>(
'User', userSchema) 

type HydratedUserDoc = HydratedDocument<IUser, IUserMethods>

const user: HydratedUserDoc = new User({
    first_name: 'Erick',
    last_name: 'Bret',
    email: 'erickbret@gmail.com',
})

const fullName = user.full_name()


const identify = (doc: HydratedUserDoc) =>{

    // You can access all document properties 
    // and instance methods by including their interfaces as Generics
    // In the HydratedDocument Type
    console.log(doc.full_name(),
    doc.to_string(),
    doc.last_name,
    doc.first_name)
}

identify(user)