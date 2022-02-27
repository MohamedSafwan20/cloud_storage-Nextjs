import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  AiOutlineFileImage,
  AiOutlineFilePdf,
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
import { getExtensionFromFilename } from "../../utils/utils";

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
  const router = useRouter();

  const ext = getExtensionFromFilename(file.name).toUpperCase();

  return (
    <div
      className={
        "card cursor-pointer flex flex-col justify-around p-3 m-4 " + className
      }
      onClick={() => {
        router.push("/folder/23");
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
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      <div>
        <h4 className="h4">
          {file.name.length > 15
            ? `${file.name.substring(0, 15)}...`
            : file.name}
        </h4>
      </div>
    </div>
  );
};

export default FileCard;
