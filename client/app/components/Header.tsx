/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "./NavItems";
import ThemeSwitcher from "../utils/themeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification"
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/man-1.jpg"
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  route: string;
  setRoute?: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user && data?.user && !localStorage.getItem("social-logged-in")) {
      socialAuth({
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.image,
      });

      // prevent multiple requests
      localStorage.setItem("social-logged-in", "true");
    }

    if (isSuccess) {
      toast.success("Logged in successfully");
    }

    if (error) {
      toast.error("Login failed");
    }
  }, [data, isSuccess, error, socialAuth, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <div
          className={`${active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
            }`}
        >
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <div>
                <Link
                  href="/"
                  className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
                >
                  ELearning
                </Link>
              </div>
              <div className="flex items-center">
                <NavItems activeItem={activeItem} isMobile={false} />
                <ThemeSwitcher />
                <div className="800px:hidden">
                  <HiOutlineMenuAlt3
                    className="cursor-pointer dark:text-white text-black"
                    size={25}
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
                {
                  user ? (
                    <Link href={'/profile'} className="hidden 800px:block">
                      <Image
                        src={user.avatar ? user.avatar : avatar}
                        alt=''
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer ml-2"
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      size={25}
                      onClick={() => setOpen(true)}
                    />
                  )
                }

              </div>
            </div>
          </div>
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id="screen"
            >
              <div className="fixed w-[50%] h-screen top-0 right-0 z-[99999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 ">
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiOutlineUserCircle
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                  size={25}
                  onClick={() => setOpen(true)}
                />
                <br />
                <br />
                <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                  Copyright @ 2024 E-Learning
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {
        route === "Login" && (
          <> {
            open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                component={Login}
                setRoute={setRoute}
                activeItem={activeItem}
              />
            )
          }
          </>
        )
      }
      {
        route === "Sign-Up" && (
          <> {
            open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                component={SignUp}
                setRoute={setRoute}
                activeItem={activeItem}
              />
            )
          }
          </>
        )
      }
      {
        route === "Verification" &&
        <> {
          open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              component={Verification}
              setRoute={setRoute}
              activeItem={activeItem}
            />
          )
        }
        </>

      }
    </>
  );
};

export default Header;
