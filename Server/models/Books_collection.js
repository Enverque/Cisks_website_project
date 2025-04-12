import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema({
  
  Book_title: {
    type: String,
    required: true
  },
  Author: {
    type:String,
    required:true
  },
  Category:{
    type:[Number],
    required:true,
  },
  status: {
    type:Boolean,
    required:true
  },
  Quantity: {
    type:Number,
    required:true
  }
});


export const Books_collection = mongoose.model('Books_collection', bookSchema , 'Books_collection');
export default Books_collection;
