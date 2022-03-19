/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  IconButton,
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
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import FileCard from "../../components/FileCard/FileCard";
import Root from "../../components/Root";
import customColors from "../../config/colors";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FileService from "../../services/fileService";
import { refresh } from "../../utils/utils";

type Props = {
  files: string;
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

  const files = await FileService.getAllFiles(userId as string);

  return {
    props: { files: JSON.stringify(files) },
  };
};

const AllFiles: NextPage<Props> = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const files = JSON.parse(props.files) as Array<IFileOrFolder>;
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

      const path = router.asPath === "/all-files" ? "/" : router.asPath;

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

        onClose();

        refresh();
      } else {
        setFileError(data.message);
      }

      setIsLoading(false);
    } else {
      setFileError("File required");
    }
  };

  return (
    <Root>
      <div className="py-16 px-14">
        <h1 className="h3">All Files</h1>
        <div className="mt-4 flex items-center flex-wrap">
          <div className="flex flex-col items-center justify-center p-3 m-4 md:w-1/6 w-1/3">
            <IconButton
              onClick={onOpen}
              aria-label="add-file"
              colorScheme="primaryScheme"
              variant="ghost"
              width="min-content"
              isRound
              size="lg"
            >
              <IoAddOutline size={35} color={customColors.primary} />
            </IconButton>
          </div>
          {files.map((file) => (
            <FileCard key={file._id} file={file} className="w-1/6 h-[120px]" />
          ))}
        </div>
        {/* Create file Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
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

export default AllFiles;
