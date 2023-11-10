# How to  Create Mongoose Models Using Typescript.
Typescript is a superset of JavaScript that adds Type checking and additional OOP properties to Javascript. Using Typescript in creating `mongoose` models can greately improve your development experience. 

By using interfaces, you can constrain the properties of your schemas.The interfaces  will make sure that your schemas only define the properties they are supposed to have. An attempt to add an extra property to your schema will raise warnings.

Typed documents types will always suggest their accessible properties when you try to access them. An attempt to access an unavailable property will raise warnings.

In this article, we will discuss and practice how to create type sensitive schemas, models and documents using `mongoose` and Typescript. Let us jump right in and start by looking at what you are going to learn from this article. 

## Learning goals.
By the end of this article, you will have learned how to do the following using mongoose and Typescript:
- Create interfaces with the data properties you expect your documents to have.
- Create schemas that stictly define the properties in your interfaces.
- Add instance methods that are supported by Typescript to your schemas.   
- Add virtual properties that are supported by Typescript to your schemas.
- Add both instance methods and virtual properties supported by Typescript on the same schema.


The following sarrounding topics are beyond the scope of this article:
- Handling client requests
- Processing user inputs.
- Connection to the database.
- Saving documents to the database.
- Accessing data from the database.

You do not need knowledge on any of the above topics to learn from this article. Howover, if you are interested in learning about them, you can do so from other articles on the internet.

## Target Audience
This article is aimed at the following audience:
- Beginner backend development learners
- JavaScript developers migrating to Typescript
- Any web developer interested in learning how to add types to mongoose models.

## Prerequisites
This is not an introductory tutorial to Typescript, MongoDB `mongoose`. It is therefore important that you have a basic knowledge on following features of Typescript that we are going to use: 
- Interfaces
- Types
- Generics

If you are not familiar with any of the above concepts, feel free to [visit the Typescript documentation](https://www.typescriptlang.org/docs/) and find out before we can continue.

Additionally, having basic prior knowledge on the following features of `mongoose` will improve your learning experience on this article:
- [Schema](https://mongoosejs.com/docs/guide.html#definition)
- [Document](https://mongoosejs.com/docs/documents.html)
- [Model](https://mongoosejs.com/docs/guide.html#models)
- [Virtuals](https://mongoosejs.com/docs/guide.html#virtuals)
- [Instance methods](https://mongoosejs.com/docs/guide.html#methods)


Now that you know what you expect to learn from this article and the prerequisites, let us look at how we are going to learn. 
The learning activities in this article will be carried out in the following segments: 

1. Creating a simple model.
2. Creating a model with custom instance methods.
3. Creating a model with virtual properties.
4. Creating a model with both custom instance methods and virtual properties.

With the introduction out of the way, lets begining by looking at how to create a simple model.

## 1. Creating a simple model.
In this section we will create a simple model with only a few explicit properties. This model will not have any virtual property or custom instance method. To make the most out of this section, will create a `Vehicle` model. This model will have the following data properties:

- make
- model
- manufacturer
- design
- year-sold

To create a simple model, we will follow the following procedure:

a). Define an  interface with the `Vehicle` properties.

b). Create a schema for the `Vehicle` model.

c). Create the `Vehicle` model.

d). Create a document of the `Vehicle` model. 

e). Test the types and properties of the document.


### a). Define an Interface with Vehicle properties.
Creating an interface for our model will help us ensure that we only include the intended properties when defining the vehicle schema in the next step. 

Here is the implementation of the interface:

```
interface IVehicle{
    make: string
    vehicle_model: string
    manufacturer: string
    design: string
    year_sold: number
}
```
With the interface define, let us it to create the schema in the next step.

### b). Create a Schema for the Vehicle model.
In the previous section, we defined a schema that dictates what data members should exist in the schema. In this step we create an instace of `Schema` class that implements the `Ivehicle` interface. 

To create create an new vehicle schema, we need to import the `Schema` constructor from `mongoose` as follows:

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
const vehicleSchema = new Schema<IVehicle, VehicleModel>({
    make: { type: String },
    vehicle_model: { type: String },
    manufacturer: { type: String },
    design: { type: String }
    year_sold: {type: Number }
})
```

We have successfully created a type sensitive vehicle schema. We will create the vehicle model in the next step.

### c). Create the Vehicle Model.
In step 2, we created a Typescript supported vehicle schema. Let us extend that support to the vehicle model in this step. 

To create a vehicle model, we need the `model` function from mongoose. 

```
import { model } from "mongoose"

```
Then we supply the `IVehicle` interface and `VehicleModel` to the function as generic types. The `IVehicle` interface goes at the first position.  The `VehicleModel` type goes at the second position. The code snipper is as follows:

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

Mongoose models do not check types of the documents you are creating. The `Vehicle` model will therefore not warn you if you attempt to add an extra property or assign a wrong type. 

Having created the `car` document, let us see how we can add types to function parameters that expect a mongoose document in the next section.

### e). Test Types and properties of the Document.
Here, we will create a function that accepts a mongoose document as an argument. The function returns `void`. Our goal is to see that all the data on the document is logged to the console.

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
//Expected output
Make:  Toyota
Model:  Corrolla
Manufacturer:  Toyota Motors
Design:  Sedan
```

We have successfully created and tested a simple Mongoose model. In the next section, we will extend the `Vehicle` model with custom instance methods.


## 2. Creating a Model with Instance Methods.
In this section we will add an instance method to the `Vehicle` model. The method will be accessible to all the instances of the `Vehicle` model.

We will add an instance method that calculates the age of a vehicle from the year it was sold to  given year.

We will extend our previous program in the following order:

a). Define interface for instance methods.

b). Add the interface to `Model` and `Schema` generics list.

c). Extend the `HydratedDocument` type.

d). Impelement the method defined in the interface.

e). Test the instance method

### a). Define interface for instance methods.
To add instance methods with Typescript support to a schema, we first define an interface for instance methods. The interface is defined below.

```
interface VehicleMethods{
    calculateAge:(year: number) => number
}
```

### b). Add the interface to `Model` and `Schema` generics list.
We add the `VehicleMethods` interface as a 3rd generic to the `Model` and as a 3rd generic to Schema constructor as in the code below:

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
Here, we add `VehicleMethods` to the `HydratedDocument` type as the 2nd argument to make the methods visible to the documents.

```
const car: HydratedDocument<IVehicle, VehicleMethods> = new Vehicle({
    make: 'Toyota',
    vehicle_model: 'Corrolla',
    manufacturer: 'Toyota Motors',
    design: 'Sedan',
    year_sold: 2007
})
```

At this point if you try to call `car.calculateAge`, it will be available on the list of suggestions. If we try to run the program at his point we will encounter a `TypeError`.This is because the we have not implemented the method in our schema.

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
You will get an output without errors.

```
//Expecte output
Age by 2034:  27
```

That's all for the instance methods. Let us see what's next on virtual properties.