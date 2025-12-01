import { Link } from "react-router";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link2, LogOut } from "lucide-react";
import { useUser } from "@/app/providers/user-provider";
import { logoutUser } from "@/api/auth.api";
import { useFetch } from "@/hooks/use-fetch";
import { Loader } from ".";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const handleNavigateToAuth = () => navigate("/auth");
  const { isAuthenticated, user, fnFetchUser } = useUser();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { fn: fnLogoutUser, loading } = useFetch(logoutUser);

  const handleLogoutUser = async () => {
    setLogoutLoading(true);
    fnLogoutUser()
      .then(() => {
        fnFetchUser();
        navigate("/auth");
      })
      .finally(() => setLogoutLoading(false));
  };

  return (
    <>
      <nav className="flex w-full items-center justify-between py-6 sm:px-10 sm:py-2">
        <div>
          <Link to={"/"}>
            <img
              className="h-16 sm:h-28"
              src="./shortler.png"
              alt="shortler-logo"
            />
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className={"cursor-pointer sm:size-10"}>
                  <AvatarImage
                    className={"object-contain"}
                    src={user.user_metadata.profilePicture}
                  />
                  <AvatarFallback>
                    {user.user_metadata.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.user_metadata.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="flex items-center gap-2" to={"/dashboard"}>
                    <Link2 /> <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LogOut />
                  <span onClick={handleLogoutUser}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size={"sm"} onClick={handleNavigateToAuth}>
              Login
            </Button>
          )}
        </div>
      </nav>
      {logoutLoading && <Loader />}
    </>
  );
};
