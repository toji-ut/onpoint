'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // For navigation
import { supabase } from '../../../lib/supabaseClient'; // Supabase client
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "../../../components/SearchIcon";

export default function NavBarWithSearchBar({ children }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const menuItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Knowledge Base", href: "/dashboard/KB" },
    { label: "New Issue", href: "/dashboard/NI" },
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Handle the signout functionality
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      
      // Redirect to the login page after successful signout
      router.push('../'); // Assuming the login page is at the root
    }
  };

  return (
    <div>
      <Navbar isBordered>
        {/* Navbar Content (Left Side) */}
        <NavbarContent justify="start">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} className="group relative p-4">
              <Link href={item.href} color="foreground" className="text-lg">
                {item.label}
              </Link>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Navbar Content (Search and Avatar Dropdown) */}
        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[12rem] h-10", // Adjusted width here
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            value={query}
            onChange={handleSearch}
            startContent={<SearchIcon size={18} />}
            type="search"
          />

          {/* Avatar with SignOut Dropdown */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                size="sm"
                showFallback
                src="https://images.unsplash.com/broken" // Replace with your avatar image URL
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <main>
        {children}
      </main>
    </div>
  );
}
