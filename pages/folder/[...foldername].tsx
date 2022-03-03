/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronRight } from "react-icons/bi";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";
import connectToDb from "../../config/db";
import Routes from "../../config/routes";
import IFileOrFolder from "../../models/IFileOrFolder";
import AuthService from "../../services/authService";
import FolderService from "../../services/folderService";

type Props = {
  data: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.headers.cookie?.split("=")[1];

  const userId = AuthService.isUserAuthenticated(authToken);

  if (!userId)
    return {
      redirect: {
        permanent: true,
        destination: Routes.Login,
      },
    };

  await connectToDb();

  const queryArray = context.query.foldername as string[];
  const path = `/${queryArray.join("/")}`;
  const data = await FolderService.getFoldersAndFilesOfPath(
    userId as string,
    path
  );

  return {
    props: { data: JSON.stringify(data) },
  };
};

const Folder: NextPage<Props> = (props) => {
  const router = useRouter();

  const foldersAndFiles = JSON.parse(props.data) as Array<IFileOrFolder>;

  return (
    <Root>
      <div className="p-16">
        <div>
          <Breadcrumb spacing="6px" separator={<BiChevronRight size={20} />}>
            <BreadcrumbItem className="hover:underline">
              <BreadcrumbLink as={Link} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {foldersAndFiles.map((item) => {
              if (item.type == "folder") {
                return (
                  <BreadcrumbItem
                    key={item._id}
                    className={
                      "hover:underline " +
                      (foldersAndFiles.indexOf(item) ===
                      foldersAndFiles.length - 1
                        ? "text-primaryVariant font-semibold"
                        : "")
                    }
                  >
                    <BreadcrumbLink as={Link} href={item.path}>
                      {item.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              }
            })}
          </Breadcrumb>
        </div>
        <div className="mt-[3rem] flex items-center flex-wrap">
          {foldersAndFiles.map((item) => {
            if (item.type === "file") {
              return (
                <FileCard
                  key={item._id}
                  file={item}
                  className="w-1/6 h-[120px]"
                />
              );
            }
            return (
              <FolderCard
                key={item._id}
                className="w-1/6 mb-10"
                folderName={item.name}
              />
            );
          })}
        </div>
      </div>
    </Root>
  );
};

export default Folder;
