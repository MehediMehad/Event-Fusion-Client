import { getAllUsersWithStats } from "@/services/User";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const UsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;

  const page = query.page?.toString() || "1";
  const limit = query.limit?.toString() || "10";
  const searchTerm = query.searchTerm?.toString() || "";

  const result = await getAllUsersWithStats(
    { searchTerm },
    { page, limit }
  );

  console.log("😎😎 Fetched Data:", result.data); // Should have data now

  if (!result.success || !result.data) {
    return <div>{result.message || "Failed to load user data"}</div>;
  }

  return (
    <div>
      <h1>This is Admin User List</h1>
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </div>
  );
};

export default UsersPage;