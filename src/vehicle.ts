import { HydratedDocument, Model, Schema, model } from "mongoose"

interface IVehicle {
    manufacturer: string,
    model: string
    milage:number
    chasis_number: number
    year_of_assembly: number
    year_of_sale: number
    initialValue: number
}

interface IVehicleMethods{
    calculateDepreciationRate:(currentValue: number) => number
}

interface IVehicleVirtuals{
    age:number
}
type VehicleModel = Model<IVehicle, {}, IVehicleMethods, IVehicleVirtuals>

const vehicleSchema:Schema = new Schema<
IVehicle, VehicleModel, IVehicleMethods,{}, IVehicleVirtuals>({
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year_of_assembly: {
        type: Number,
        required: true
    },
    year_of_sale:{
        type: Number,
        required: true
    },
    milage: {
        type: Number,
        required: true
    },
    chasis_number: {
        type: Number,
        required: true
    },
    initialValue:{
        type: Number,
        required: true
    }
})

vehicleSchema.method(
    'calculateDepreciationRate', function(currentValue: number): number{
        const change = this.initialValue - currentValue
        // console.log(this.age)
        return (change /this.age )
})

vehicleSchema.virtual('age').get(function(): number{
    return new Date().getFullYear() - this.year_of_sale
})


type HydratedVehicleDoc = HydratedDocument<IVehicle, IVehicleMethods & IVehicleVirtuals>

const Vehicle: VehicleModel = model<IVehicle, VehicleModel>('Vehicle', vehicleSchema)

const car: HydratedVehicleDoc = new Vehicle({
    year_of_assembly: 2009,
    year_of_sale: 2012,
    chasis_number: 798237587289,
    milage: 54359934,
    model: 'Teana',
    manufacturer: 'Nissan',
    initialValue: 5689000
})

const getAge = (doc: HydratedVehicleDoc): number =>{
    return doc.age
}
console.log(car.calculateDepreciationRate(4855904))
console.log("Age: ", getAge(car))

