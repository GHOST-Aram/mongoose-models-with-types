import { HydratedDocument, Model, Schema, model } from "mongoose"

interface Icomputer{
    manufacturer: string,
    model_name: string
    model_number: string
    serial_number: string
    year_made: number
}

interface ComputerMethods{
    getFullName:()=>string
}
interface ComputerVirtuals{
    age: number
}

type ComputerModel = Model<Icomputer, {},ComputerMethods,ComputerVirtuals>

const computerSchema: Schema = new Schema
    <Icomputer,ComputerModel,ComputerMethods,{},ComputerVirtuals>({
    manufacturer: String,
    model_name: String,
    model_number: String,
    serial_number: String,
    year_made: Number
})

computerSchema.method('getFullName', function():string {
    return `${this.manufacturer} ${this.model_name} ${this.model_number}`
})
computerSchema.virtual('age').get(function():number{
    return new Date().getFullYear() - this.year_made
})

const Computer = model<Icomputer,ComputerModel>(
    'Computer', computerSchema) 
type HydratedComputerDocument = 
HydratedDocument<Icomputer, ComputerVirtuals & ComputerMethods>

const desktop:HydratedComputerDocument = new Computer({
    year_made: 2002,
    model_name: 'P40',
    serial_number: '54385yuhefewy8rwhwu',
    manufacturer: 'Lenovo',
    model_number: 'rxd 456'
}) 

console.log(desktop.age, " years")
console.log(desktop.model_name)
console.log(desktop.manufacturer)
console.log(desktop.id)
console.log(desktop.__v)
console.log(desktop._id)
console.log("Full Name :",desktop.getFullName())