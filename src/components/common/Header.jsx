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

export const Header = () => {
  const navigate = useNavigate();
  const handleNavigateToAuth = () => navigate("/auth");
  const { isAuthenticated, user } = useUser()

  return (
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
                <AvatarImage src={user.user_metadata.profilePicture} />
                <AvatarFallback>
                  {
                    user.user_metadata.name.slice(0, 2).toUpperCase()
                  }
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.user_metadata.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link2 /> My Links
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut />
                Logout
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
  );
};
