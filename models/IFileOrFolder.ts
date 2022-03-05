export default interface IFileOrFolder {
  _id: string;
  path: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
}
