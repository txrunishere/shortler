import { BarLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="sm:px-4 px-2">
      <BarLoader color="white" width={"100%"} />
    </div>
  );
};
