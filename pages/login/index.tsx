import {
  Checkbox,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { CgPassword } from "react-icons/cg";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  MdOutlineConfirmationNumber,
  MdOutlineMailOutline,
} from "react-icons/md";
import img from "../../assets/images/login-signup.svg";

const Login: NextPage = () => {
  return (
    <main>
      <div className="flex justify-between">
        <div className="w-[50vw] flex justify-center h-[100vh] py-6 px-12 flex-col">
          <h1 className="h1 my-16">Sign up</h1>
          <form method="POST">
            <div className="mt-3 mb-5">
              <p className="mb-2 ml-2 font-medium text-sm">Email</p>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300">
                  <MdOutlineMailOutline />
                </InputLeftElement>
                <Input type="email" name="email" size="lg" />
              </InputGroup>
            </div>
            <div className="mt-3 mb-5">
              <p className="mb-2 ml-2 font-medium text-sm">Password</p>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <CgPassword />
                </InputLeftElement>
                <Input type="password" name="password" size="lg" />
              </InputGroup>
            </div>
            <div className="mt-3 mb-5">
              <p className="mb-2 ml-2 font-medium text-sm">Confirm Password</p>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <MdOutlineConfirmationNumber />
                </InputLeftElement>
                <Input type="password" name="confirm_password" size="lg" />
              </InputGroup>
            </div>
            <Checkbox className="mb-5 ml-2" colorScheme="primaryScheme">
              I&apos;ve read and agree with Terms of service and our Privacy
              policy
            </Checkbox>
            <div className="mt-5 ml-2">
              <IconButton
                rounded={20}
                className="shadow-2xl"
                colorScheme="primaryScheme"
                size="lg"
                icon={<HiArrowNarrowRight />}
                aria-label="Sign up"
                type="submit"
              />
            </div>
            <div className="my-10 ml-2">
              <p className="text-sm font-semibold">
                Already have an account?&nbsp;{" "}
                <span className="text-primary">Sign in</span>
              </p>
            </div>
          </form>
        </div>
        <div className="w-[50vw] flex justify-center items-center h-[100vh]">
          <Image src={img} alt="login" width={480} height={400} />
        </div>
      </div>
    </main>
  );
};

export default Login;
