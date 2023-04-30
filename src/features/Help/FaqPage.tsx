import Faq, { IFaqOption } from "@components/Faq";
import Tag from "@components/Tag";

interface IFaqPageProps {
  options: IFaqOption[];
}

const FaqPage: React.FC<IFaqPageProps> = ({ options }) => {
  return (
    <section className="section-bg">
      <Tag text="Foire aux questions" className="m-auto" />
      <h1 className="text-center mt-2">Vous demandez ? Nous répondons !</h1>
      <Faq hasTitle={false} options={options} />
    </section>
  );
};

export default FaqPage;
