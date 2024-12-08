import { Handlers, PageProps } from "$fresh/server.ts";

interface Project {
  name: string;
  stars: number;
}

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const { link } = ctx.params;

    const URL =
      `https://raw.githubusercontent.com/phocks/short-links/refs/heads/main/links/${link}.txt`;

    const response = await fetch(URL);
    const text = await response.text();

    const headers = new Headers();
    headers.set("location", text);
    return new Response(null, {
      status: 303, // See Other
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
