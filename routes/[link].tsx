// import { PageProps } from "$fresh/server.ts";

// export default  function Greet(props: PageProps) {
//   console.log(props);
//   const { link } = props.params;

//   const response = await fetch(
//     `https://raw.githubusercontent.com/phocks/short-links/refs/heads/main/links/${link}.txt`,
//   );
//   const text = await response.text();
//   return <div>Hello {}</div>;
// }

import { Handlers, PageProps } from "$fresh/server.ts";

// interface Project {
//   name: string;
//   stars: number;
// }

// export default async function ProjectPage(_req: any, ctx: any) {
//   // const project: Project | null = await db.projects.findOne({
//   //   id: ctx.params.id,
//   // });

//   // console.log(ctx.params.link);
//   const { link } = ctx.params;
//   console.log(link);

//   const URL = `https://raw.githubusercontent.com/phocks/short-links/refs/heads/main/links/${link}.txt`;

//   console.log(URL);

//   const response = await fetch(
//     `https://raw.githubusercontent.com/phocks/short-links/refs/heads/main/links/${link}.txt`,
//   );
//   const text = await response.text();

//   console.log(text);

//   if (!text) {
//     return <h1>Project not found</h1>;
//   }

//   return (
//     <div>
//       {text}
//     </div>
//   );
// }

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
