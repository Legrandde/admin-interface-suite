import { Bell, Mail, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";
import { useCrud } from "@/hooks/useCrud";

interface Notification {
  id: number;
  message: string;
  type: string;
  created_at: string;
  is_read?: boolean;
}

export function HeaderBar() {
  const { logout } = useAuth();
  const { data: alerts = [] } = useCrud<Notification>("/alert/");

  const unreadCount = alerts.filter((a: Notification) => !a.is_read).length;
  const recentAlerts = alerts.slice(0, 5);

  // Get stored username from token (basic decode)
  const token = localStorage.getItem("access_token");
  let username = "Utilisateur";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.username || payload.user || payload.sub || "Utilisateur";
    } catch {
      // ignore
    }
  }

  const initials = username
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-14 flex items-center border-b border-border bg-card px-4 sticky top-0 z-10 gap-2">
      <SidebarTrigger className="mr-2" />
      <div className="flex-1" />

      {/* Messages */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Mail className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 p-0">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium">Messages</p>
          </div>
          <div className="p-4 text-center text-sm text-muted-foreground">
            Aucun message
          </div>
        </PopoverContent>
      </Popover>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] leading-none flex items-center justify-center rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium">Notifications</p>
          </div>
          {recentAlerts.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="px-3 py-2.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm text-foreground line-clamp-2">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucune notification
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 pl-2 pr-1 h-9">
            <Avatar className="h-7 w-7">
              <AvatarImage src="" />
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {username}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
