/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import Routes from "../../config/routes";
import AuthService from "../../services/authService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let isAuthenticated = AuthService.isUserAuthenticated(
    context.req.headers.cookie?.split("=")[1]
  );

  if (!isAuthenticated)
    return {
      redirect: {
        permanent: true,
        destination: Routes.Login,
      },
    };

  return {
    props: {},
  };
};

const RecycleBin: NextPage = () => {
  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">Recycle Bin</h1>
        <div className="mt-4 flex items-center flex-wrap">
          <FileCard isDeleted className="w-1/6 h-[120px]" />
          <FileCard isDeleted className="w-1/6 h-[120px]" />
          <FileCard isDeleted className="w-1/6 h-[120px]" />
          <FileCard isDeleted className="w-1/6 h-[120px]" />
          <FolderCard isDeleted className="w-1/6 h-[120px]" />
          <FolderCard isDeleted className="w-1/6 h-[120px]" />
          <FolderCard isDeleted className="w-1/6 h-[120px]" />
          <FolderCard isDeleted className="w-1/6 h-[120px]" />
        </div>
      </div>
    </Root>
  );
};

export default RecycleBin;
