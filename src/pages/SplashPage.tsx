import { PointsLoader } from "@/shared/components/PointsLoader";

export const SplashPage = () => {
  return (
    <div dir="ltr" className=" flex justify-center items-center h-full w-full ">
      <img className="   w-40" src="/logo.png" alt="" />
      <PointsLoader />
    </div>
  );
};
