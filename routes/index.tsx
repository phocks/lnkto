import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = NAMES.filter((name) => name.includes(query));
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form class="mb-4 w-full max-w-sm">
        <div class="flex items-center border-b border-teal-500 py-2">
          <input
            type="text"
            name="q"
            value={query}
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Search names"
          />
          <button
            type="submit"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
      <ul class="w-full max-w-sm bg-white rounded-lg shadow-md">
        {results.map((name) => (
          <li key={name} class="border-b border-gray-200 p-4">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
