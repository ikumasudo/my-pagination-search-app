// app/search/actions.ts

export interface Item {
  id: number;
  name: string;
}

export async function fetchItems(
  searchQuery: string,
  page: number,
  limit: number
): Promise<{ items: Item[]; total: number }> {
  // ここでデータベースやAPIからデータを取得します
  // 例として、ダミーデータを返します

  const allItems: Item[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const total = filteredItems.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filteredItems.slice(start, end);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return { items, total };
}
