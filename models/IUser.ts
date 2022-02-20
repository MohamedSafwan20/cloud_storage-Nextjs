export default interface IUser {
  id: string;
  email: string;
  password: string;
  filesAndFolders: [
    {
      path: string;
      name: string;
      type: string;
    }
  ];
}
