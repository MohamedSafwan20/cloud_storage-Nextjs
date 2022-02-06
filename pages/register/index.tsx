import {
  Checkbox,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { CgPassword } from "react-icons/cg";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  MdOutlineConfirmationNumber,
  MdOutlineMailOutline,
} from "react-icons/md";
import img from "../../assets/images/login-signup.svg";

const Register: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();

    if (isTermsAccepted) {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Successfully registered");
      }
    }
  };

  return (
    <main>
      <div className="flex justify-between">
        <div className="w-[50vw] flex justify-center h-[100vh] py-6 px-12 flex-col">
          <h1 className="h1 my-16">Sign up</h1>
          <form method="POST" onSubmit={(e) => registerUser(e)}>
            <div className="mt-3 mb-5">
              <p className="mb-2 ml-2 font-medium text-sm">Email</p>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300">
                  <MdOutlineMailOutline />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <Input
                  type="password"
                  name="password"
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                <Input
                  type="password"
                  name="confirm_password"
                  size="lg"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputGroup>
            </div>
            <Checkbox
              className="mb-5 ml-2"
              colorScheme="primaryScheme"
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            >
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
          <Image src={img} alt="Register" width={480} height={400} />
        </div>
      </div>
    </main>
  );
};

export default Register;
