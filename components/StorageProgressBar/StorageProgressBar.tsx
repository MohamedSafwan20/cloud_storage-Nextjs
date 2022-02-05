import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import type { NextPage } from "next";
import { TOTAL_STORAGE_CAPACITY } from "../../config/constants";

const StorageProgressBar: NextPage = () => {
  const currValue = 20;

  return (
    <div className="w-[80%] mx-auto my-12 home_progress">
      <CircularProgress
        value={currValue}
        max={parseInt(TOTAL_STORAGE_CAPACITY)}
        color="primary"
        thickness="12px"
        size="65%"
      >
        <CircularProgressLabel fontSize="1.3em">
          <div>
            <h3 className="font-bold text-primary text-2xl my-0.5">
              {currValue} GB
            </h3>
            <p className="text-disabledVariant text-xs">Used of 40 GB</p>
          </div>
        </CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default StorageProgressBar;
