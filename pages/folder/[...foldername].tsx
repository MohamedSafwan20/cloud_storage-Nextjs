/* eslint-disable react-hooks/exhaustive-deps */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import Image from "next/image";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import connectToDb from "../../config/db";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FolderService from "../../services/folderService";
import folderNotFoundImg from "../../assets/images/folder-not-found.png";
import { IoAddOutline } from "react-icons/io5";
import customColors from "../../config/colors";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { refresh } from "../../utils/utils";

type Props = {
  data: string;
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

  return {
    props: { data: JSON.stringify(data) },
  };
};

const Folder: NextPage<Props> = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [queryArray, setQueryArray] = useState<string[]>([]);

  const foldersAndFiles = JSON.parse(props.data) as Array<IFileOrFolder>;

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

  useEffect(() => {
    setQueryArray(router.asPath.substring(8).split("/"));
  }, [router]);

  return (
    <Root>
      <div className="p-16">
        <div>
          <Breadcrumb spacing="6px" separator={<BiChevronRight size={20} />}>
            <BreadcrumbItem className="hover:underline">
              <BreadcrumbLink as={Link} href="/">
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
                  className="w-1/6 mb-10"
                  folderName={item.name}
                />
              );
            })}
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

export default Folder;
