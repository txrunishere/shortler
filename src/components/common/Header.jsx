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

export const Header = () => {
  const navigate = useNavigate();
  const handleNavigateToAuth = () => navigate("/auth");
  const user = true;

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
        {!user ? (
          <Button size={"sm"} onClick={handleNavigateToAuth}>
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className={"cursor-pointer sm:size-10"}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tarun Soni</DropdownMenuLabel>
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
        )}
      </div>
    </nav>
  );
};
