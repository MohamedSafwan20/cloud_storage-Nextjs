/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import customColors from "../../config/colors";
import connectToDb from "../../config/db";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FolderService from "../../services/folderService";
import { refresh } from "../../utils/utils";

type Props = {
  folders: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.headers.cookie?.split("=")[1];

  const userId = AuthService.isUserAuthenticated(authToken);

  if (!userId)
    return {
      redirect: {
        permanent: true,
        destination: Routes.Login,
      },
    };

  await connectToDb();

  const folders = await FolderService.getFoldersOfPath(userId as string, "/");

  return {
    props: { folders: JSON.stringify(folders) },
  };
};

const AllFolders: NextPage<Props> = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [folders, setFolders] = useState(
    JSON.parse(props.folders) as Array<IFileOrFolder>
  );
  const [folderName, setFolderName] = useState("");
  const [folderNameError, setFolderNameError] = useState("");

  const addFolder = async () => {
    setFolderNameError("");

    if (folderName !== "") {
      const path = router.asPath === "/all-folders" ? "/" : router.asPath;

      const res = await fetch("/api/folders/add-folder", {
        method: "POST",
        body: JSON.stringify({ name: folderName, path, type: "folder" }),
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      const data = await res.json();

      if (data.status) {
        refresh();

        onClose();
      } else {
        setFolderNameError(data.message);
      }
    } else {
      setFolderNameError("Invalid folder name");
    }
  };

  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">All Folders</h1>
        <div className="mt-4 flex items-center flex-wrap">
          <div className="flex flex-col items-center justify-center p-3 m-4 md:w-1/6 w-1/3">
            <IconButton
              onClick={onOpen}
              aria-label="add-folder"
              colorScheme="primaryScheme"
              variant="ghost"
              width="min-content"
              isRound
              size="lg"
            >
              <IoAddOutline size={35} color={customColors.primary} />
            </IconButton>
          </div>
          {folders.map((folder: IFileOrFolder) => (
            <FolderCard
              className="w-1/6"
              key={folder._id}
              folderName={folder.name}
            />
          ))}
        </div>
        {/* Create Folder Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter folder name</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                isInvalid={folderNameError ? true : false}
                placeholder="Folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              {folderNameError && (
                <p className="text-error font-semibold">{folderNameError}</p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                colorScheme="primaryScheme"
                onClick={addFolder}
              >
                Add folder
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/*End of  Create Folder Modal */}
      </div>
    </Root>
  );
};

export default AllFolders;
