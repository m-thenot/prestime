import { BLOCKS, Document } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { ReactNode } from "react";

interface IRichTextProps {
  document: Document;
  textClassName?: string;
  customOptions?: Options;
}

const RichText: React.FC<IRichTextProps> = ({
  document,
  textClassName,
  customOptions,
}) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
        <p className={textClassName}>{children}</p>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: ReactNode) => (
        <ul className="list-disc pl-4">{children}</ul>
      ),
    },
  };

  return <>{documentToReactComponents(document, customOptions || options)}</>;
};

export default RichText;
