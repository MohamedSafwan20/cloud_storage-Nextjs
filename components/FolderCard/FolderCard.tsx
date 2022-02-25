import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillFolderFill } from "react-icons/bs";
import { FaHeartBroken } from "react-icons/fa";
import {
  MdDelete,
  MdOutlineFavorite,
  MdSettingsBackupRestore,
} from "react-icons/md";
import customColors from "../../config/colors";

interface FolderCardProps {
  className?: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
  folderName: string;
}

const FolderCard: NextPage<FolderCardProps> = (props: FolderCardProps) => {
  const router = useRouter();

  return (
    <div
      className={
        "card cursor-pointer flex flex-col justify-center p-3 m-4 folder " +
        props.className
      }
      onClick={() => {
        router.push("/folder/23");
      }}
    >
      <div className="flex justify-between w-full">
        <BsFillFolderFill size={46} color={customColors.primary} />
        {props.isFavorite ? (
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
        ) : props.isDeleted ? (
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
                    color={customColors.warning}
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
          {props.folderName.length > 15
            ? `${props.folderName.substring(0, 15)}...`
            : props.folderName}
        </h4>
        <p className="text-disabledVariant text-[0.86em]">
          1 folders, 123 files
        </p>
      </div>
      <style jsx>{`
        @media screen and (max-width: 570px) {
          .folder {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default FolderCard;
