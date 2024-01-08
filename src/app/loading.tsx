import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="size-full h-dvh w-dvw flex flex-col items-center justify-center p-6 ">
      <Loader className="animate-spin" />
      Loading...
    </div>
  );
};
export default Loading;
