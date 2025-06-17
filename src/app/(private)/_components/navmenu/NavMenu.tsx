"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { footerMenu, mainMenu } from "./menuData/menu";
import { useNavMenu } from "./useNavMenu";
import { notify } from "@/lib/notify";

export function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const {
    isCollapsed,
    setIsCollapsed,
    openSubmenu,
    toggleSubmenu,
    handleMouseEnter,
    handleMouseLeave,
  } = useNavMenu();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          notify.success("Logout realizado com sucesso!");
          router.push("/");
        },
        onError: (ctx) => {
          notify.error(
            typeof ctx?.error === "string"
              ? ctx.error
              : "Erro ao realizar logout."
          );
        },
      },
    });
  }

  return (
    <>
      <aside
        className={`h-full rounded-4xl p-1 bg-white transition-[width] duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } flex flex-col`}
        style={{
          filter: "drop-shadow(0 4px 6px rgba(188, 188, 188, 0.573))",
        }}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-4"
          } p-4`}
        >
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      user?.image
                        ? String(user.image)
                        : "https://github.com/shadcn.png"
                    }
                    alt={user?.name || "Avatar"}
                  />
                  <AvatarFallback>
                    {(user?.name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Tooltip.Trigger>
              {isCollapsed && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    className="bg-black text-white px-3 py-1 rounded text-sm z-30"
                  >
                    {user?.name || "Usuário"}
                    <br />
                    {user?.email || ""}
                    <br />
                    <span className="text-xs text-gray-300">
                      {user?.role || ""}
                    </span>
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          </Tooltip.Provider>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">{user?.name || "Usuário"}</p>
              <p className="text-xs text-gray-500">
                {user?.email || "sem-email"}
              </p>
              <p className="text-xs text-gray-400 uppercase">
                {user?.role || ""}
              </p>
            </div>
          )}
        </div>

        {/* Main Menu */}
        <div className="flex-1 space-y-1">
          {!isCollapsed && (
            <p className="px-4 pt-2 pb-1 text-xs text-gray-400">MAIN</p>
          )}
          {mainMenu.map(({ icon: Icon, label, href, submenu }, i) => {
            const isActive = href
              ? pathname === href
              : submenu?.some((s) => pathname === s.href);

            return (
              <div key={i} className="relative group">
                {submenu ? (
                  <button
                    onClick={() => toggleSubmenu(label)}
                    onMouseEnter={() => isCollapsed && handleMouseEnter(label)}
                    onMouseLeave={() => isCollapsed && handleMouseLeave()}
                    className={clsx(
                      "flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-full",
                      { "bg-gray-100 font-semibold": isActive }
                    )}
                  >
                    <Icon
                      className={clsx("size-[18px] shrink-0", {
                        "mx-auto": isCollapsed,
                        "mr-3": !isCollapsed,
                      })}
                    />
                    {!isCollapsed && (
                      <span className="ml-3 flex-1 text-left">{label}</span>
                    )}
                    {!isCollapsed && (
                      <span className="ml-auto">
                        {openSubmenu === label ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={href!}
                    className={clsx(
                      "flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-full",
                      { "bg-gray-100 font-semibold": isActive }
                    )}
                  >
                    <Icon
                      className={clsx("size-[18px] shrink-0", {
                        "mx-auto": isCollapsed,
                        "mr-3": !isCollapsed,
                      })}
                    />
                    {!isCollapsed && (
                      <span className="ml-3 flex-1 text-left">{label}</span>
                    )}
                  </Link>
                )}

                {submenu && (
                  <>
                    {isCollapsed && openSubmenu === label && (
                      <div
                        onMouseEnter={() => handleMouseEnter(label)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-full top-0 ml-2 w-40 bg-white border rounded-lg shadow-md py-2 z-50"
                      >
                        {submenu.map((sub, j) => (
                          <Link
                            key={j}
                            href={sub.href}
                            className={clsx(
                              "block px-4 py-2 text-sm hover:bg-gray-100 text-gray-600",
                              {
                                "font-semibold bg-gray-100":
                                  pathname === sub.href,
                              }
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    <AnimatePresence>
                      {!isCollapsed && openSubmenu === label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-12 space-y-1 overflow-hidden"
                        >
                          {submenu.map((sub, j) => (
                            <Link
                              key={j}
                              href={sub.href}
                              className={clsx(
                                "block px-4 py-1.5 text-sm text-gray-600 hover:text-black",
                                {
                                  "font-semibold text-black":
                                    pathname === sub.href,
                                }
                              )}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-1 py-4">
          {footerMenu.map(({ icon: Icon, label, href, color }, idx) => {
            const isLogout = label.toLowerCase() === "logout";

            return isLogout ? (
              <button
                key={idx}
                onClick={signOut}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-full ${color}`}
              >
                <Icon
                  className={clsx("size-5 shrink-0", {
                    "mx-auto": isCollapsed,
                    "mr-3": !isCollapsed,
                  })}
                />
                {!isCollapsed && <span>{label}</span>}
              </button>
            ) : (
              <Link
                key={idx}
                href={href}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-full ${color}`}
              >
                <Icon
                  className={clsx("size-5 shrink-0", {
                    "mx-auto": isCollapsed,
                    "mr-3": !isCollapsed,
                  })}
                />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Toggle menu */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-10 ${
          isCollapsed ? "left-[4.5rem]" : "left-[16.5rem]"
        } z-20 bg-white border border-gray-200 rounded-full p-1 shadow transition-all duration-300`}
        aria-label={isCollapsed ? "Expandir menu" : "Colapsar menu"}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </>
  );
}
