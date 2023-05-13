import Faq from "@components/Faq";
import Tag from "@components/Tag";
import { IFaqFields } from "types/contentful";

interface IFaqPageProps {
  options: IFaqFields[];
}

const FaqPage: React.FC<IFaqPageProps> = ({ options }) => {
  return (
    <section className="section-bg px-5 py-6">
      <Tag text="Foire aux questions" className="m-auto" />
      <h1 className="text-center mt-2 mb-3 sm:mb-0">
        Vous demandez ? Nous répondons !
      </h1>
      <Faq hasTitle={false} options={options} />
    </section>
  );
};

export default FaqPage;
