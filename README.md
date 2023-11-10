# How to  Create Mongoose Models Using Typescript.
Typescript is a superset of JavaScript. Typescript adds type checking and additional OOP features to JavaScript. Using Typescript in creating Mongoose models can greately improve your development experience. 

By using interfaces, you can put constrains on the properties of your schemas. The interfaces  will make sure that your schemas only define the properties you intend to include in your documents. Typescript will warn you incase you attempt to add an extra property to your schema.

Typed documents types will always suggest their accessible properties when you try to access them. Typescript will warn you if you attempt to access an a property that is not part of your document. These warnings will help you a void bugs that would otherwise occur without notice.

In this article, we will discuss and practice how to create type sensitive schemas, models and documents using Mongoose and Typescript. Let us jump right in and start by looking at what you are going to learn from this article. 

## Learning goals.
The syntax for creating Mongoose models with Typescript is exactly the same thing as creating them with JavaScript. The only improvement is on types and interfaces. We are going to use interfaces to define shape of documents. We are also going to use types for data members.

By the end of this article, you will have learned how to do the following using mongoose and Typescript:
- Create interfaces with the data properties you expect your documents to have.
- Create schemas that stictly define the properties in your interfaces.
- Add instance methods that are supported by Typescript to your schemas.   
- Add virtual properties that are supported by Typescript to your schemas.
- Add both instance methods and virtual properties supported by Typescript on the same schema.


The following surrounding topics are beyond the scope of this article:
- Handling client requests
- Processing user inputs.
- Connection to the database.
- Saving documents to the database.
- Accessing data from the database.

This article does not cover any of the above topics. You do not need knowledge on any of the above topics to learn from this article. Howover, if you are interested in learning about them, you can do so from other articles on the internet.

## Target Audience
This article is aimed at the following audience:
- Beginner backend and fullstack development learners
- JavaScript developers migrating to Typescript
- Any developer interested in learning how to add types to mongoose models.

## Prerequisites
This is not an introductory tutorial to Typescript or Mongoose. It is therefore important that you have a basic knowledge on following features of Typescript that we are going to use: 
- Interfaces
- Types
- Generics

