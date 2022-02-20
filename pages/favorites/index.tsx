/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import Routes from "../../config/routes";
import AuthService from "../../services/authService";

type Props = {
  isAuthenticated: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let isAuthenticated = await AuthService.isUserAuthenticated(
    context.req.headers.cookie?.split("=")[1]
  );

  return {
    props: { isAuthenticated },
  };
};

const Favorites: NextPage<Props> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.isAuthenticated) router.replace(Routes.Login);
  }, []);

  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">Favorites</h1>
        <div className="mt-4 flex items-center flex-wrap">
          <FileCard isFavorite className="w-1/6 h-[120px]" />
          <FileCard isFavorite className="w-1/6 h-[120px]" />
          <FileCard isFavorite className="w-1/6 h-[120px]" />
          <FileCard isFavorite className="w-1/6 h-[120px]" />
          <FolderCard isFavorite className="w-1/6 h-[120px]" />
          <FolderCard isFavorite className="w-1/6 h-[120px]" />
          <FolderCard isFavorite className="w-1/6 h-[120px]" />
          <FolderCard isFavorite className="w-1/6 h-[120px]" />
        </div>
      </div>
    </Root>
  );
};

export default Favorites;
