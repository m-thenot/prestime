import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const useRedirectToReferrer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const referrer = searchParams.get("next");

  const redirectToReferrer = () => {
    router.push(`/${referrer || ""}`);
  };

  return redirectToReferrer;
};

export default useRedirectToReferrer;
