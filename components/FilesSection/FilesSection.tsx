import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  AiOutlineFileImage,
  AiOutlineFileUnknown,
  AiOutlineFileWord,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegFileAudio, FaRegFileVideo } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import customColors from "../../config/colors";
import IFileOrFolder from "../../models/IFileOrFolder";
import {
  downloadFromPublicDirectory,
  getExtensionFromFilename,
  refresh,
} from "../../utils/utils";

type Props = {
  filesData: Array<IFileOrFolder>;
};

const FilesSection: NextPage<Props> = (props) => {
  const router = useRouter();
  const toast = useToast();

  const files = props.filesData;
  files.length > 6 ? (files.length = 6) : null;

  const downloadFile = async (filename: string) => {
    const res = await fetch("/api/files/download", {
      method: "POST",
      body: JSON.stringify({ filename }),
      headers: {
        Authorization: "Bearer " + Cookies.get("auth_token"),
      },
    });
    const data = await res.json();

    if (data.status) {
      downloadFromPublicDirectory(filename);
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  const deleteFile = async (fileId: string, filename: string) => {
    const res = await fetch("/api/files/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileId, filename }),
      headers: {
        Authorization: "Bearer " + Cookies.get("auth_token"),
      },
    });
    const data = await res.json();

    if (data.status) {
      refresh();

      toast({
        title: "File deleted successfully",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <div className="mt-12 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="h3">Files</h1>
        <Button
          colorScheme="primaryScheme"
          variant="link"
          onClick={() => router.push("/all-files")}
        >
          View all
        </Button>
      </div>
      <div className="my-4 overflow-x-scroll files-table">
        <Table variant="simple" bgColor="white" className="overflow-scroll">
          <Thead>
            <Tr>
              <Th py="5" color="primaryVariant">
                Name
              </Th>
              <Th color="primaryVariant">File Format</Th>
              <Th color="primaryVariant">Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file) => {
              const ext = getExtensionFromFilename(file.name).toUpperCase();

              return (
                <Tr key={file._id}>
                  <Td py="5" className="w-[180px]">
                    <div className="flex items-center w-[180px]">
                      {ext === "PDF" ? (
                        <VscFilePdf size={25} color={customColors.error} />
                      ) : ext === "PNG" || ext === "JPG" || ext === "JPEG" ? (
                        <AiOutlineFileImage
                          size={25}
                          color={customColors.error}
                        />
                      ) : ext === "XLSX" ? (
                        <AiOutlineFileWord
                          size={25}
                          color={customColors.error}
                        />
                      ) : ext === "MP4" || ext === "MKV" || ext === "AVI" ? (
                        <FaRegFileVideo size={25} color={customColors.error} />
                      ) : ext === "MP3" ? (
                        <FaRegFileAudio size={25} color={customColors.error} />
                      ) : (
                        <AiOutlineFileUnknown
                          size={25}
                          color={customColors.error}
                        />
                      )}
                      <p
                        className="ml-4 text-md font-semibold w-[150px] hover:cursor-pointer hover:text-primary"
                        onClick={() => downloadFile(file.name)}
                      >
                        {file.name}
                      </p>
                    </div>
                  </Td>
                  <Td className="text-md text-[#949bc1]">{ext}</Td>
                  <Td className="w-[290px]">
                    <div className="flex justify-between items-center w-[290px]">
                      <p className="text-md text-[#949bc1]">
                        {format(new Date(file.createdAt), "yyyy-MMM-dd")}
                      </p>
                      <Menu>
                        <MenuButton
                          border="none"
                          as={IconButton}
                          aria-label="Options"
                          icon={
                            <BiDotsHorizontalRounded
                              size={24}
                              color={customColors.disabledVariant}
                            />
                          }
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem
                            icon={<MdOutlineDelete />}
                            onClick={() => deleteFile(file._id, file.name)}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {files.length <= 0 && (
          <div className="flex justify-center items-center p-6 bg-[white]">
            <h2 className="font-bold text-2xl text-disabledVariant">
              No Files
            </h2>
          </div>
        )}
      </div>
      <style jsx>
        {`
          @media only screen and (min-width: 775px) {
            .files-table {
              overflow-x: hidden;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FilesSection;
