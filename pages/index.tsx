import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type { NextPage } from "next";
import Root from "../components/Root";
import { FiSearch } from "react-icons/fi";
import customColors from "../config/colors";
import FolderSection from "../components/FolderSection/FolderSection";

const HomePage: NextPage = () => {
  return (
    <Root>
      <div className="flex">
        <div className="ml-[72px] w-[70%] bg-disabled p-4">
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
          </div>
        </div>
        <div className="w-[30%] bg-error">sdf</div>
      </div>
    </Root>
  );
};

export default HomePage;
