import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        Ingredient:{
            type:String,
            required:true,
        },
        Procedure:{
            type:String,
            required:true,
        },
        veg:{
            type:Boolean,
            required:true,
        },
        non_veg:{
            type:Boolean,
            required:true,
        },
        
        other:{
            type:Boolean,
            required:true,
        },
        imageUrls:{
            type:Array,
            required:true,
        },
        userRef:{
            type:String,
            required:true,
        },
    },{timestamps:true}
)

const Listing = mongoose.model('Listing',listingSchema);
export default Listing;