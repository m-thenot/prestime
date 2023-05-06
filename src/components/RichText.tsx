import { BLOCKS, Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ReactNode } from "react";

interface IRichTextProps {
  document: Document;
  textClassName?: string;
}

const RichText: React.FC<IRichTextProps> = ({ document, textClassName }) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
        <p className={textClassName}>{children}</p>
      ),
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
};

export default RichText;
