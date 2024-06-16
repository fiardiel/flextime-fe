'use client'

import React from "react";
import {
    Navbar as NextNavbar,
    NavbarBrand as NextNavbarBrand,
    NavbarContent as NextNavbarContent,
    NavbarItem as NextNavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href

    return (
        <div>
            <NextNavbar position="sticky" isBordered>
                <NextNavbarBrand>
                    <div className="flex flex-col">
                        <p className="font-bold text-inherit">FlexTime</p>

                    </div>
                </NextNavbarBrand>

                <NextNavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NextNavbarItem isActive={isActive("/")}>
                        <Link color={isActive("/") ? "secondary" : "foreground"} href="/">
                            Home
                        </Link>
                    </NextNavbarItem>
                    <NextNavbarItem isActive={isActive("/fitness-plan") || isActive("/session-plan") || isActive("/session-training")}>
                        <Link href="/fitness-plan" color={isActive("/fitness-plan") || isActive("/session-plan") || isActive("/session-training") ? "secondary" : "foreground"} >
                            Fitness Plan
                        </Link>
                    </NextNavbarItem>
                    <NextNavbarItem isActive={isActive("/course-plan")}>
                        <Link color={isActive("/course-plan") ? "secondary" : "foreground"} href="/course-plan">
                            Course Plan
                        </Link>
                    </NextNavbarItem>
                    <NextNavbarItem isActive={isActive("/activity-plan")}>
                        <Link color={isActive("/activity-plan") ? "secondary" : "foreground"} href="/activity-plan">
                            Activity Plan
                        </Link>
                    </NextNavbarItem>
                </NextNavbarContent>

                <NextNavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Rafi Ardiel"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">fiardiel19@gmail.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Profile</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NextNavbarContent>
            </NextNavbar>
        </div>
    )
}

export default Navbar