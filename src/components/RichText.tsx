import { BLOCKS, Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ReactNode } from "react";

interface IRichTextProps {
  document: Document;
  textClassName?: string;
  iconList?: React.ReactNode;
}

const RichText: React.FC<IRichTextProps> = ({
  document,
  textClassName,
  iconList,
}) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
        <p className={textClassName}>{children}</p>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: ReactNode) => (
        <li className="flex items-center mb-5">
          {iconList && <span className="mr-4">{iconList}</span>}
          {children}
        </li>
      ),
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
};

export default RichText;
