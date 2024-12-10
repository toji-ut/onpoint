'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";

export default function NavBar({ children }) {
  const router = useRouter();

  const menuItems = [
    { label: "Home", href: "/dashboard" },
    { label: "New Issue", href: "/dashboard/NI" },
  ];

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      localStorage.removeItem('user');
      router.push('../');
    }
  };

  return (
    <div>
      <Navbar isBordered>
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

        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                size="sm"
                showFallback
                src="https://images.unsplash.com/broken"
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
