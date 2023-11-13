import theme from "constants/theme";

export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: "Prestime | Services à domicile à Djibouti",
  description:
    "Trouvez des professionnels à Djibouti, comparez les prix et réservez vos services à domicile en 2 clics : ménage, coiffure, cours particuliers, plomberie, travaux… Obtenez des dizaines de professionnels de confiance près de chez vous pour prendre soin de vous, de votre famille et de votre maison.",
  openGraph: {
    type: "website",
    title: "Prestime | Services à domicile à Djibouti",
    description:
      "Trouvez des professionnels à Djibouti, comparez les prix et réservez vos services à domicile en 2 clics : ménage, coiffure, cours particuliers, plomberie, travaux… Obtenez des dizaines de professionnels de confiance près de chez vous pour prendre soin de vous, de votre famille et de votre maison.",
    siteName: "Prestime",
  },
};

export const defaultViewport = {
  themeColor: theme.colors.primary[100],
};
