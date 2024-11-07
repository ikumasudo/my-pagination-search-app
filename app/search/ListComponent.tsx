"use client"

import { useState } from 'react';
import SearchComponent from './SearchComponent';
import { fetchItems, Item } from './actions';

const ITEMS_PER_PAGE = 10;

interface Props {
  initialData?: { items: Item[]; total: number };
}

export default function ListComponent({
  initialData
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<{ items: Item[]; total: number }>({ items: initialData?.items || [], total: initialData?.total || 0 });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    const result = await fetchItems(query, 1, ITEMS_PER_PAGE);
    setData(result);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const result = await fetchItems(searchQuery, page, ITEMS_PER_PAGE);
    setData(result);
  };

  // 初期データの取得（サーバーサイドで実行）
  // Next.js の Server Components を活用
  // ここでは簡略化のためクライアントサイドで取得していますが、
  // getServerSideProps や API Routes を使用することも可能です。

  return (
    <div>
      <h1>検索とページネーション</h1>
      <SearchComponent
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={Math.ceil(data.total / ITEMS_PER_PAGE)}
      />
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
