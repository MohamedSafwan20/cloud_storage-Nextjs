import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import upgradeImg from "../../assets/images/upgrade-storage.png";

const StorageUpgradeSection: NextPage = () => {
  return (
    <div className="w-[80%] mx-auto lg:my-12 md:my-4 home_progress">
      <div className="card flex justify-center items-center lg:p-10 md:p-4 flex-col">
        <Image src={upgradeImg} alt="upgrade-storage" />
        <h4 className="h4 font-bold text-primary">Upgrade account!</h4>
        <p className="text-[0.76em] text-center text-primaryVariant my-2">
          Upgrade to have more storage capacity and advanced features.
        </p>
        <Button colorScheme="primaryScheme" mt="2">
          Upgrade
        </Button>
      </div>
    </div>
  );
};

export default StorageUpgradeSection;
