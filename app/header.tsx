import Button from "@components/Button";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="items-center flex justify-between mb-8">
      <Link href="/" className="text-2xl font-extrabold hover:no-underline">
        Easy Service
      </Link>
      <div>
        <Link href="/login" className="mr-6">
          Se connecter
        </Link>
        <Button>Devenir professionnel</Button>
      </div>
    </div>
  );
};

export default Header;
