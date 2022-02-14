import {
  Alert,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { CgPassword } from "react-icons/cg";
import { HiArrowNarrowRight } from "react-icons/hi";
import { MdError, MdOutlineMailOutline } from "react-icons/md";
import img from "../../assets/images/login-signup.svg";
import Routes from "../../config/routes";

const Login: NextPage = () => {
  const router = useRouter();
  const validator = require("validator");
  const toast = useToast();
  const toastRef = useRef<string>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (email === "" && password === "") {
      setError("Please fill all the fields");
      return;
    }
    if (!validator.isEmail(email.trim())) {
      setError("Invalid email");
      return;
    }
    if (password.length <= 4) {
      setError("Invalid password");
      return;
    }

    toastRef.current = toast({
      title: "Loading..",
      status: "info",
    }) as string;

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status) {
      toast({
        title: "Login Success",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.replace("/");
    } else {
      setError(data.message);
    }

    toast.close(toastRef.current);
  };

  return (
    <main>
      <div className="lg:flex justify-between md:block">
        <div className="lg:w-[50vw] flex justify-center h-[100vh] py-6 px-12 flex-col md:w-[70vw] md:mx-auto">
          <h1 className="h1 my-16">Sign In</h1>
          {error && (
            <Alert status="error" p="4">
              <Icon as={MdError} boxSize={5} color="error" mr={2} />
              {error}
            </Alert>
          )}
          <form method="POST" onSubmit={(e) => loginUser(e)}>
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
              <div className="text-right my-2">
                <p className="text-warning text-sm font-semibold cursor-pointer">
                  Forgot password&nbsp;?
                </p>
              </div>
            </div>
            <div className="mt-5 ml-2">
              <IconButton
                rounded={20}
                className="shadow-2xl"
                colorScheme="primaryScheme"
                size="lg"
                icon={<HiArrowNarrowRight />}
                aria-label="Sign in"
                type="submit"
              />
            </div>
            <div className="my-10 ml-2">
              <p className="text-sm font-semibold">
                Need an account?&nbsp;{" "}
                <Link href={Routes.Register}>
                  <a className="text-primary">Sign up here</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="w-[50vw] lg:flex justify-center items-center h-[100vh] md:hidden">
          <Image src={img} alt="Login" width={480} height={400} />
        </div>
      </div>
    </main>
  );
};

export default Login;
