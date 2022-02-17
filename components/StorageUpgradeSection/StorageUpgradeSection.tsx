import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import upgradeImg from "../../assets/images/upgrade-storage.png";

const StorageUpgradeSection: NextPage = () => {
  return (
    <div className="w-[80%] mx-auto mb-8 lg:my-12 md:my-4 upgrade">
      <div className="card flex justify-center items-center flex-col p-4">
        <Image src={upgradeImg} alt="upgrade-storage" />
        <h4 className="h4 font-bold text-primary">Upgrade account!</h4>
        <p className="text-[0.76em] text-center text-primaryVariant my-2">
          Upgrade to have more storage capacity and advanced features.
        </p>
        <Button colorScheme="primaryScheme" mt="2">
          Upgrade
        </Button>
      </div>
      <style jsx>{`
        @media only screen and (min-width: 440px) {
          .upgrade {
            margin-bottom: 0px;
            padding: 1.6rem;
          }
        }
        @media only screen and (min-width: 1029px) {
          .upgrade {
            margin-bottom: 2rem;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StorageUpgradeSection;
