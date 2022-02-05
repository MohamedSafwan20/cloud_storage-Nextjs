import { Avatar } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { VscFiles } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiUser3Line } from "react-icons/ri";
import logo from "../../assets/images/logo.png";
import { useRouter } from "next/router";
import Link from "next/link";

const SideNavbar: NextPage = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center flex-col max-w-[72px] h-screen bg-primary fixed">
      <div className="flex justify-center items-center flex-col">
        <div className="mb-6 py-3 px-4">
          <Image src={logo} alt="logo" />
        </div>
        <div className="w-full">
          <Link href="/">
            <a
              className={
                router.pathname === "/" || router.pathname.includes("/folder")
                  ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                  : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
              }
            >
              <VscFiles size={20} color="white" />
            </a>
          </Link>
          <div
            className={
              router.pathname === "/favorite"
                ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
            }
          >
            <AiOutlineHeart size={20} color="white" />
          </div>
          <div
            className={
              router.pathname === "/bin"
                ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
            }
          >
            <RiDeleteBin6Line size={20} color="white" />
          </div>
          <div
            className={
              router.pathname === "/profile"
                ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
            }
          >
            <RiUser3Line size={20} color="white" />
          </div>
          <div
            className={
              router.pathname === "/settings"
                ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
            }
          >
            <IoSettingsOutline size={20} color="white" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="rounded-[50%] border-disabled border-2">
          <Avatar name="John Smith" src="https://bit.ly/dan-abramov" />
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
