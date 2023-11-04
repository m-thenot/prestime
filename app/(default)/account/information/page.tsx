import Information from "@features/Account/Information";
import "server-only";

export default async function Page() {
  return <Information />;
}

export const metadata = {
  robots: {
    index: false,
    nocache: true,
    googleBot: {
      index: false,
      noimageindex: true,
    },
  }
};
