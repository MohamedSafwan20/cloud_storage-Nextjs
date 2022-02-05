import type { NextPage } from "next";
import FileCard from "../../components/FileCard/FileCard";
import Root from "../../components/Root";

const AllFiles: NextPage = () => {
  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">All Files</h1>
        <div className="mt-4 flex items-center flex-wrap">
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
          <FileCard className="w-1/6 h-[120px]" />
        </div>
      </div>
    </Root>
  );
};

export default AllFiles;
