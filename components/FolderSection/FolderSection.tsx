import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { BsFillFolderFill } from "react-icons/bs";
import customColors from "../../config/colors";
import Link from "next/link";

const FolderSection: NextPage = () => {
  return (
    <div className="mt-12 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="h3">Folders</h1>
        <Button colorScheme="primaryScheme" variant="link">
          View all
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-center flex-wrap">
        <Link href="/folder/23" passHref>
          <a className="card w-1/4 cursor-pointer flex flex-col justify-center p-3 m-4">
            <div className="flex justify-between w-full">
              <BsFillFolderFill size={46} color={customColors.primary} />
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
                  <MenuItem icon={<MdOutlineDelete />}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div>
              <h4 className="h4">Folder Name</h4>
              <p className="text-disabledVariant text-[0.86em]">
                1 folders, 123 files
              </p>
            </div>
          </a>
        </Link>
        <div className="card w-1/4 cursor-pointer flex flex-col justify-center p-3 m-4">
          <div className="flex justify-between w-full">
            <BsFillFolderFill size={46} color={customColors.primary} />
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
                <MenuItem icon={<MdOutlineDelete />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div>
            <h4 className="h4">Folder Name</h4>
            <p className="text-disabledVariant text-[0.86em]">
              1 folders, 123 files
            </p>
          </div>
        </div>
        <div className="card w-1/4 cursor-pointer flex flex-col justify-center p-3 m-4">
          <div className="flex justify-between w-full">
            <BsFillFolderFill size={46} color={customColors.primary} />
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
                <MenuItem icon={<MdOutlineDelete />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div>
            <h4 className="h4">Folder Name</h4>
            <p className="text-disabledVariant text-[0.86em]">
              1 folders, 123 files
            </p>
          </div>
        </div>
        <div className="card w-1/4 cursor-pointer flex flex-col justify-center p-3 m-4">
          <div className="flex justify-between w-full">
            <BsFillFolderFill size={46} color={customColors.primary} />
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
                <MenuItem icon={<MdOutlineDelete />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div>
            <h4 className="h4">Folder Name</h4>
            <p className="text-disabledVariant text-[0.86em]">
              1 folders, 123 files
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderSection;
