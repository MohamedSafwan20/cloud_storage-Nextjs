import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import {
  AiOutlineFileImage,
  AiOutlineFileUnknown,
  AiOutlineFileWord,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaHeartBroken, FaRegFileAudio, FaRegFileVideo } from "react-icons/fa";
import {
  MdDelete,
  MdOutlineFavorite,
  MdSettingsBackupRestore,
} from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import customColors from "../../config/colors";
import IFileOrFolder from "../../models/IFileOrFolder";
import {
  downloadFromPublicDirectory,
  getExtensionFromFilename,
  refresh,
} from "../../utils/utils";

interface FileCardProps {
  className?: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
  file: IFileOrFolder;
}

const FileCard: NextPage<FileCardProps> = ({
  className,
  isFavorite = false,
  isDeleted = false,
  file,
}: FileCardProps) => {
  const toast = useToast();

  const ext = getExtensionFromFilename(file.name).toUpperCase();

  const downloadFile = async () => {
    const res = await fetch("/api/files/download", {
      method: "POST",
      body: JSON.stringify({ fileId: file._id }),
      headers: {
        Authorization: "Bearer " + Cookies.get("auth_token"),
      },
    });
    const data = await res.json();

    if (data.status) {
      downloadFromPublicDirectory(file.name);
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  const deleteFile = async () => {
    const res = await fetch("/api/files/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileId: file._id, filename: file.name }),
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
    <div
      className={
        "card cursor-pointer flex flex-col justify-around p-3 m-4 mb-10 " +
        className
      }
      onClick={() => {
        downloadFile();
      }}
    >
      <div className="flex justify-between w-full">
        {ext === "PDF" ? (
          <VscFilePdf size={35} color={customColors.error} />
        ) : ext === "PNG" || ext === "JPG" || ext === "JPEG" ? (
          <AiOutlineFileImage size={35} color={customColors.error} />
        ) : ext === "XLSX" ? (
          <AiOutlineFileWord size={35} color={customColors.error} />
        ) : ext === "MP4" || ext === "MKV" || ext === "AVI" ? (
          <FaRegFileVideo size={35} color={customColors.error} />
        ) : ext === "MP3" ? (
          <FaRegFileAudio size={35} color={customColors.error} />
        ) : (
          <AiOutlineFileUnknown size={35} color={customColors.error} />
        )}
        {isFavorite ? (
          <Menu>
            <MenuButton
              onClick={(e) => {
                e.stopPropagation();
              }}
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
                icon={<FaHeartBroken color={customColors.error} size={20} />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Remove from favorites
              </MenuItem>
            </MenuList>
          </Menu>
        ) : isDeleted ? (
          <Menu>
            <MenuButton
              onClick={(e) => {
                e.stopPropagation();
              }}
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
                icon={
                  <MdSettingsBackupRestore
                    color={customColors.error}
                    size={20}
                  />
                }
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Restore
              </MenuItem>
              <MenuItem
                icon={<MdDelete color={customColors.error} size={20} />}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile();
                }}
              >
                Permanently delete
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton
              onClick={(e) => {
                e.stopPropagation();
              }}
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
                icon={
                  <MdOutlineFavorite color={customColors.warning} size={20} />
                }
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Add to favorites
              </MenuItem>
              <MenuItem
                icon={<MdDelete color={customColors.error} size={20} />}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile();
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      <div>
        <Tooltip label={`Download ${file.name}`}>
          <h4 className="h4">
            {file.name.length > 15
              ? `${file.name.substring(0, 15)}...`
              : file.name}
          </h4>
        </Tooltip>
      </div>
    </div>
  );
};

export default FileCard;
