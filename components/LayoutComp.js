'use client';

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "../components/SearchIcon";

export default function NavBarWithSearchBar() {
  const [query, setQuery] = useState("");

  const menuItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Reports", href: "/dashboard/reports" },
    { label: "Knowledge Base", href: "/dashboard/KB" },
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarContent className="hidden sm:flex gap-3">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} className="group relative p-4">
              <Link
                href={item.href}
                color="foreground"
                className="text-lg"
              >
                {item.label}
              </Link>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </NavbarItem>
          ))}

          <NavbarItem className="group relative p-4">
            <Dropdown>
              <DropdownTrigger>
                <Link href="#" color="foreground" className="text-lg">
                  New Issue
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="New Issue Options" variant="flat">
              <DropdownItem key="newIssue">
                  <Link
                    href="/newIssue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    New Issue
                  </Link>
                </DropdownItem>
                <DropdownItem key="newGlobal">
                  <Link
                    href="/newGlobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    New Global
                  </Link>
                </DropdownItem>
                <DropdownItem key="addToKB">
                  <Link
                    href="/addToKb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    Add to KB
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[12rem] h-10", // Adjusted width here
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          value={query}
          onChange={handleSearch}
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name=""
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
