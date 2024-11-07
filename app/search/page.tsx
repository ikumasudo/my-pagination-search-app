import { fetchItems } from "./actions";
import ListComponent from "./ListComponent";

export default async function Page() {
  const items = await fetchItems('', 1, 10);

  return (
    <div>
      <h1>Search and Pagination</h1>
      <ListComponent initialData={items}/>
    </div>
  );
}