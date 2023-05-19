import RichText from "@components/RichText";
import Tag from "@components/Tag";
import { Form, Notification, UserSettings } from "@icons";
import { IHowItWorksFields } from "types/contentful";

interface IProHowItWorksProps {
  content: IHowItWorksFields;
}

const icons = [
  <Form key={1} />,
  <UserSettings key={2} />,
  <Notification key={3} />,
];

const ProHowItWorks: React.FC<IProHowItWorksProps> = ({ content }) => {
  return (
    <section className="container py-12 max-w-4xl m-auto flex flex-col items-center">
      <Tag text={content.tagLabel} />
      <h2 className="mt-2 mb-12 text-center">{content.title}</h2>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
        {content.itemsCollection.items.map((item, index) => (
          <div
            key={item.title}
            className="flex md:flex-col items-center justify-center md:justify-start w-full md:w-fit"
          >
            <div className="bg-white p-3 rounded-full border border-primary-100 mb-7 relative">
              {icons[index]}
              {index === 0 && (
                <div className="md:border-t md:border-l-0 border-l border-slate-200 absolute top-12 left-6 md:left-0 md:top-[26px] h-[320px] md:w-[615px] md:max-w-[calc(100vw-280px)] -z-10" />
              )}
            </div>
            <div className="max-w-xs ml-6 md:ml-0">
              <p className="font-bold  md:text-center">{item.title}</p>
              <RichText
                document={item.text.json}
                textClassName="md:text-center"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProHowItWorks;
