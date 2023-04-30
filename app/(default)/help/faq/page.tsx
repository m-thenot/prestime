import FaqPage from "@features/Help/FaqPage";
import "server-only";

export default async function Page() {
  const options = [
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
  ];

  return <FaqPage options={options} />;
}
