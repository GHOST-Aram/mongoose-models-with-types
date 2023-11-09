import  mongoose from "mongoose"

interface IHouse{
    longitude: number
    latitude: number
    city: string
    bedrooms: number
    washrooms: number
    bathrooms: number
}
type HouseModel = mongoose.Model<IHouse>


class HouseSchema extends mongoose.Schema<IHouse, HouseModel>{} 

const houseSchema: mongoose.Schema = new HouseSchema(
    {
        longitude: Number,
        latitude: Number,
        city: String,
        bathrooms: Number,
        bedrooms: Number,
        washrooms: Number
    }
)

const House: HouseModel = mongoose.model<IHouse, HouseModel>('House', houseSchema)

type HydratedHouseDoc = mongoose.HydratedDocument<IHouse>

const cabin: HydratedHouseDoc = new House({
    longitude: 45,
    latitude: -0.2,
    city: 'Kisumu',
    bathrooms: 2,
    bedrooms: 5,
    washrooms:5
})

console.log(
    cabin.bedrooms,
    cabin.latitude,
    cabin.longitude,
    cabin.bathrooms,
    cabin.washrooms,
)

House.findById('yruwhu382ru32').then((house) =>{
    house?.bathrooms
    house?.bathrooms
    house?.washrooms
    house?.bedrooms
    house?.latitude
    house?.longitude
}).catch(error => console.log(error.message))

const getDetails = (house: HydratedHouseDoc) =>{
    console.log(
        house?.bedrooms,
        house?.bathrooms,
        house?.washrooms,
        house?.latitude,
        house?.longitude,
    )
}

getDetails(cabin)