import "server-only";
import Tag from "@components/Tag";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center mt-5">
        <Tag text="Légal" />
        <h1 className="text-center mt-2 max-w-md">
          Politique de confidentialité
        </h1>
      </div>
      <div className="max-w-2xl mx-auto my-5 sm:my-10">
        <h2 className="text-lg mt-6 mb-2">Politique de confidentialité</h2>
        <p>
          Le site web Deg Deg est détenu par Deg Deg, qui est un contrôleur de
          données de vos données personnelles.
        </p>

        <p>
          Nous avons adopté cette politique de confidentialité, qui détermine la
          manière dont nous traitons les informations collectées par Deg Deg,
          qui fournit également les raisons pour lesquelles nous devons
          collecter certaines données personnelles vous concernant. Par
          conséquent, vous devez lire cette politique de confidentialité avant
          d&lsquo;utiliser le site web de Deg Deg.
        </p>

        <p>
          Nous prenons soin de vos données personnelles et nous nous engageons à
          en garantir la confidentialité et la sécurité.
        </p>

        <h2 className="text-lg mt-6 mb-2">
          Les informations personnelles que nous collectons{" "}
        </h2>

        <p>
          Lorsque vous visitez le Deg Deg, nous recueillons automatiquement
          certaines informations sur votre appareil, notamment des informations
          sur votre navigateur web, votre adresse IP, votre fuseau horaire et
          certains des cookies installés sur votre appareil.
        </p>

        <p>
          En outre, lorsque vous naviguez sur le site, nous recueillons des
          informations sur les pages web ou les produits individuels que vous
          consultez, sur les sites web ou les termes de recherche qui vous ont
          renvoyé au site et sur la manière dont vous interagissez avec le site.
          Nous désignons ces informations collectées automatiquement par le
          terme &quot;informations sur les appareils&quot;.
        </p>

        <h2 className="text-lg mt-6 mb-2">
          Pourquoi traitons-nous vos données ?
        </h2>
        <p>
          Notre priorité absolue est la sécurité des données des clients et, à
          ce titre, nous ne pouvons traiter que des données minimales sur les
          utilisateurs, uniquement dans la mesure où cela est absolument
          nécessaire pour maintenir le site web. Les informations collectées
          automatiquement sont utilisées uniquement pour identifier les cas
          potentiels d&lsquo;abus et établir des informations statistiques
          concernant l&lsquo;utilisation du site web. Ces informations
          statistiques ne sont pas autrement agrégées de manière à identifier un
          utilisateur particulier du système.
        </p>

        <p>
          Vous pouvez visiter le site web sans nous dire qui vous êtes ni
          révéler d&lsquo;informations, par lesquelles quelqu&lsquo;un pourrait
          vous identifier comme un individu spécifique et identifiable.
          Toutefois, si vous souhaitez utiliser certaines fonctionnalités du
          site web, ou si vous souhaitez recevoir notre lettre
          d&lsquo;information ou fournir d&lsquo;autres détails en remplissant
          un formulaire, vous pouvez nous fournir des données personnelles,
          telles que votre e-mail, votre prénom, votre nom, votre ville de
          résidence, votre organisation, votre numéro de téléphone. Vous pouvez
          choisir de ne pas nous fournir vos données personnelles, mais il se
          peut alors que vous ne puissiez pas profiter de certaines
          fonctionnalités du site web. Par exemple, vous ne pourrez pas recevoir
          notre bulletin d&lsquo;information ou nous contacter directement à
          partir du site web. Les utilisateurs qui ne savent pas quelles
          informations sont obligatoires sont invités à nous contacter via
          {process.env.NEXT_PUBLIC_CONTACT_EMAIL!}.
        </p>

        <h2 className="text-lg mt-6 mb-2">
          Liens vers d&lsquo;autres sites web
        </h2>

        <p>
          Notre site web peut contenir des liens vers d&lsquo;autres sites web
          qui ne sont pas détenus ou contrôlés par nous. Sachez que nous ne
          sommes pas responsables de ces autres sites web ou des pratiques de
          confidentialité des tiers. Nous vous encourageons à être attentif
          lorsque vous quittez notre site web et à lire les déclarations de
          confidentialité de chaque site web susceptible de collecter des
          informations personnelles.
        </p>

        <h2 className="text-lg mt-6 mb-2">Sécurité de l&lsquo;information</h2>

        <p>
          Nous sécurisons les informations que vous fournissez sur des serveurs
          informatiques dans un environnement contrôlé et sécurisé, protégé
          contre tout accès, utilisation ou divulgation non autorisés. Nous
          conservons des garanties administratives, techniques et physiques
          raisonnables pour nous protéger contre tout accès, utilisation,
          modification et divulgation non autorisés des données personnelles
          sous son contrôle et sa garde. Toutefois, aucune transmission de
          données sur Internet ou sur un réseau sans fil ne peut être garantie.
        </p>

        <h2 className="text-lg mt-6 mb-2">Divulgation légale</h2>

        <p>
          Nous divulguerons toute information que nous collectons, utilisons ou
          recevons si la loi l&lsquo;exige ou l&lsquo;autorise, par exemple pour
          nous conformer à une citation à comparaître ou à une procédure
          judiciaire similaire, et lorsque nous pensons de bonne foi que la
          divulgation est nécessaire pour protéger nos droits, votre sécurité ou
          celle d&lsquo;autrui, enquêter sur une fraude ou répondre à une
          demande du gouvernement.
        </p>

        <h2 className="text-lg mt-6 mb-2">Informations de contact</h2>

        <p>
          Si vous souhaitez nous contacter pour comprendre davantage la présente
          politique ou si vous souhaitez nous contacter concernant toute
          question relative aux droits individuels et à vos informations
          personnelles, vous pouvez envoyer un courriel à{" "}
          {process.env.NEXT_PUBLIC_CONTACT_EMAIL!}.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
