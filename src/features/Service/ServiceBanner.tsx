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
    <div className="container mt-16 flex items-center justify-between mb-12 ">
      <div className="md:max-w-[45%] lg:max-w-md xl:max-w-lg sm:mr-8">
        <h1 className="text-3xl">{content.title}</h1>

        <RichText
          document={content.subtitle.json}
          textClassName="mt-5 text-slate-500"
        />
        {content.bookCta && (
          <div className="z-10 sm:relative fixed bottom-0 py-5 px-5 bg-white w-screen -translate-x-5 sm:px-0 sm:py-0 sm:w-auto sm:translate-x-0">
            <LinkButton
              href={`/booking/${slug}`}
              className="sm:mt-5 sm:max-w-xs"
            >
              {content.bookCta}
            </LinkButton>

            {content.proLink && (
              <LinkButton
                variant="link"
                isUnderlined
                href="/pro/sign-up"
                className="mt-3 sm:mt-4 font-semibold sm:max-w-xs"
              >
                {content.proLink}
              </LinkButton>
            )}
          </div>
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
