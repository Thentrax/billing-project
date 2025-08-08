import mongoose from 'mongoose';

const transitionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  processDate: { type: Date, required: true },
});

export const Transition = mongoose.models.Transition || mongoose.model('Transition', transitionSchema);