import React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
}

const Header = ({ session }: HeaderProps) => {
  return (
    <header className="top-0 flex flex w-full items-center justify-between border-b px-4 py-2">
      <Link className="flex items-center" href="#">
        <span className="font-semibold">Academic Graph</span>
      </Link>
      <ul className="flex items-center justify-end space-x-4">
        <li>
          <Link className="" href="#">
            About
          </Link>
        </li>
        <li>
          <Avatar className="max-h-8 max-w-8">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </li>
      </ul>
    </header>
  );
};

export default Header;
