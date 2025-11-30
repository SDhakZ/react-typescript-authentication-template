import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutSuccess } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/authApi";
import { LayoutList, User2, ChevronUp, Settings, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "sonner";
// --- Menu items ---
const items = [{ title: "Client List", url: "/client-list", icon: LayoutList }];

export function AppSidebar() {
  const { open } = useSidebar();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // --- Handle sign out ---
  const handleSignOut = () => {
    logout().then(() => {
      dispatch(logoutSuccess());
      toast.success("Successfully signed out");
      navigate("/login");
    });
  };

  return (
    <Sidebar collapsible="icon" className="h-screen border-r">
      <SidebarContent>
        <SidebarGroup>
          {open && (
            <SidebarHeader>
              <NavLink to="/">
                <h1 className="text-xl font-semibold">ARCUS</h1>
              </NavLink>
            </SidebarHeader>
          )}

          {!open && (
            <SidebarHeader>
              <NavLink to="/">
                <div className="flex mt-1 items-center justify-center w-full h-auto">
                  <img src="./icon.png" className="max-w-[26px]" />
                </div>
              </NavLink>
            </SidebarHeader>
          )}

          {!open && <hr className="mt-1.5" />}

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.includes(item.url)}
                    className={`${index === 0 && !open ? "mt-3" : "mt-5"}`}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  {open ? (
                    <>
                      <span>User</span>
                      <ChevronUp className="ml-auto" />
                    </>
                  ) : (
                    <>
                      <User2 className="w-7 h-7" />
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/profile"
                    className="w-full h-full font-semibold text-center cursor-pointer"
                  >
                    <Settings />
                    Profile
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="text-red-500" />{" "}
                  <button className="w-full cursor-pointer text-left text-red-500">
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
