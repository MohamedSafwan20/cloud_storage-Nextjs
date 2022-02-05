import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronRight } from "react-icons/bi";
import FileCard from "../../components/FileCard/FileCard";
import FolderCard from "../../components/FolderCard/FolderCard";
import Root from "../../components/Root";

const Folder: NextPage = () => {
  const router = useRouter();

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
            <BreadcrumbItem className="hover:underline text-primaryVariant font-semibold">
              <BreadcrumbLink as={Link} href={router.asPath}>
                Folder Name
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="mt-[3rem] flex items-center flex-wrap">
          <FolderCard className="w-1/6 h-[130px]" />
          <FolderCard className="w-1/6 h-[130px]" />
          <FolderCard className="w-1/6 h-[130px]" />
          <FolderCard className="w-1/6 h-[130px]" />
          <FileCard className="w-1/6 h-[130px]" />
          <FileCard className="w-1/6 h-[130px]" />
        </div>
      </div>
    </Root>
  );
};

export default Folder;
