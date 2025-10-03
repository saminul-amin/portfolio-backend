import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  slug: string;
  author: mongoose.Types.ObjectId;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    coverImage: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create slug from title
blogSchema.pre("save", function (next) {
  if (this.isModified("title") || this.slug === "") {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export default mongoose.model<IBlog>("Blog", blogSchema);
