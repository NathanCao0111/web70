const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const BodySchema = new Schema(
  {
    content: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const Post = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    body: BodySchema,
    liked: { type: Number },
  },
  { timestamps: true }
);

Post.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Post", Post);
