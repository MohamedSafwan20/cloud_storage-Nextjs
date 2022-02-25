import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import folderNotFoundImg from "../../assets/images/folder-not-found.png";
import IFileOrFolder from "../../models/IFileOrFolder";
import FolderCard from "../FolderCard/FolderCard";

type Props = {
  folders: Array<IFileOrFolder>;
};

const FolderSection: NextPage<Props> = (props) => {
  const router = useRouter();

  const folders = props.folders;
  folders.length > 6 ? (folders.length = 6) : null;

  return (
    <div className="mt-12 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="h3">Folders</h1>
        <Button
          colorScheme="primaryScheme"
          variant="link"
          onClick={() => router.push("/all-folders")}
        >
          View all
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-center flex-wrap">
        {folders.length > 0 ? (
          folders.map((item) => (
            <FolderCard
              key={item._id}
              className="md:w-1/4 w-1/3"
              folderName={item.name}
            />
          ))
        ) : (
          <div className="flex justify-center items-center space-y-4 flex-col">
            <Image
              src={folderNotFoundImg}
              alt="Not Found"
              width={350}
              height={200}
            />
            <h2 className="font-bold text-2xl text-disabledVariant">
              No Folders!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderSection;
