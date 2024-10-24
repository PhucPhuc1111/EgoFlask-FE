import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import { useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import { Footer, Header } from "./components";
import { redirect } from "@remix-run/react";
import _ from "lodash";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles, as: "style" },
  { rel: "stylesheet", href: "/css/tailwind1.css?v=1" },
  { rel: "stylesheet", href: "/css/uikit.css?v=1" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" }, // Montserrat added here
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "icon", href: "/images/SquareLogo.png" },
];

export function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
          <h1 className="text-9xl font-extrabold text-white tracking-widest">
            {isRouteErrorResponse(error) ? error.status :
              error instanceof Error ?
                error.message :
                "Unknown Error"}</h1>
          <div className="bg-[#FF6A3D] text-slate-900 px-2 text-sm rounded rotate-12 absolute">
            {isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error instanceof Error
                ? error.message
                : "Unknown Error"}
          </div>
          <button onClick={() => navigate(-1)} className="mt-5">
            <a
              className="relative no-underline hover:no-underline inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
            >
              <span
                className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
              ></span>

              <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                Go Back
              </span>
            </a>
          </button>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => {
            console.log('error', error?.response?.status);

            if (error?.response?.status === 401) {
              window.location.href = '/logout'; // Redirect to login or any route
            }
          },
        }),
      }),
  );

  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover" />
        <title>Ego Flask</title>
        <meta name="description" content="Bình nước custom theo ý bạn!" />
        <script src="/js/uikit.min.js"></script>
        <Meta />
        <Links />
      </head>
      <QueryClientProvider client={queryClient}>
        <body className="w-full h-full overflow-y-auto overflow-x-hidden">
          <div id="wrapper">
            <Header />
            <Outlet />
            <Footer />
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </QueryClientProvider>
    </html>
  );
}
