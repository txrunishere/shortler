import { BarLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="px-2 sm:px-4">
      <BarLoader color="white" width={"100%"} />
    </div>
  );
};
