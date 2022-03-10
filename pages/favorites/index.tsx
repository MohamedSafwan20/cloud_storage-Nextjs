/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import Routes from "../../config/routes";
import IFavorite from "../../models/IFavorite";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FavoritesService from "../../services/favoritesService";

type Props = {
  favorites: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.headers.cookie?.split("=")[1];

  let userId = AuthService.isUserAuthenticated(authToken);

  if (!userId)
    return {
      redirect: {
        permanent: true,
        destination: Routes.Login,
      },
    };

  const favorites = await FavoritesService.getAllFavoriteFolders({
    userId: userId as string,
  });

  return {
    props: { favorites: JSON.stringify(favorites) },
  };
};

const Favorites: NextPage<Props> = (props) => {
  const favorites = JSON.parse(props.favorites) as Array<IFileOrFolder>;

  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">Favorites</h1>
        <div className="mt-4 flex items-center flex-wrap">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <FolderCard
                isFavorite
                key={item._id}
                folderId={item._id}
                folderName={item.name}
                className="w-1/6 h-[120px]"
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-[100%] h-[20vh]">
              <h2 className="font-bold text-2xl text-disabledVariant">
                No Favorites!
              </h2>
            </div>
          )}
        </div>
      </div>
    </Root>
  );
};

export default Favorites;
