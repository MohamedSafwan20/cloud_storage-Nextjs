/* eslint-disable react-hooks/exhaustive-deps */
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { FiSearch } from "react-icons/fi";
import FilesSection from "../components/FilesSection/FilesSection";
import FolderSection from "../components/FolderSection/FolderSection";
import Root from "../components/Root";
import StorageProgressBar from "../components/StorageProgressBar/StorageProgressBar";
import StorageUpgradeSection from "../components/StorageUpgradeSection/StorageUpgradeSection";
import customColors from "../config/colors";
import Routes from "../config/routes";
import IFileOrFolder from "../models/IFileOrFolder";
import AuthService from "../services/authService";
import FileService from "../services/fileService";
import FolderService from "../services/folderService";

type Props = {
  folders: string;
  files: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.headers.cookie?.split("=")[1]!!;

  let isAuthenticated = AuthService.isUserAuthenticated(authToken);

  const folders = await FolderService.getAllFolders(authToken);
  const files = await FileService.getAllFiles(authToken);

  if (!isAuthenticated)
    return {
      redirect: {
        permanent: true,
        destination: Routes.Login,
      },
    };

  return {
    props: {
      folders: JSON.stringify(folders),
      files: JSON.stringify(files),
    },
  };
};

const HomePage: NextPage<Props> = (props) => {
  const folders = JSON.parse(props.folders) as Array<IFileOrFolder>;
  const files = JSON.parse(props.files) as Array<IFileOrFolder>;

  return (
    <Root>
      <div className="lg:flex md:block">
        <div className="lg:w-[70%] bg-disabled p-4 py-8 md:w-[100%] md:mx-auto">
          <div className="w-[90%] mx-auto mt-4">
            <div className="w-[80%] mx-auto">
              <InputGroup bgColor="white" boxShadow="sm">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color={customColors.primaryVariant} />
                </InputLeftElement>
                <Input placeholder="Search Files" border="none" />
              </InputGroup>
            </div>
            <FolderSection folders={folders} />
            <FilesSection filesData={files} />
          </div>
        </div>
        <div className="lg:w-[30%] sm:flex sm:justify-between lg:flex-col sm:items-center sm:w-[100%] text-center progress">
          <StorageProgressBar />
          <StorageUpgradeSection />
        </div>
        <style jsx>
          {`
            @media only screen and (min-width: 440px) {
              .progress {
                display: flex;
                justify-content: justify-between;
                align-items: center;
              }
            }
          `}
        </style>
      </div>
    </Root>
  );
};

export default HomePage;
