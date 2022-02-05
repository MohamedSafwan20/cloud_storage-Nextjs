import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type { NextPage } from "next";
import { FiSearch } from "react-icons/fi";
import FilesSection from "../components/FilesSection/FilesSection";
import FolderSection from "../components/FolderSection/FolderSection";
import Root from "../components/Root";
import StorageProgressBar from "../components/StorageProgressBar/StorageProgressBar";
import StorageUpgradeSection from "../components/StorageUpgradeSection/StorageUpgradeSection";
import customColors from "../config/colors";

const HomePage: NextPage = () => {
  return (
    <Root>
      <div className="flex">
        <div className="w-[70%] bg-disabled p-4 py-8">
          <div className="w-[90%] mx-auto">
            <div className="w-[80%] mx-auto">
              <InputGroup bgColor="white" boxShadow="sm">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color={customColors.primaryVariant} />
                </InputLeftElement>
                <Input placeholder="Search Files" border="none" />
              </InputGroup>
            </div>
            <FolderSection />
            <FilesSection />
          </div>
        </div>
        <div className="w-[30%] flex justify-between flex-col">
          <StorageProgressBar />
          <StorageUpgradeSection />
        </div>
      </div>
    </Root>
  );
};

export default HomePage;
