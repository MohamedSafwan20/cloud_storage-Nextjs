import { Avatar, IconButton, Slide, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiUser3Line } from "react-icons/ri";
import { VscFiles } from "react-icons/vsc";
import logo from "../../assets/images/logo.png";

const SideNavbar: NextPage = () => {
  const router = useRouter();

  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      {/* Mobile navbar */}
      <div
        className={
          "absolute z-20 p-2 transition-all duration-[800ms] lg:hidden " +
          (isOpen ? "ml-[80px]" : "")
        }
      >
        <IconButton
          onClick={onToggle}
          aria-label="menu"
          bgColor="transparent"
          size="sm"
        >
          {isOpen ? <IoIosClose size={22} /> : <BiMenu size={22} />}
        </IconButton>
      </div>

      <Slide
        direction="left"
        in={isOpen}
        style={{ zIndex: 10 }}
        className="lg:hidden"
      >
        <nav className="flex justify-between items-center flex-col max-w-[72px] bg-primary fixed h-[100%]">
          <div className="flex justify-center items-center flex-col">
            <Link href="/">
              <a className="mb-6 py-3 px-4">
                <Image src={logo} alt="logo" />
              </a>
            </Link>
            <div className="w-full">
              <Link href="/">
                <a
                  className={
                    router.pathname === "/" ||
                    router.pathname.includes("/folder") ||
                    router.pathname.includes("/all-folders") ||
                    router.pathname.includes("/all-files")
                      ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                      : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
                  }
                >
                  <VscFiles size={20} color="white" />
                </a>
              </Link>
              <Link href="/favorites">
                <a
                  className={
                    router.pathname === "/favorites"
                      ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                      : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
                  }
                >
                  <AiOutlineHeart size={20} color="white" />
                </a>
              </Link>
              <Link href="/recycle-bin">
                <a
                  className={
                    router.pathname.includes("/recycle-bin")
                      ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                      : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
                  }
                >
                  <RiDeleteBin6Line size={20} color="white" />
                </a>
              </Link>
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
      </Slide>
      {/* End of Mobile navbar */}

      <nav className="lg:flex hidden justify-between items-center flex-col max-w-[72px] bg-primary fixed h-[100%]">
        <div className="flex justify-center items-center flex-col">
          <Link href="/">
            <a className="mb-6 py-3 px-4">
              <Image src={logo} alt="logo" />
            </a>
          </Link>
          <div className="w-full">
            <Link href="/">
              <a
                className={
                  router.pathname === "/" ||
                  router.pathname.includes("/folder") ||
                  router.pathname.includes("/all-folders") ||
                  router.pathname.includes("/all-files")
                    ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                    : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
                }
              >
                <VscFiles size={20} color="white" />
              </a>
            </Link>
            <Link href="/favorites">
              <a
                className={
                  router.pathname === "/favorites"
                    ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                    : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
                }
              >
                <AiOutlineHeart size={20} color="white" />
              </a>
            </Link>
            <Link href="/recycle-bin">
              <a
                className={
                  router.pathname.includes("/recycle-bin")
                    ? "flex justify-center items-center py-5 cursor-pointer bg-opacity-10 bg-disabled relative after:container after:absolute after:left-0 after:w-1 after:h-full after:bg-disabled"
                    : "transition-all duration-300 flex justify-center items-center py-5 cursor-pointer hover:bg-opacity-10 hover:bg-disabled relative hover:after:container hover:after:absolute hover:after:left-0 hover:after:w-1 hover:after:h-full hover:after:bg-disabled"
                }
              >
                <RiDeleteBin6Line size={20} color="white" />
              </a>
            </Link>
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
    </>
  );
};

export default SideNavbar;
