'use client'

import React, { useEffect } from "react";
import {
    Navbar as NextNavbar,
    NavbarBrand as NextNavbarBrand,
    NavbarContent as NextNavbarContent,
    NavbarItem as NextNavbarItem,
    Link,
    NavbarMenuToggle as NextNavbarMenuToggle,
    Button,
    NavbarMenu as NextNavbarMenu,
    NavbarMenuItem as NextNavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "../../apis/user_apis";

const Navbar = () => {
    const [navbar, setNavbar] = React.useState<JSX.Element | null>(null);
    const token = Cookies.get("userToken");
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        "Home",
        "Activity Plan",
        "Fitness Plan",
        "Course Plan",
        "Log Out",
    ];
    const pathname = usePathname()
    const isActive = (href: string) => pathname.startsWith(href) && pathname !== "/"   
    const isHome = pathname === "/"

    const handleLogout = async () => {
        Cookies.remove("userToken")
        await logout()
        window.location.href = "/auth/register"
    }
    
    const rightButton = (
        <Button color="danger" onPress={handleLogout} variant="flat">
            Logout
        </Button>
    )

    // use effect to check whether it has token or not, if it has token then it will return the navbar
    useEffect(() => {
        if (!token && !pathname.startsWith("/auth")) {
            setNavbar(null)
            window.location.href = "/auth/register"
        } else if (!token && pathname.startsWith("/auth")) {
            setNavbar(null)
        } else {
            setNavbar(toBeNavbar)
        }
    }, [token])

    const toBeNavbar = (
        <>
            <NextNavbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
                <NextNavbarContent className="ml-10">
                    <NextNavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NextNavbarBrand>
                        <p className="font-bold text-inherit">FlexTime</p>
                    </NextNavbarBrand>
                </NextNavbarContent>

                <NextNavbarContent className="w-full hidden sm:flex gap-4" justify="center">
                    <NextNavbarItem isActive={isHome}>
                        <Link color={isHome ? "primary" : "foreground"} href="/">
                            Home
                        </Link>
                    </NextNavbarItem>
                    <NextNavbarItem isActive={isActive("/activity-plan")}>
                        <Link color={isActive("/activity-plan") ? "primary" : "foreground"} href="/activity-plan">
                            Activity Plan
                        </Link>
                    </NextNavbarItem>
                    <NextNavbarItem isActive={isActive("/fitness-plan") || isActive("/session-training")}>
                        <Link href="/fitness-plan" color={isActive("/fitness-plan") || isActive("/session-plan") || isActive("/session-training") ? "primary" : "foreground"} >
                            Fitness Plan
                        </Link>
                    </NextNavbarItem>
                    <NextNavbarItem isActive={isActive("/course-plan")}>
                        <Link color={isActive("/course-plan") ? "primary" : "foreground"} href="/course-plan">
                            Course Plan
                        </Link>
                    </NextNavbarItem>
                </NextNavbarContent>

                <NextNavbarContent justify="end" className="mr-10">
                    <NextNavbarItem>
                        {rightButton}
                    </NextNavbarItem>
                </NextNavbarContent>
                <NextNavbarMenu>
                    {menuItems.map((item, index) => (
                        <NextNavbarMenuItem key={`${item}-${index}`} className="mx-10">
                            <Link
                                color={
                                    isActive(item === 'Home' ? '/' : `/${item.toLowerCase().replace(" ", "-")}`) ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(" ", "-")}`}
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NextNavbarMenuItem>
                    ))}
                </NextNavbarMenu>
            </NextNavbar>
        </>
    )
    return navbar
}

export default Navbar