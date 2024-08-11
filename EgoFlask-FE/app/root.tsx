import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinksFunction } from "@remix-run/node";
import styles from './tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles, as: 'style' },
  { rel: "stylesheet", href: '/css/tailwind1.css' },
]

export default function App() {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/images/favicon.ico" rel="icon" />
        <Meta />
        <Links />
      </head>
      <QueryClientProvider client={queryClient}>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </QueryClientProvider>
    </html>
  );
}
