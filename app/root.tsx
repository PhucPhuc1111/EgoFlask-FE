import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
            if (error?.response?.status === 401) {
              redirectLogin()
            }
          },
        }),
      }),
  );

  const redirectLogin = _.throttle(() => {
    redirect('/login')
  }, 100)

  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>EgoFlask</title>
        <meta name="description" content="Ego Flask" />
        <script src="/js/uikit.min.js"></script>
        <Meta />
        <Links />
      </head>
      <QueryClientProvider client={queryClient}>
        <body className="w-full h-full overflow-y-auto">
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
