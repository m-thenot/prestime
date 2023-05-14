"use client";

import Image from "next/image";
import { IServiceBannerFields } from "types/contentful";
import RichText from "@components/RichText";
import { contentfulLoader } from "@utils/contenful";
import { LinkButton } from "@components/Button";

interface IBannerProps {
  content: IServiceBannerFields;
  slug: string;
}

const Banner: React.FC<IBannerProps> = ({ content, slug }) => {
  return (
    <div className="mt-16 flex items-center justify-between mb-12 ">
      <div className="md:max-w-[45%] lg:max-w-md xl:max-w-lg sm:mr-8">
        <h1 className="text-3xl">{content.title}</h1>

        <RichText
          document={content.subtitle.json}
          textClassName="mt-5 text-slate-500"
        />
        {content.bookCta && (
          <LinkButton href={`/booking/${slug}`} className="mt-5 max-w-xs">
            {content.bookCta}
          </LinkButton>
        )}
      </div>
      <div className="relative ml-16 mr-6 hidden md:block">
        <Image
          src={content.image.url}
          alt=""
          priority
          loader={contentfulLoader}
          width={538}
          height={385}
          className="rounded-2xl"
        />
        <div className="-z-10 w-24 h-24 lg:w-40 lg:h-40  bg-zinc-700 rounded-full absolute bottom-1/4 lg:-left-14 -left-10" />
        <div className="z-10 w-12 h-12 bg-primary-200 rounded-full absolute bottom-3/4 -right-6" />
      </div>
    </div>
  );
};

export default Banner;
