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
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import customColors from "../../config/colors";
import Routes from "../../config/routes";
import AuthService from "../../services/authService";

type Props = {
  isAuthenticated: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let isAuthenticated = await AuthService.isUserAuthenticated(
    context.req.headers.cookie
  );

  return {
    props: { isAuthenticated },
  };
};

const AllFolders: NextPage<Props> = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <CreateFolderModal isOpen={isOpen} onClose={onClose} />
      </div>
    </Root>
  );
};

const CreateFolderModal: NextPage<any> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [folderName, setFolderName] = useState("");

  const [hasFolderNameError, setHasFolderNameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addFolder = async () => {
    setIsLoading(true);
    setHasFolderNameError(false);

    if (folderName !== "") {
      const path = router.asPath === "/all-folders" ? "/" : router.asPath;

      const res = await fetch("/api/folders/add-folder", {
        method: "POST",
        body: JSON.stringify({ name: folderName, path }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      console.log(data);
    } else {
      setHasFolderNameError(true);
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
            isInvalid={hasFolderNameError}
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          {hasFolderNameError && (
            <p className="text-error font-semibold">Invalid folder name</p>
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
