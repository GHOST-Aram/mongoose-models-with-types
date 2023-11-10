import mongoose from "mongoose"

//Define n interface for the schema
// This interface defines the shape of the schema
//It constraints the raw data to the specified properties only
interface IVehicle {
    manufacturer: string,
    model: string
    milage:number
    chasis_number: number
    year_of_assembly: number
    year_of_sale: number
    initialValue: number
}
/**
 * This interface define the instance methods
 * that the schema should have.
 * All the instance methods in this interface must be implemented
 * In the schema before they can be used to get real values
 * Unimplemented instance methods return undefined
 * 
 * For the Instance methods to be visible in the Vehicle document,
 * The Vehicle methods type must be included as a generic in the
 * Schema, Model and in the HydratedDocument
 * 
 * In Schema -> VehicleMethods is provided and 3rd Generic 
 * argument
 * 
 * In Model  -> Similar to Schema, the Instance Methods
 * interface is provided as the 3rd argument
 * 
 * Finally, in HydratedDocument type, the Instance methods 
 * Interface is supplied as a second argument in the generics
 * 
 * If the Schema has both methods and virtuals, the are
 * all supplied as the second to the HydratedDocument with
 * a logical AND (&)
 * 
 * If the Instance methods interface is not supplied to the 
 * HydratedDocument type, they will not be visible from the
 * resultant document. The istance method will still be
 * from within the virtual property implementations.
 * 
 * 
 */


interface VehicleMethods{
    calculateDepreciationRate:(currentValue: number) => number
}

/**
 * VehicleVirtuals interface define the virtual properties that
 * should be implemented in the vehicle schema
 * 
 * For the virtual properties defined in the interface to be 
 * visible in the document, they must be supplied as generics
 * to Model, Schema, and the HydratedDocument Type
 * 
 * In Schema Constructor -> Virtuals interface is supplied as the fifth 
 * argument in the generics arguments list
 * 
 * In Model Constructor -> Virtuals Interface is supplied as the fourth 
 * argument in the list of generics
 * 
 * In HydratedDocument Type -> Virtuals interface is supplied as the
 * as the second argument in the list of generics
 * 
 * In a case where a schema has both instance methods and 
 * virtual properties, they are both supplied as second argument
 * to the HydratedDocument with  logical AND (&)
 * 
 * If a virtual properties Interface is not supplied to the 
 * HydratedDocument type as a generic, the properties will not
 * be visible on the document. The virtuals can still be accessed from
 * within the Instance methods implementations.
 * 
 */
interface VehicleVirtuals{
    age:number
}

type VehicleModel = mongoose.Model<
IVehicle, {}, VehicleMethods, VehicleVirtuals>

const vehicleSchema:mongoose.Schema = new mongoose.Schema<
IVehicle, VehicleModel, VehicleMethods,{}, VehicleVirtuals>({
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
    'calculateDepreciationRate', 
    function(currentValue: number): number{
        const change = this.initialValue - currentValue
        return (change /this.age )
})

vehicleSchema.virtual('age').get(function(): number{
    return new Date().getFullYear() - this.year_of_sale
})

const Vehicle: VehicleModel = mongoose.model<
IVehicle, VehicleModel>('Vehicle', vehicleSchema)

type HydratedVehicleDoc = mongoose.HydratedDocument<
IVehicle, VehicleMethods & VehicleVirtuals>

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

