import { Asset } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IFaqFields {
  /** question */
  question: string;

  /** answer */
  answer: {
    json: Document;
  };
}

export interface IServiceFields {
  /** slug */
  slug: string;

  /** banner */
  banner: IServiceBannerFields;

  /** FAQ */
  faqCollection: {
    items: IFaqFields[];
  };
}

export interface IServiceBannerFields {
  /** title */
  title: string;

  /** subtitle */
  subtitle: {
    json: Document;
  };

  /** image */
  image: IContentfulImage;
}

interface IContentfulImage {
  url: string;
  width: number;
  height: number;
  title: string;
}
