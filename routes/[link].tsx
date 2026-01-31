interface Project {
  status: number;
  message: string;
}

const baseURL =
  "https://raw.githubusercontent.com/phocks/lnkto/refs/heads/main/static/links/";
const extension = ".txt";

export const handler = {
  async GET(ctx: any) {
    const { link } = ctx.params;

    const URL = `${baseURL}${link}${extension}`;

    const response = await fetch(URL);

    if (!response.ok) {
      return { message: "Link not Found", status: 404 };
    }

    const text = await response.text();

    const headers = new Headers({ "Location": text });
    return new Response(null, {
      status: 302, // Found, redirect
      headers,
    });
  },
};

export default function ProjectPage(props: any) {
  if (props.data.status === 404) {
    return (
      <div class="p-4 bg-gray-100 text-gray-700 border-l-4 border-red-500">
        <p class="font-semibold">404 Not Found</p>
        <p>{props.data.message}</p>
      </div>
    );
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Successful links redirect so no markup needed */}
    </div>
  );
}
