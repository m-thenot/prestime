import "server-only";

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  return <p>provider</p>;
}
