import { HydratedDocument, Model, Schema, model } from "mongoose"

interface IVehicle{
    make: string
    vehicle_model: string
    manufacturer: string
    design: string
}
type VehicleModel = Model<IVehicle>
const vehicleSchema = new Schema<IVehicle, VehicleModel>({
    make: { type: String },
    vehicle_model: { type: String },
    manufacturer: { type: String },
    design: { type: String }
})

const Vehicle: VehicleModel = model<IVehicle, VehicleModel>('Vehicle', vehicleSchema)

const car: HydratedDocument<IVehicle> = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
})

const logVehicleData = (vehicle: HydratedDocument<IVehicle>): void =>{
    console.log("Make: ", vehicle.make)
    console.log("Model: ", vehicle.vehicle_model)
    console.log("Manufacturer: ", vehicle.manufacturer)
    console.log("Design: ", vehicle.design)
}

logVehicleData(car)