import mongoose from "mongoose";

const filesAndFoldersSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const favoritesScheme = new mongoose.Schema(
  {
    data_id: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  filesAndFolders: [filesAndFoldersSchema],
  favorites: [favoritesScheme],
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
