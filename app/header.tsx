import Button from "@components/Button";

const Header: React.FC = () => {
  return (
    <div className="items-center flex justify-between">
      <p className="text-2xl font-extrabold">Easy Service</p>

      <div>
        <Button variant="transparent" className="mr-6">
          Se connecter
        </Button>
        <Button>Devenir professionnel</Button>
      </div>
    </div>
  );
};

export default Header;
