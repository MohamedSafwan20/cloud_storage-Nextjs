import type { NextPage } from "next";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";

const AllFolders: NextPage = () => {
  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">All Folders</h1>
        <div className="mt-4 flex items-center flex-wrap">
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
          <FolderCard className="w-1/6" />
        </div>
      </div>
    </Root>
  );
};

export default AllFolders;
