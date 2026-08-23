import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ profile }: { profile: any }) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="w-full max-w-xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/30" />
        <Input 
          placeholder="Search bus, route, or driver..." 
          className="h-11 pl-11 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all w-full border-none ring-1 ring-slate-100"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-all">
          <Bell className="h-5 w-5 text-ink/60" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center gap-3 pl-2 py-1 pr-1 rounded-2xl hover:bg-slate-50 transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-ink leading-tight">{profile?.full_name}</p>
                <p className="text-xs font-medium text-ink/40 leading-tight">{profile?.id_number || 'ID Number'}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-primary/10 shadow-sm">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary/5 text-primary font-bold">
                  {profile?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-2xl shadow-2xl border-none p-2 mt-2" align="end">
            <DropdownMenuLabel className="font-bold text-ink/40 uppercase text-[10px] tracking-widest px-3 py-2">Account</DropdownMenuLabel>
            <DropdownMenuItem className="rounded-xl font-bold py-3 px-3 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl font-bold py-3 px-3 cursor-pointer">Preferences</DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 bg-slate-50" />
            <DropdownMenuItem className="rounded-xl font-bold py-3 px-3 cursor-pointer text-red-500">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
