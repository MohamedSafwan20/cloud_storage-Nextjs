/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FileService from "../../services/fileService";

type Props = {
  files: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.headers.cookie?.split("=")[1];

  let isAuthenticated = AuthService.isUserAuthenticated(authToken);

  const files = await FileService.getAllFiles(authToken!!);

  if (!isAuthenticated)
    return {
      redirect: {
        permanent: true,
        destination: Routes.Login,
      },
    };

  return {
    props: { files: JSON.stringify(files) },
  };
};

const RecycleBin: NextPage<Props> = (props) => {
  const files = JSON.parse(props.files) as Array<IFileOrFolder>;
  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">Recycle Bin</h1>
        <div className="mt-4 flex items-center flex-wrap">
          {files.map((file) => (
            <FileCard
              isDeleted
              key={file._id}
              file={file}
              className="w-1/6 h-[120px]"
            />
          ))}
        </div>
      </div>
    </Root>
  );
};

export default RecycleBin;
