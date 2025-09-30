import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  liveLink?: string;
  features: string[];
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    link: {
      type: String,
      required: [true, "GitHub link is required"],
    },
    liveLink: {
      type: String,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", projectSchema);
