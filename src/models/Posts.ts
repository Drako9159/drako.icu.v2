import { Schema, model } from "mongoose";
import { IPost } from "interfaces/IPost";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
    },
    language: {
      type: String,
      required: [true, "Language is required!"],
    },
    color: {
      type: String,
      default: "green",
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    read_time: {
      type: String,
      required: [true, "Read Time is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    is_public: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", PostSchema);
