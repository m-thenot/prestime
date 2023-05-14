import { Document } from "@contentful/rich-text-types";

export interface IFaqPageFields {
  faqItemsCollection: {
    items: IFaqFields[];
  };
}

export interface IFaqFields {
  /** question */
  question: string;

  /** answer */
  answer: {
    json: Document;
  };
}

export interface ISEOFields {
  title: string;
  description: string;
}

export interface IServiceFields {
  /** slug */
  slug: string;

  seo: ISEOFields;

  /** banner */
  banner: IServiceBannerFields;

  /** FAQ */
  faqCollection: {
    items: IFaqFields[];
  };
}

export interface IBecomeProfessionalFields {
  seo: ISEOFields;
  title: string;
  argument: {
    json: Document;
  };

  /** FAQ */
  faqCollection: {
    items: IFaqFields[];
  };
}

export interface IServiceBannerFields {
  /** title */
  title: string;

  bookCta?: string;

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
