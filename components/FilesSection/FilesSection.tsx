import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import customColors from "../../config/colors";

const FilesSection: NextPage = () => {
  const router = useRouter();

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
              <Th color="primaryVariant">Last Opened</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td py="5" className="w-[180px]">
                <div className="flex items-center w-[180px]">
                  <VscFilePdf size={25} color={customColors.error} />
                  <p className="ml-4 text-md font-semibold">Filename</p>
                </div>
              </Td>
              <Td className="text-md text-[#949bc1]">PDF</Td>
              <Td className="w-[290px]">
                <div className="flex justify-between items-center w-[290px]">
                  <p className="text-md text-[#949bc1]">2022-Jan-30</p>
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
              </Td>
            </Tr>
            <Tr>
              <Td py="5" className="w-[180px]">
                <div className="flex items-center w-[180px]">
                  <VscFilePdf size={25} color={customColors.error} />
                  <p className="ml-4 text-md font-semibold">Filename</p>
                </div>
              </Td>
              <Td className="text-md text-[#949bc1]">PDF</Td>
              <Td className="w-[290px]">
                <div className="flex justify-between items-center w-[290px]">
                  <p className="text-md text-[#949bc1]">2022-Jan-30</p>
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
              </Td>
            </Tr>
            <Tr>
              <Td py="5" className="w-[180px]">
                <div className="flex items-center w-[180px]">
                  <VscFilePdf size={25} color={customColors.error} />
                  <p className="ml-4 text-md font-semibold">Filename</p>
                </div>
              </Td>
              <Td className="text-md text-[#949bc1]">PDF</Td>
              <Td className="w-[290px]">
                <div className="flex justify-between items-center w-[290px]">
                  <p className="text-md text-[#949bc1]">2022-Jan-30</p>
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
              </Td>
            </Tr>
          </Tbody>
        </Table>
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
