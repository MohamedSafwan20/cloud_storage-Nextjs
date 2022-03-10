/* eslint-disable react-hooks/exhaustive-deps */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineFolderAdd } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import customColors from "../../config/colors";
import connectToDb from "../../config/db";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FavoritesService from "../../services/favoritesService";
import FolderService from "../../services/folderService";
import { refresh } from "../../utils/utils";

type Props = {
  data: string;
  favorites: string;
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

  const queryArray = context.query.foldername as string[];
  const path = `/${queryArray.join("/")}`;
  const data = await FolderService.getFoldersAndFilesOfPath(
    userId as string,
    path
  );

  const favorites = await FavoritesService.getAllFavorites(userId as string);
  const favoritesId = favorites.map((item) => item.data_id);

  return {
    props: {
      data: JSON.stringify(data),
      favorites: JSON.stringify(favoritesId),
    },
  };
};

const Folder: NextPage<Props> = (props) => {
  const router = useRouter();
  const toast = useToast();
  const folderModalDisclosure = useDisclosure();
  const fileModalDisclosure = useDisclosure();

  const [queryArray, setQueryArray] = useState<string[]>([]);

  const foldersAndFiles = JSON.parse(props.data) as Array<IFileOrFolder>;
  const favorites = JSON.parse(props.favorites) as Array<string>;

  const [folderName, setFolderName] = useState("");
  const [folderNameError, setFolderNameError] = useState("");

  const [fileName, setFileName] = useState("Uploaded file will show here");
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const addFile = async (e: any) => {
    e.preventDefault();

    if (file !== undefined) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file!!);

      const queryArray = router.query.foldername as string[];
      const path = `/${queryArray.join("/")}`;

      const res = await fetch("/api/files", {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
          path,
        },
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.status) {
        toast({
          title: "File Uploaded",
          status: "success",
          isClosable: true,
        });

        fileModalDisclosure.onClose();

        refresh();
      } else {
        setFileError(data.message);
      }

      setIsLoading(false);
    } else {
      setFileError("File required");
    }
  };

  const addFolder = async () => {
    setFolderNameError("");

    if (folderName !== "") {
      const queryArray = router.query.foldername as string[];
      const path = `/${queryArray.join("/")}`;

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

        folderModalDisclosure.onClose();
      } else {
        setFolderNameError(data.message);
      }
    } else {
      setFolderNameError("Invalid folder name");
    }
  };

  useEffect(() => {
    setQueryArray(router.asPath.substring(8).replaceAll("%20", " ").split("/"));
  }, [router]);

  return (
    <Root>
      <div className="p-16">
        <div>
          <Breadcrumb spacing="6px" separator={<BiChevronRight size={20} />}>
            <BreadcrumbItem className="hover:underline">
              <BreadcrumbLink as={Link} href="/all-folders">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {queryArray.map((item, index) => {
              let mainLink = "/folder/";
              let link = mainLink.concat(
                queryArray.slice(0, index + 1).join("/")
              );

              return (
                <BreadcrumbItem
                  key={`${index}-${item}`}
                  className={
                    "hover:underline " +
                    (index === queryArray.length - 1
                      ? "text-primaryVariant font-semibold"
                      : "")
                  }
                >
                  <BreadcrumbLink as={Link} href={link}>
                    {item}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </div>
        <div className="mt-[3rem] flex items-center flex-wrap">
          <div className="flex flex-col items-center justify-center p-3 m-4 md:w-1/6 w-1/3">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="add-folder"
                colorScheme="primaryScheme"
                variant="ghost"
                width="fit-content"
                isRound
                size="lg"
              >
                <IoAddOutline
                  size={35}
                  color={customColors.primary}
                  className="mx-auto"
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={fileModalDisclosure.onOpen}
                  icon={
                    <BsFileEarmarkPlus
                      color={customColors.primaryVariant}
                      size={22}
                    />
                  }
                >
                  Add File
                </MenuItem>
                <MenuItem
                  onClick={folderModalDisclosure.onOpen}
                  icon={
                    <AiOutlineFolderAdd
                      color={customColors.primaryVariant}
                      size={25}
                    />
                  }
                >
                  Add Folder
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          {foldersAndFiles.length > 0 &&
            foldersAndFiles.map((item) => {
              if (item.type === "file") {
                return (
                  <FileCard
                    key={item._id}
                    file={item}
                    className="w-1/6 h-[120px]"
                  />
                );
              }
              return (
                <FolderCard
                  key={item._id}
                  folderId={item._id}
                  className="w-1/6 mb-10"
                  folderName={item.name}
                  alreadyInFavorite={favorites.includes(item._id)}
                />
              );
            })}
        </div>

        {/* Create Folder Modal */}
        <Modal
          isOpen={folderModalDisclosure.isOpen}
          onClose={folderModalDisclosure.onClose}
        >
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

        {/* Create file Modal */}
        <Modal
          isOpen={fileModalDisclosure.isOpen}
          onClose={fileModalDisclosure.onClose}
        >
          <ModalOverlay />
          <form onSubmit={(e) => addFile(e)}>
            <ModalContent>
              <ModalHeader>Upload File</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex items-center ml-6">
                  <label>
                    <AiOutlineCloudUpload
                      size={35}
                      className="hover:text-primary"
                    />
                    <input
                      type="file"
                      name="file"
                      hidden
                      onChange={(e) => {
                        setFile(e.target.files!![0]);
                        setFileName(e.target.files!![0].name);
                      }}
                    />
                  </label>
                  <p className="ml-4 text-disabledVariant">{fileName}</p>
                </div>
                <p className="ml-6 mt-2 text-error">{fileError}</p>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="outline"
                  colorScheme="primaryScheme"
                  type="submit"
                  isLoading={isLoading}
                >
                  Upload
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        {/*End of  Create file Modal */}
      </div>
    </Root>
  );
};

export default Folder;
