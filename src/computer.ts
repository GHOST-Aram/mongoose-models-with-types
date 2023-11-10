import mongoose from "mongoose"

interface IComputer{
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

type ComputerModel = mongoose.Model<
IComputer, {},ComputerMethods,ComputerVirtuals>

const computerSchema: mongoose.Schema = new mongoose.Schema<
IComputer,ComputerModel,ComputerMethods,{},ComputerVirtuals>({
    manufacturer: {
        type: String,
        required: true
    },
    model_name: {
        type: String,
        required: true
    },
    model_number: {
        type: String,
        required: true
    },
    serial_number: {
        type: String,
        required: true
    },
    year_made: {
        type: Number,
        required: true
    },
    
})

const Computer = mongoose.model<IComputer,ComputerModel>(
    'Computer', computerSchema) 
computerSchema.method('getFullName', function():string {
    return `${this.manufacturer} ${this.model_name} ${this.model_number}`
})
computerSchema.virtual('age').get(function():number{
    return new Date().getFullYear() - this.year_made
})



type HydratedComputerDoc = mongoose.HydratedDocument<
IComputer, ComputerVirtuals & ComputerMethods>


//Create an instance of Computer Document
// The Computer Model returns a HydratedDocument
const desktop = new Computer({
    year_made: 2002,
    model_name: 'P40',
    serial_number: '54385yuhefewy8rwhwu',
    manufacturer: 'Lenovo',
    model_number: 'rxd 456',

}) 

console.log(desktop.age, " years")
console.log(desktop.model_name)
console.log(desktop.manufacturer)
console.log(desktop.id)
// console.log(desktop.__v)
console.log(desktop._id)
console.log("Full Name :",desktop.getFullName())