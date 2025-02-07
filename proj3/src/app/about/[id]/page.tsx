export default function Yes({
  params,
}: {
  params: {
    id: number;
  };
}) {
  return <div>{params.id}</div>;
}