If you are not familiar with any of the above concepts, feel free to [visit the Typescript documentation](https://www.typescriptlang.org/docs/) and find out before we can continue.

Additionally, having basic prior knowledge on the following features of Mongoose will improve your learning experience on this article:
- [Schema](https://mongoosejs.com/docs/guide.html#definition)
- [Document](https://mongoosejs.com/docs/documents.html)
- [Model](https://mongoosejs.com/docs/guide.html#models)
- [Virtuals](https://mongoosejs.com/docs/guide.html#virtuals)
- [Instance methods](https://mongoosejs.com/docs/guide.html#methods)


Now that you know what you expect to learn from this article and the prerequisites, let us look at how we are going to learn. 
The learning activities in this article are divided into the following segments: 

1. Creating a simple model.
2. Creating a model with custom instance methods.
3. Creating a model with virtual properties.

With the introduction out of the way, lets begin by looking at how to create a simple model.

## 1. Creating a simple model.
In this section we will create a simple model with data properties. This model will not have any virtual property or custom instance method. To demonstrate what we are doing, will create a model for vehicles. We will call this model the `Vehicle` model. This model will have the following data properties:

- make
- model
- manufacturer
- design
- year-sold

To create the `Vehicle` model, we will follow the procedure enumerated below:

a). Define an  interface with the above properties.

b). Create a schema for the `Vehicle` model.

c). Create the `Vehicle` model.

d). Create a document of the `Vehicle` model. 

e). Test the types and properties of the document.


### a). Define an interface with the vehicle properties.
A vehicle interface will help us constrain the vehicle schema to specific properties. Here is the implementation of the interface:

```
interface IVehicle{
    make: string
    vehicle_model: string
    manufacturer: string
    design: string
    year_sold: number
}
```

With the interface defined, let us it to create the vehicle schema in the next step.

### b). Create a schema for the vehicle model.
In the previous section, we defined the `IVehicle` interface. The interface dictates the shape of the schema. In this step we create a vehicle schema that implements the `Ivehicle` interface. 

To create create an new vehicle schema, we need to import the `Schema` constructor from Mongoose as follows:

```
import { Schema } from "mongoose"
```

To add Typescript support to the new vehicle schema, we will supply the `IVehicle` interface as the first generic to the `Schema` constructor as follows:

```
const vehicleSchema = new Schema<IVehicle>({})
```
The `Schema` constructor also accepts a generic type of the `Model` as follows:

```
import { Model } from 'mongoose'
```

```
type VehicleModel = Model<IVehicle> 
const vehicleSchema = new Schema<IVehicle, VehicleModel>({})
```

After adding the types, the schema is defined just like a plain JavaScript schema. The code snippet is provided below.

```
const vehicleSchema: Schema = new Schema<IVehicle, VehicleModel>({
    make: { type: String },
    vehicle_model: { type: String },
    manufacturer: { type: String },
    design: { type: String }
    year_sold: {type: Number }
})
```

We have successfully created a type sensitive vehicle schema. We will create the vehicle model in the next step.

### c). Create the vehicle model.
In step 2, we created the `vehicleSchema`. In this step, we will create a model for the vehicle. 

To create a vehicle model, we need the `model` function from mongoose. 

```
import { model } from "mongoose"
```
Next, we supply the `IVehicle` interface and `VehicleModel` to the function as generic types. The `IVehicle` interface goes at the first position.  The `VehicleModel` type goes at the second position. The code snippet is as follows:

```
const Vehicle: VehicleModel = model<IVehicle, VehicleModel>('Vehicle', vehicleSchema)
```

With the model successfully created, let us find out what type of instances can be created from the `Vehicle` model.

### d). Create a Document of the `Vehicle` Model.
The `Vehicle` constructor returns an instance of the `HydratedDocument<IVehicle>` type. 

A `HydratedDocument<IVehicle>` is a Mongoose document that has all the properties, types and other Mongoose features that exists on instance of the `Vehicle` model. 

Below is an example of how to create a vehicle document:

```
const car: HydratedDocument<IVehicle> = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
    year_sold: 2007
})
```

Mongoose models do not check types of the documents you are creating. Therefore, the `Vehicle` model will not warn you of an extra property or type mismatch. 

Having created the `car` document, let go to the next section and test its types and properties.

### e). Test the types and properties of the document.
Here, we will create a function that accepts a mongoose document as an argument. Our goal is to see that all the data on the document is logged to the console.

We define the function with thw following signature:

```
const logVehicleData = (vehicle: HydratedDocument<IVehicle>): void =>{
   //todo here 
}
```

The we implement the function as follows:
```
const logVehicleData = (vehicle: HydratedDocument<IVehicle>): void =>{
    console.log("Make: ", vehicle.make)
    console.log("Model: ", vehicle.vehicle_model)
    console.log("Manufacturer: ", vehicle.manufacturer)
    console.log("Design: ", vehicle.design)
    console.log("Year sold: ", car.year_sold)
}
```

Finally, we call the function and run our program to see the ouput.

```
logVehicleData(car)
```

```
//Expected output
Make:  Toyota
Model:  Corrolla
Manufacturer:  Toyota Motors
Design:  Sedan
Year sold: 2007
```

We have successfully created and tested a simple Mongoose model. In the next section, we will extend the `Vehicle` model with custom instance methods.


## 2. Creating a model with instance methods.
In this section we will add an instance method to the `Vehicle` model. The method will be accessible to all the vehicle documents.

We will add an instance method that calculates the age of a vehicle from the year it was sold to  given year.

We will extend our previous program in the following order:

a). Define an interface for the instance method.

b). Add the interface to `Model` and `Schema` generics list.

c). Extend the `HydratedDocument` type.

d). Impelement the method defined in the interface.

e). Test the instance method

### a). Define an interface for the instance method.
To an instance method with Typescript support to a schema, we first define an interface for instance methods. The interface is defined below.

```
interface VehicleMethods{
    calculateAge:(year: number) => number
}
```

### b). Add the interface to `Model` and `Schema` generics list.
We add the `VehicleMethods` interface as a 3rd generic to the `Model` and as a 3rd generic to `Schema` constructor as in the code below:

```
type VehicleModel = Model<IVehicle, {}, VehicleMethods>

const vehicleSchema = new Schema<IVehicle, VehicleModel, VehicleMethods>({
    make: { type: String },
    vehicle_model: { type: String },
    manufacturer: { type: String },
    design: { type: String },
    year_sold:{ type: Number}
})
```
### c). Extend the `HydratedDocument` type.
Here, we add `VehicleMethods` to the `HydratedDocument` type as the 2nd argument to make the methods visible within the documents.

```
const car: HydratedDocument<IVehicle, VehicleMethods> = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
    year_sold: 2007
})
```

At this point if you try to call `car.calculateAge`, it will be available on the list of suggestions. If we try to run the program we will encounter a `TypeError`.This is because the we have not implemented the method in our schema.

