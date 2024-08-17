import type { MetaFunction } from "@remix-run/node";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useMemo, useState } from "react";
import { useGetUsers } from "~/data/user";

export const meta: MetaFunction = () => {
  return [
    { title: "EgoFlask" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const users = useGetUsers(undefined, 'abc');
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();
  const mapUsername = useMemo(() => {
    return _.mapKeys(users.data, (it) => it.username);
  }, [users.data])
  
  const searchUser = useMemo(() => {
    return _.filter(users.data, (user) => {
      let company = _.pick(user, ['address']);
      let omitAddress = _.omit(user, ['address']);
      console.log('omitAddress', omitAddress);
      
      return user.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())
    })
  }, [users.data, searchValue])

  console.log('searchUser', _.slice(_.shuffle(searchUser), 0, 3));
  

  return (
    <main className="mt-[--m-header-top]">
      <input type="text" name="" id="" 
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="text-blue-500"
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ['users'],
          })
        }}
      >
        Invalidate
      </button>
      <div className="mx-auto">
        <ul className="list-disc mt-4 pl-6 space-y-2">
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/start/quickstart"
              rel="noreferrer"
            >
              5m Quick Start
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/start/tutorial"
              rel="noreferrer"
            >
              30m Tutorial
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/docs"
              rel="noreferrer"
            >
              Remix Docs
            </a>
          </li>
        </ul>
      </div>
    </main>

  );
}
