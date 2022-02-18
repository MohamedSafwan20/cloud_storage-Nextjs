import mongoose from "mongoose";

const filesAndFoldersSchema = new mongoose.Schema({
  path: {
    type: Map,
  },
  type: {
    type: String,
  },
});

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
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
