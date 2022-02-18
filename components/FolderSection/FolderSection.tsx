import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import FolderCard from "../FolderCard/FolderCard";

const FolderSection: NextPage = () => {
  const router = useRouter();

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
        <FolderCard className="md:w-1/4 w-1/3" />
        <FolderCard className="md:w-1/4 w-1/3" />
        <FolderCard className="md:w-1/4 w-1/3" />
        <FolderCard className="md:w-1/4 w-1/3" />
        <FolderCard className="md:w-1/4 w-1/3" />
        <FolderCard className="md:w-1/4 w-1/3" />
      </div>
    </div>
  );
};

export default FolderSection;
