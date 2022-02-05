import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronRight } from "react-icons/bi";
import { VscHome } from "react-icons/vsc";
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
        <div>{/* <h1>Folder</h1> */}</div>
      </div>
    </Root>
  );
};

export default Folder;
