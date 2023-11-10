import { HydratedDocument, Model, Schema, model } from "mongoose"

interface IVehicle{
    make: string
    vehicle_model: string
    manufacturer: string
    design: string
    year_sold: number
}

interface VehicleMethods{
    calculateAge:(year: number) => number
}
type VehicleModel = Model<IVehicle, {}, VehicleMethods>

const vehicleSchema = new Schema<
IVehicle, VehicleModel, VehicleMethods>({
    make: { type: String },
    vehicle_model: { type: String },
    manufacturer: { type: String },
    design: { type: String },
    year_sold:{ type: Number}
})

vehicleSchema.method('calculateAge', function(year:number):number{
    return year- this.year_sold
})
const Vehicle: VehicleModel = model<IVehicle, VehicleModel>('Vehicle', vehicleSchema)

const car: HydratedDocument<IVehicle, VehicleMethods> = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
    year_sold: 2007
})

console.log(car.calculateAge(2014))

const logVehicleData = (vehicle: HydratedDocument<IVehicle, VehicleMethods>): void =>{
    console.log("Make: ", vehicle.make)
    console.log("Model: ", vehicle.vehicle_model)
    console.log("Manufacturer: ", vehicle.manufacturer)
    console.log("Deign: ", vehicle.design)
    console.log("Year sold: ", car.year_sold)
}

// logVehicleData(car)

console.log("Age by 2034: ", car.calculateAge(2034))