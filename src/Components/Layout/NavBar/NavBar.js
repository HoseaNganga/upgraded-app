"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/Components/AppContext/AppProvider";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

function AuthLinks({ sessionStatus, userName }) {
  if (sessionStatus === "authenticated") {
    return (
      <>
        <Link
          href={"/profile"}
          className=" style_btn hover:bg-green-600 transition-all "
        >
          Hello {userName}
        </Link>
        <button
          type="button"
          className="style_btn hover:bg-green-600"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </>
    );
  }
  if (sessionStatus == "unauthenticated") {
    return (
      <>
        <Link
          href={"/login"}
          className=" style_btn hover:bg-green-600 transition-all "
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className=" style_btn hover:bg-green-600 transition-all "
        >
          Register
        </Link>
      </>
    );
  }
}

const NavBar = () => {
  const session = useSession();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);
  const sessionStatus = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header>
      <div className="flex justify-between gap-2 md:hidden p-8 items-center ">
        <h1>
          <Link
            href={"/"}
            className="gradient_text capitalize text-2xl font-bold "
          >
            blaze bites
          </Link>
        </h1>

        <div className="flex gap-2 items-center ">
          <button onClick={() => setMobileNavOpen((prev) => !prev)}>
            <FaBars />
          </button>
          <Link href={"/cart"} className="relative">
            {" "}
            <FaCartShopping color="red" size={25} />
            <span className="text-xs absolute -top-4 right-1 p-1 rounded-full bg-purple-400">
              {cartProducts.length}
            </span>{" "}
          </Link>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          className="bg-gray-200 rounded-lg md:hidden flex flex-col p-4 gap-2 text-center"
          onClick={() => setMobileNavOpen(false)}
        >
          <Link className="hover:text-black" href={"/"}>
            Home
          </Link>
          <Link className="hover:text-black" href={"/menu"}>
            Menu
          </Link>
          <Link className="hover:text-black" href={"/#about"}>
            About
          </Link>
          <Link className="hover:text-black" href={"/#contact"}>
            Contact
          </Link>
          <AuthLinks sessionStatus={sessionStatus} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex justify-between gap-6 items-center p-8 mb-2">
        <h1>
          <Link
            href={"/"}
            className="gradient_text capitalize text-2xl font-bold "
          >
            blaze bites
          </Link>
        </h1>
        <nav className="flex justify-start gap-6 items-center font-semibold text-slate-600">
          <Link className="hover:text-black" href={"/"}>
            Home
          </Link>
          <Link className="hover:text-black" href={"/menu"}>
            Menu
          </Link>
          <Link className="hover:text-black" href={"/#about"}>
            About
          </Link>
          <Link className="hover:text-black" href={"/#contact"}>
            Contact
          </Link>
        </nav>
        <nav className="flex justify-start gap-6 items-center font-semibold">
          <AuthLinks sessionStatus={sessionStatus} userName={userName} />

          <Link href={"/cart"} className="relative">
            {" "}
            <FaCartShopping color="red" size={25} />
            <span className="text-xs absolute -top-4 right-1 p-1 rounded-full bg-purple-400">
              {cartProducts.length}
            </span>{" "}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
