import "server-only";

import { getAllCategories } from "@services/category";

import { HowItWorks, Banner, BecomePro } from "@features/HomePage";
//import Faq from "@components/Faq";
import CarouselServices from "@features/Service/CarouselServices";

export default async function Page() {
  const categories = await getAllCategories();
  /*const options = [
    {
      question: "Je viens de réserver, suis-je sûr d’avoir mon rendez-vous ?",
      answer:
        "Une fois votre réservation de session effectuée, nous contacterons de manière automatique et rapide les professionnels exerçant dans votre région. Vous recevrez ensuite un mail confirmant votre réservation. Si jamais aucun professionnel n’était disponible au créneau souhaité, nous vous proposerions alors d’autres créneaux que vous seriez libres d’accepter ou non.",
    },
    {
      question: "Je viens de réserver, suis-je sûr d’avoir mon rendez-vous ?",
      answer:
        "Une fois votre réservation de session effectuée, nous contacterons de manière automatique et rapide les professionnels exerçant dans votre région. Vous recevrez ensuite un mail confirmant votre réservation. Si jamais aucun professionnel n’était disponible au créneau souhaité, nous vous proposerions alors d’autres créneaux que vous seriez libres d’accepter ou non.",
    },
    {
      question: "Je viens de réserver, suis-je sûr d’avoir mon rendez-vous ?",
      answer:
        "Une fois votre réservation de session effectuée, nous contacterons de manière automatique et rapide les professionnels exerçant dans votre région. Vous recevrez ensuite un mail confirmant votre réservation. Si jamais aucun professionnel n’était disponible au créneau souhaité, nous vous proposerions alors d’autres créneaux que vous seriez libres d’accepter ou non.",
    },
    {
      question: "Je viens de réserver, suis-je sûr d’avoir mon rendez-vous ?",
      answer:
        "Une fois votre réservation de session effectuée, nous contacterons de manière automatique et rapide les professionnels exerçant dans votre région. Vous recevrez ensuite un mail confirmant votre réservation. Si jamais aucun professionnel n’était disponible au créneau souhaité, nous vous proposerions alors d’autres créneaux que vous seriez libres d’accepter ou non.",
    },
  ];*/

  return (
    <>
      <Banner />
      <HowItWorks />
      {categories.slice(0, 2).map((category) => (
        <CarouselServices key={category.id} category={category} />
      ))}
      <BecomePro />
      {categories.slice(2).map((category) => (
        <CarouselServices key={category.id} category={category} />
      ))}
      {/*       <Faq options={options} />
       */}{" "}
    </>
  );
}
