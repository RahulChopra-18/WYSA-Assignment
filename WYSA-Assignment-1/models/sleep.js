module.exports = (mongoose) => {
    const sleepDataSchema = new mongoose.Schema(
        {
            id: { type: mongoose.Schema.Types.ObjectId }, //represents a unique identifier for the document.
            userID: { type: String, index: true },// represents the user ID associated with the sleep data. It is indexed for efficient querying.
            sleepStruggleFrom: {
                min:{type:Number,enum:[0,2,8]}, // enum property specifies the allowed values for the field                    
                max:{type:Number,enum:[2,8,-1]},
             },
            bedTime: Date, // A field of type Date that represents the time the user went to bed.
            wakeTime: Date, //  A field of type Date that represents the time the user woke up.
            sleepDuration: { type: Number, min: 0, max: 24 }, //The min and max properties define the range of allowed values
            dataCollectionStep: {type:Number,min:1,max:4},          
            createdAt: { type: Date, default: Date.now }, //stores the creation date of the document. It is assigned the current date and time by default.
            updatedAt: { type: Date, default: Date.now },//stores last update date of the document. It is also assigned the current date and time by default.
            deletedAt: { type: Date,default:null},//stores the deletion date of the document. It is initially set to null and can be updated when the document is deleted.                  
        },
        { timestamps: true, versionKey: false }, // enables the automatic timestamps for createdAt and updatedAt fields
        { collection: 'sleepData' }
    );
    return mongoose.model('sleepData', sleepDataSchema);/*creates a model named 'sleepData' using the sleepDataSchema and returns it. 
                                          This model can be used to perform database operations on the 'sleepData' collection.*/
};
