"use client";

import Image from "next/image";
import Whatsapp from "@images/whatsapp.png";
import Link from "next/link";

const ContactButton = () => {
  return (
    <div className="fixed bottom-32 sm:bottom-5 right-2 sm:right-5 z-50">
      <Link
        className="bg-white transition duration-200 ease-in-out rounded-full drop-shadow-md flex items-center justify-center p-2 sm:p-4"
        href={process.env.NEXT_PUBLIC_WHATSAPP_LINK!}
      >
        <span className="mr-4 hidden sm:inline">Besoin d&lsquo;aide ?</span>
        <Image src={Whatsapp} alt="" priority width={40} height={40} />
      </Link>
    </div>
  );
};

export default ContactButton;
