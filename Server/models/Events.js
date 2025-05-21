import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: {
    type: String,
    enum: ['latest', 'updated', 'carousel', 'gallery', 'program', 'newbook', 'booktitle', 'homeslider'],
    default: 'carousel'
  },
  date: {
    type: Date,
    default: Date.now
  },
  imagePath: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Event', eventSchema);