"use client";

import supabase from "@utils/supabase/supabase-browser";
import Button from "@components/Button";

interface ILogOutButtonProps {
  className?: string;
}

const LogOutButton: React.FC<ILogOutButtonProps> = ({ className }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button variant="link" onClick={handleLogout} className={className}>
      Se déconnecter
    </Button>
  );
};

export default LogOutButton;
