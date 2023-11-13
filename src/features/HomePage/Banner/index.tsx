"use client";

import Image from "next/image";
import HouseKeeperImage from "@images/housekeeper.png";
import ElectricianImage from "@images/electrician.jpg";
import Search from "@components/Search";

const Banner: React.FC = () => {
  return (
    <div className="container mt-16 flex items-center justify-between mb-16">
      <div className="md:max-w-[45%] lg:max-w-md xl:max-w-lg sm:mr-8">
        <h1 className="text-3xl">Des services de qualité, à la demande</h1>
        <p className="mt-5 text-slate-500">
          Prestime vous fait profiter de son réseau de professionels à Djibouti,
          afin que vous puissiez réserver une prestation en quelques clics.
        </p>

        <Search />
        <p className="ml-4 mt-2 text-xs text-slate-500">
          Ex: Coiffure, coach de sport, électricien...
        </p>
      </div>
      <div className="relative ml-16 mr-6 hidden md:block">
        <Image
          src={ElectricianImage}
          alt=""
          priority
          placeholder="blur"
          width={538}
          height={385}
          style={{ borderTopLeftRadius: "90px" }}
          className="rounded-2xl"
        />
        <div className="w-16 h-16 lg:w-24 lg:h-24 absolute -left-6 -top-4 lg:-left-12 lg:-top-6">
          <Image
            src={HouseKeeperImage}
            alt=""
            placeholder="blur"
            priority
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
        </div>
        <div className="-z-10 w-24 h-24 lg:w-40 lg:h-40  bg-zinc-700 rounded-full absolute bottom-1/4 lg:-left-14 -left-10" />
        <div className="z-10 w-12 h-12 bg-primary-200 rounded-full absolute bottom-3/4 -right-6" />
      </div>
    </div>
  );
};

export default Banner;
