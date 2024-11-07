"use client"

import { useRouter } from "next/navigation";
import { Item } from "./actions";
import { useState } from "react";

interface searchProps {
  initialQuery: string;
  initialPage: number;
  data: { items: Item[]; total: number };
  itemsPerPage: number;
}

export default function SearchClientComponent({initialQuery, initialPage, data, itemsPerPage}: searchProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(initialQuery)

  const totalPages = Math.ceil(data.total / itemsPerPage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // URL を更新してサーバーコンポーネントを再レンダリング
    router.push(`/search2?search=${encodeURIComponent(searchInput)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(
      `/search2?search=${encodeURIComponent(searchInput)}&page=${newPage}`
    )
  }

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="検索..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem', width: '200px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          検索
        </button>
      </form>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => handlePageChange(initialPage - 1)}
          disabled={initialPage <= 1}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
        >
          前へ
        </button>
        <span>
          {initialPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(initialPage + 1)}
          disabled={initialPage >= totalPages}
          style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}
        >
          次へ
        </button>
      </div>
      <ul>
        {data.items.map(item => (
          <li key={item.id} style={{ padding: '0.5rem 0' }}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )

}
