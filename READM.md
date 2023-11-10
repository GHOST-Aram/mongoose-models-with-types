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

- Creating a simple model.
- Creating a model with custom instance methods.
- Creating a model with virtual properties.
- Creating a model with both custom instance methods and virtual properties.

