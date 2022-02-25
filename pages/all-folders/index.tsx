/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  IconButton,
  Input,
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
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import customColors from "../../config/colors";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FolderService from "../../services/folderService";

type Props = {
  isAuthenticated: boolean;
  folders: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isAuthenticated = AuthService.isUserAuthenticated(
    context.req.headers.cookie?.split("=")[1]
  );

  const folders = await FolderService.getAllFolders(
    context.req.headers.cookie?.split("=")[1]!!
  );

  return {
    props: { isAuthenticated, folders: JSON.stringify(folders) },
  };
};

const AllFolders: NextPage<Props> = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const folders = JSON.parse(props.folders);

  useEffect(() => {
    if (!props.isAuthenticated) router.replace(Routes.Login);
  }, []);

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
        <CreateFolderModal isOpen={isOpen} onClose={onClose} />
      </div>
    </Root>
  );
};

const CreateFolderModal: NextPage<any> = ({ isOpen, onClose }) => {
  const router = useRouter();

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
        onClose();
      } else {
        setFolderNameError(data.message);
      }
    } else {
      setFolderNameError("Invalid folder name");
    }
  };

  return (
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
  );
};

export default AllFolders;
