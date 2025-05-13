import { UsersManagement } from "@/components/modules/admin/Users/UsersManagement";
import { getAllUsersWithStats } from "@/services/User";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const UsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;

  const page = query.page?.toString() || "1";
  const limit = query.limit?.toString() || "10";
  const searchTerm = query.searchTerm?.toString() || "";

  const result = await getAllUsersWithStats({ searchTerm }, { page, limit });

  console.log("😎😎 Fetched Data:", result.meta); // Should have data now

  if (!result.success || !result.data) {
    return <div>{result.message || "Failed to load user data"}</div>;
  }

  return (
    <div className="">
      <UsersManagement users={result.data} meta={result.meta} />
    </div>
  );
};

export default UsersPage;
