import ManageEvents from "@/components/modules/Event/ManageEvents/ManageEvents";

const ManageEventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllEvents(page, "3");
  return (
    <div>
      <ManageEvents events={data} meta={meta} />
    </div>
  );
};

export default ManageEventsPage;