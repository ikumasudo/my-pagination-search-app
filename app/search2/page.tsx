import { fetchItems } from "./actions";
import SearchClientComponent from "./SearchClientComponent";

const ITEMS_PER_PAGE = 10;

interface SearchPageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function Page({searchParams}: SearchPageProps) {
  const searchQuery = searchParams.search || ""
  const pageParam = searchParams.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const data = await fetchItems(
    searchQuery,
    currentPage,
    ITEMS_PER_PAGE
  )

  return (
    <div style={{ padding: '2rem' }}>
      <h1>検索とページネーション</h1>
      <SearchClientComponent
        initialQuery={searchQuery}
        initialPage={currentPage}
        data={data}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  )
}
