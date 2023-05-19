import "server-only";
import Tag from "@components/Tag";

const AboutUs: React.FC = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center mt-5">
        <Tag text="À Propos" />
        <h1 className="text-center mt-2 max-w-md">Qui sommes-nous ?</h1>
      </div>
      <div className="max-w-2xl mx-auto my-5 sm:my-10">
        <p>
          Nous sommes EasyService, la première plateforme de services à la
          demande à Djibouti.
        </p>
        <p>
          Nous sommes une plateforme de mise en relation qui connecte les
          clients avec des partenaires professionnels, offrant une expérience
          sans tracas pour les deux parties.
        </p>
        <h2 className="text-lg mt-6 mb-2">
          Nous voulons faciliter votre quotidien
        </h2>
        <p>
          Notre objectif est de permettre aux clients de trouver facilement les
          services dont ils ont besoin et aux partenaires professionnels de
          développer leurs activités. Que vous ayez besoin d&lsquo;une femme de
          ménage pour votre maison, d&lsquo;un réparateur pour votre voiture ou
          d&lsquo;un professeur particulier pour votre enfant, nous avons ce
          qu&lsquo;il vous faut. En quelques clics, vous pouvez trouver et
          réserver le partenaire professionnel qui répond à vos besoins.
        </p>

        <p>
          Nous sommes fiers de fournir une plateforme transparente et sécurisée
          à nos utilisateurs. Nous examinons soigneusement tous nos partenaires
          professionnels pour nous assurer qu&lsquo;ils répondent à nos critères
          élevés de qualité et de fiabilité. Nous fournissons également un
          système de paiement sécurisé qui protège à la fois les clients et les
          partenaires professionnels contre la fraude et garantit un paiement en
          temps voulu.
        </p>

        <p>
          Notre plateforme est conçue pour rendre l&lsquo;ensemble du processus
          aussi facile que possible, tant pour les clients que pour les
          partenaires professionnels. Les clients peuvent parcourir notre large
          sélection de services et choisir le partenaire qui correspond à leurs
          besoins, tandis que les partenaires professionnels peuvent gérer leurs
          réservations et leur planning directement à partir de notre
          plateforme.
        </p>

        <h2 className="text-lg mt-6 mb-2">
          Nous préservons la liberté des professionnels
        </h2>

        <p>
          En collaborant avec nous, les professionnels partenaires conservent
          leur liberté de décision. Ils ont la possibilité de refuser ou
          d&lsquo;accepter chaque mission proposée, de choisir leurs horaires de
          travail et leur zone d&lsquo;intervention, de développer leur propre
          clientèle en dehors de notre plateforme et de travailler avec
          d&lsquo;autres plateformes. De plus, ils peuvent mettre fin à leur
          collaboration, à tout moment sans avoir à se justifier.
        </p>
        <p>
          <span className="font-bold">
            Djibouti regorge de professionnels talentueux
          </span>
          , et nous souhaitons établir une collaboration gagnant-gagnant avec
          eux, pour faciliter le quotidien de tous les citoyens.
        </p>

        <p className="mt-6">
          Nous croyons au pouvoir de la technologie pour simplifier et améliorer
          nos vies. C&lsquo;est pourquoi nous nous engageons à fournir la
          meilleure plateforme de services à la demande à Djibouti, une
          plateforme facile à utiliser, fiable et sécurisée.{" "}
          <span className="font-bold">
            Rejoignez-nous dès aujourd&lsquo;hui et découvrez l&lsquo;avenir de
            la prestation de services.
          </span>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