### d). Impelement the method defined in the interface.
Add the instance method to the `vehicleSchema` as shown below:

```
vehicleSchema.method('calculateAge', function(year:number):number{
    return year - this.year_sold
})
```
### e). Test the instance method
Now if you call the method and run your program.

```
console.log("Age by 2034: ", car.calculateAge(2034))
```
You will get the following output without errors.

```
//Expected output
Age by 2034:  27
```

That's all for the instance methods. Let us see what's next on virtual properties.


## 3. Creating a model with virtual properties.
The steps involved in adding a virtual property to a schema are nearly similar to adding an instance method. The differences exist in the positions of the interfaces in the lists of generics. 

In this section, we will follow the exact same steps we followed when adding instance methods. We will extend the `Vehicle` model with virtual properties. Let us start by defining an interface of virtual properties.

### a). Defining interface for the virtual properties.
Similar to adding instance methods to a model, we will first define an interface that contains all the virtual properties that the `vehicleSchema` will implement. 

We will define one virtual property called `long_name`. Below is the code snippet for the interface:

```
interface VehicleVirtuals{
    long_name: string
}
```

The `long_name` property will hold a concatenation of the vehicle make, model and year-sold. 

In the next step, we add this interface to the `Model` and `Schema` types.

### b). Add the interface to `Model` and `Schema` generics list.
In the `Model` type, the `VehicleVirtuals` is added as the 4th argument just after the `VehicleMethods` as shown below.

```
type VehicleModel = Model<IVehicle, {}, VehicleMethods, VehicleVirtuals>
```

In the `Schema` constructor, the `VehicleVirtuals` interface is added as the 5th argument in the generics list. Below is the code snippet:

```
const vehicleSchema: Schema = new Schema<
IVehicle, VehicleModel, VehicleMethods, {}, VehicleVirtuals>({
    make: { type: String },
    vehicle_model: { type: String },
    manufacturer: { type: String },
    design: { type: String },
    year_sold:{ type: Number}
})
```
If you are wondering how I know the positions, try hovering on the `Schema` type on the left side of the equal sign.

Our `VehicleModel` type and `vehicleSchema` have been updated with the `VehicleVirtuals` interface. Let us add the interface to the `HydratedDocument` type in the next step.

### c). Extend the `HydratedDocument` type.
The `VehicleVirtuals` is added as 2nd arguments in the `HydratedDocument` generic list. Remember that we also added the `VehicleMethods` type in the same position. The two interfaces are merged on the 2nd position using a logical AND operator (&). This doesn't mean that a virtuals interface cannot independently exist in a `HydratedDocument`. The virtuals interface could also be added independently like we did in the instance methods in the previous section.

Here is the code snippet that includes the two interfaces on one model:

```
const car: HydratedDocument<IVehicle, VehicleMethods & VehicleVirtuals> = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
    year_sold: 2007
})
```
We are going to need this `HydratedDocument` type in the next sections. It is becomin long, a better way to move it round is to store it in a custom named type as done in the code snippet below.

```
type HydratedVehicleDoc = HydratedDocument<IVehicle, VehicleMethods & VehicleVirtuals>

const car: HydratedVehicleDoc  = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
    year_sold: 2007
})
```

We have added the virtual interface to all the generics that expect it. Let us add the virtual property to the `vehicleSchema` in the next section.

### d). Implement the virtual property defined in the interface.
Adding a Typescript supported virtual property to a schema is the same as doing so with plain JavaScript. The only difference is an optional return type that we will add to the getter function.

Implement the `long_name` virtual property as done in the code snippet below:

```
vehicleSchema.virtual('long_name').get(function():string{
    return `${this.make} ${this.vehicle_model} ${this.year_sold}`
})
```

### e). Test the virtual property.
In this step, we try to access and log the value stored in the `long_name` property. We will use the previously created `car` document.

```
console.log("Long Name: ",car.long_name)
```

Run your code to see if the value is logged on your console.

```
Expected output:
Long Name:  Toyota Corrolla 2007
```

In conclusion, We have learnt how to do the following:

- Create a simple Mongoose model with typed data properties.
- Create a Mongoose model with typed custom instance methods.
- Create a Mongoose model with typed virtual properties.
- Create a Mongoose model with both typed custom instance methods and virtual properties.

Congratulations for finishing this exercise. All the code we have writen plus more examples on the same topic are available on [this repository.](https://github.com/GHOST-Aram/mongoose-models-with-types) All the best in your development journey. 

