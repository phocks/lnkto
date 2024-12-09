import { Handlers, PageProps } from "$fresh/server.ts";

interface Project {
  name: string;
  stars: number;
}

const baseURL =
  "https://raw.githubusercontent.com/phocks/expander/refs/heads/main/links/";
const extension = ".txt";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const { link } = ctx.params;

    const URL = `${baseURL}${link}${extension}`;

    const response = await fetch(URL);

    if (!response.ok) {
      return new Response("Link not found", { status: 404 });
    }

    const text = await response.text();

    const headers = new Headers({ "Location": text });
    return new Response(null, {
      status: 302, // Found, redirect
      headers,
    });
  },
};

export default function ProjectPage(props: PageProps<Project>) {
  return (
    <div>
      <h1>{props.data}</h1>
    </div>
  );
}
