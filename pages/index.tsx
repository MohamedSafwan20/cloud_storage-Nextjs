import { Badge, Button } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Button colorScheme="primaryScheme">Button</Button>
      <Badge bgColor="warning">Default</Badge>
      <h1 className="text-center my-24 text-error tracking-tight text-6xl">
        Our homepage
      </h1>
    </div>
  );
};

export default Home;
