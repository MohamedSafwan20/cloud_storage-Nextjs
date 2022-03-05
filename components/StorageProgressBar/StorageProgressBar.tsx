import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import type { NextPage } from "next";
import { TOTAL_STORAGE_CAPACITY } from "../../config/constants";
import { formatBytes } from "../../utils/utils";

type Props = {
  allFilesSize: number;
};

const StorageProgressBar: NextPage<Props> = (props) => {
  const usedSize = props.allFilesSize;

  return (
    <div className="w-[80%] mx-auto my-12 home_progress">
      <CircularProgress
        value={usedSize}
        max={TOTAL_STORAGE_CAPACITY}
        color="primary"
        thickness="12px"
        size="65%"
      >
        <CircularProgressLabel fontSize="1.3em">
          <div>
            <h3 className="font-bold text-primary text-2xl my-0.5">
              {formatBytes(usedSize)}
            </h3>
            <p className="text-disabledVariant text-xs">
              Used of {formatBytes(TOTAL_STORAGE_CAPACITY)}
            </p>
          </div>
        </CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default StorageProgressBar;
