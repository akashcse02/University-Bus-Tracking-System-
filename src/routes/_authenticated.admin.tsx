import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { 
  Bus, 
  MapPin, 
  Users, 
  Clock, 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Plus, 
  MoreVertical,
  Settings,
  Bell,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Edit3,
  Trash2,
  Save,
  Undo,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  head: () => ({
    title: "Admin Dashboard — PUB Bus Track",
    meta: [{ name: "description", content: "Administrative panel for PUB Bus Tracking System." }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate({ to: "/login" });
  };

  const buses = [
    { id: "PUB-01", driver: "Akash Ahmed", route: "Gobindaganj", status: "Active", capacity: "50/52" },
    { id: "PUB-02", driver: "Rahman Ali", route: "Sherpur", status: "Active", capacity: "45/52" },
    { id: "PUB-03", driver: "Karim Ullah", route: "Bogura Town", status: "Maintenance", capacity: "0/52" },
    { id: "PUB-05", driver: "Selim Khan", route: "Gobindaganj", status: "Active", capacity: "48/52" },
  ];

  const users = [
    { id: "21102001", name: "Md. Sakib", role: "Student", dept: "CSE", joined: "Aug 12, 2026" },
    { id: "T-402", name: "Dr. Farhana", role: "Teacher", dept: "EEE", joined: "Aug 15, 2026" },
    { id: "D-05", name: "Selim Khan", role: "Driver", dept: "Transport", joined: "Jul 20, 2026" },
    { id: "A-01", name: "Admin Root", role: "Admin", dept: "IT", joined: "Jan 01, 2026" },
  ];

  const schedules = [
    { route: "Gobindaganj", departure: "7:30 AM", arrival: "8:45 AM", type: "Morning" },
    { route: "Sherpur", departure: "7:45 AM", arrival: "8:50 AM", type: "Morning" },
    { route: "Bogura Town", departure: "8:00 AM", arrival: "8:30 AM", type: "Morning" },
    { route: "Gobindaganj", departure: "2:15 PM", arrival: "3:30 PM", type: "Evening" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">P</div>
            <span className="font-display font-bold text-xl tracking-tight text-ink">PUB Track</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "dashboard" ? "bg-primary/10 text-primary" : "text-ink/60 hover:bg-slate-50 hover:text-ink"}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("buses")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "buses" ? "bg-primary/10 text-primary" : "text-ink/60 hover:bg-slate-50 hover:text-ink"}`}
          >
            <Bus className="h-5 w-5" />
            Bus Fleet
          </button>
          <button 
            onClick={() => setActiveTab("routes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "routes" ? "bg-primary/10 text-primary" : "text-ink/60 hover:bg-slate-50 hover:text-ink"}`}
          >
            <MapPin className="h-5 w-5" />
            Route Schedules
          </button>
          <button 
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "schedule" ? "bg-primary/10 text-primary" : "text-ink/60 hover:bg-slate-50 hover:text-ink"}`}
          >
            <CalendarDays className="h-5 w-5" />
            Schedule Manager
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "users" ? "bg-primary/10 text-primary" : "text-ink/60 hover:bg-slate-50 hover:text-ink"}`}
          >
            <Users className="h-5 w-5" />
            User Management
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "settings" ? "bg-primary/10 text-primary" : "text-ink/60 hover:bg-slate-50 hover:text-ink"}`}
          >
            <Settings className="h-5 w-5" />
            System Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="font-display font-bold text-lg text-ink capitalize">
            {activeTab.replace("-", " ")}
          </h2>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search everything..." className="h-9 w-64 pl-9 rounded-full bg-slate-50 border-transparent focus:bg-white focus:ring-1" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-ink transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-slate-100">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <Reveal>
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Buses", value: "12", icon: Bus, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Active Routes", value: "8", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Total Users", value: "1,240", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
                    { label: "On-Time Rate", value: "94%", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                  ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-400">{stat.label}</p>
                          <h3 className="text-2xl font-extrabold text-ink">{stat.value}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-display font-bold">Recent Bus Activity</CardTitle>
                        <CardDescription>Live status of fleet movements</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl font-bold">View All</Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="font-bold">Bus ID</TableHead>
                            <TableHead className="font-bold">Driver</TableHead>
                            <TableHead className="font-bold">Route</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {buses.map((bus) => (
                            <TableRow key={bus.id} className="border-slate-50">
                              <TableCell className="font-bold text-ink">{bus.id}</TableCell>
                              <TableCell className="text-ink/70 font-medium">{bus.driver}</TableCell>
                              <TableCell className="text-ink/70 font-medium">{bus.route}</TableCell>
                              <TableCell>
                                <Badge variant={bus.status === "Active" ? "default" : "secondary"} className="rounded-full font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1">
                                  {bus.status === "Active" ? (
                                    <span className="flex items-center gap-1.5">
                                      <CheckCircle2 className="h-3 w-3" /> {bus.status}
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                      <AlertCircle className="h-3 w-3" /> {bus.status}
                                    </span>
                                  )}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-display font-bold">Quick Actions</CardTitle>
                      <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start gap-3 h-12 rounded-2xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        <Plus className="h-5 w-5" />
                        Add New Bus
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-2xl font-bold border-slate-200 hover:bg-slate-50">
                        <MapPin className="h-5 w-5" />
                        Create Route
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-2xl font-bold border-slate-200 hover:bg-slate-50">
                        <Clock className="h-5 w-5" />
                        Update Schedule
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-2xl font-bold border-slate-200 hover:bg-slate-50">
                        <Bell className="h-5 w-5" />
                        Broadcast Alert
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "buses" && (
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                  <div>
                    <CardTitle className="text-2xl font-display font-extrabold">Bus Fleet</CardTitle>
                    <CardDescription>Manage and monitor all university buses</CardDescription>
                  </div>
                  <Button className="rounded-2xl font-bold px-6">Add Bus</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="font-bold">Bus ID</TableHead>
                        <TableHead className="font-bold">Driver Name</TableHead>
                        <TableHead className="font-bold">Assigned Route</TableHead>
                        <TableHead className="font-bold">Capacity</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buses.map((bus) => (
                        <TableRow key={bus.id} className="border-slate-50 group">
                          <TableCell className="font-bold text-ink">{bus.id}</TableCell>
                          <TableCell className="font-medium text-ink/70">{bus.driver}</TableCell>
                          <TableCell className="font-medium text-ink/70">{bus.route}</TableCell>
                          <TableCell className="font-medium text-ink/70">{bus.capacity}</TableCell>
                          <TableCell>
                            <Badge className={`rounded-full font-bold border-none px-3 py-1 ${bus.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                              {bus.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <button className="p-2 text-slate-300 hover:text-ink transition-colors opacity-0 group-hover:opacity-100">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeTab === "routes" && (
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                  <div>
                    <CardTitle className="text-2xl font-display font-extrabold">Route Schedules</CardTitle>
                    <CardDescription>Daily bus arrival and departure times</CardDescription>
                  </div>
                  <Button className="rounded-2xl font-bold px-6">New Schedule</Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="morning">
                    <TabsList className="mb-6 rounded-2xl bg-slate-100 p-1 w-fit">
                      <TabsTrigger value="morning" className="rounded-xl font-bold transition-all data-[state=active]:bg-white px-6">Morning</TabsTrigger>
                      <TabsTrigger value="evening" className="rounded-xl font-bold transition-all data-[state=active]:bg-white px-6">Evening</TabsTrigger>
                    </TabsList>
                    <TabsContent value="morning">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="font-bold">Route Name</TableHead>
                            <TableHead className="font-bold">Departure</TableHead>
                            <TableHead className="font-bold">Arrival (Campus)</TableHead>
                            <TableHead className="font-bold">Shift</TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {schedules.filter(s => s.type === 'Morning').map((item, i) => (
                            <TableRow key={i} className="border-slate-50 group">
                              <TableCell className="font-bold text-ink">{item.route}</TableCell>
                              <TableCell className="font-medium text-ink/70">{item.departure}</TableCell>
                              <TableCell className="font-medium text-ink/70">{item.arrival}</TableCell>
                              <TableCell>
                                <Badge className="rounded-full bg-blue-100 text-blue-700 font-bold border-none px-3 py-1">
                                  Morning
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <button className="p-2 text-slate-300 hover:text-ink transition-colors opacity-0 group-hover:opacity-100">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="evening">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="font-bold">Route Name</TableHead>
                            <TableHead className="font-bold">Departure</TableHead>
                            <TableHead className="font-bold">Arrival (Destination)</TableHead>
                            <TableHead className="font-bold">Shift</TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {schedules.filter(s => s.type === 'Evening').map((item, i) => (
                            <TableRow key={i} className="border-slate-50 group">
                              <TableCell className="font-bold text-ink">{item.route}</TableCell>
                              <TableCell className="font-medium text-ink/70">{item.departure}</TableCell>
                              <TableCell className="font-medium text-ink/70">{item.arrival}</TableCell>
                              <TableCell>
                                <Badge className="rounded-full bg-amber-100 text-amber-700 font-bold border-none px-3 py-1">
                                  Evening
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <button className="p-2 text-slate-300 hover:text-ink transition-colors opacity-0 group-hover:opacity-100">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "users" && (
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                  <div>
                    <CardTitle className="text-2xl font-display font-extrabold">User Management</CardTitle>
                    <CardDescription>Control user access and assign roles</CardDescription>
                  </div>
                  <Button className="rounded-2xl font-bold px-6">Invite User</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="font-bold">ID / Email</TableHead>
                        <TableHead className="font-bold">Full Name</TableHead>
                        <TableHead className="font-bold">Department</TableHead>
                        <TableHead className="font-bold">Role</TableHead>
                        <TableHead className="font-bold">Joined</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="border-slate-50 group">
                          <TableCell className="font-bold text-ink">{user.id}</TableCell>
                          <TableCell className="font-medium text-ink/70">{user.name}</TableCell>
                          <TableCell className="font-medium text-ink/70">{user.dept}</TableCell>
                          <TableCell>
                            <Badge className={`rounded-full font-bold border-none px-3 py-1 ${
                              user.role === 'Admin' ? 'bg-ink text-white' : 
                              user.role === 'Driver' ? 'bg-amber-100 text-amber-700' :
                              user.role === 'Teacher' ? 'bg-violet-100 text-violet-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-ink/40 text-sm">{user.joined}</TableCell>
                          <TableCell className="text-right">
                            <button className="p-2 text-slate-300 hover:text-ink transition-colors opacity-0 group-hover:opacity-100">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeTab === "schedule" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-ink">Schedule Manager</h3>
                    <p className="text-slate-500 font-medium">Update Class and Exam time datasets for all routes.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl font-bold gap-2">
                      <Undo className="h-4 w-4" />
                      Discard
                    </Button>
                    <Button className="rounded-2xl font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
                    <CardHeader className="bg-white border-b border-slate-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display font-bold">Class Time Dataset</CardTitle>
                        <Badge className="bg-blue-100 text-blue-700 font-bold border-none">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="font-bold">Slot / Day</TableHead>
                            <TableHead className="font-bold">Campus</TableHead>
                            <TableHead className="font-bold">Sathmatha</TableHead>
                            <TableHead className="font-bold">Bonani</TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { slot: "Morning 08:30", campus: "08:30 AM", sathmatha: "08:40 AM", bonani: "08:30 AM" },
                            { slot: "Noon 01:05", campus: "01:05 PM", sathmatha: "-", bonani: "-" },
                            { slot: "Afternoon 04:15", campus: "04:15 PM", sathmatha: "02:05 PM", bonani: "-" },
                          ].map((row, i) => (
                            <TableRow key={i} className="group border-slate-50">
                              <TableCell className="font-bold text-ink">{row.slot}</TableCell>
                              <TableCell className="font-mono text-ink/70">{row.campus}</TableCell>
                              <TableCell className="font-mono text-ink/70">{row.sathmatha}</TableCell>
                              <TableCell className="font-mono text-ink/70">{row.bonani}</TableCell>
                              <TableCell className="text-right">
                                <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                        <Button variant="ghost" size="sm" className="w-full rounded-xl font-bold text-ink/40 gap-2">
                          <Plus className="h-4 w-4" />
                          Add Row
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle className="font-display font-bold">Exam Mode Control</CardTitle>
                        <CardDescription>Switch the entire system to Exam Schedule.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                          <div className="flex items-center gap-3">
                            <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-600">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-amber-900">Exam Mode</p>
                              <p className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">System-wide</p>
                            </div>
                          </div>
                          <Switch className="data-[state=checked]:bg-amber-600" />
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 italic">
                          * Enabling this will default the Time Schedule page to the 'Exam Time' tab for all users.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle className="font-display font-bold">Quick Export</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl font-bold border-slate-200 hover:bg-slate-50">
                          <Download className="h-4 w-4" />
                          Export CSV
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl font-bold border-slate-200 hover:bg-slate-50">
                          <Download className="h-4 w-4" />
                          Generate PDF Preview
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-ink">System Settings</h3>
                    <p className="text-slate-500 font-medium">Global configuration for the PUB Bus Track platform.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-display font-bold">General Config</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base font-bold text-ink">Maintenance Mode</Label>
                          <p className="text-sm text-slate-500">Disable live tracking for system updates.</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base font-bold text-ink">Public Registration</Label>
                          <p className="text-sm text-slate-500">Allow new students to sign up.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-display font-bold">Notification Gateway</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base font-bold text-ink">SMS Alerts</Label>
                          <p className="text-sm text-slate-500">Enable automated SMS reminders.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base font-bold text-ink">Push Notifications</Label>
                          <p className="text-sm text-slate-500">Enable browser push notifications.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </Reveal>

          {/* Hidden Metadata Container */}
          <div className="hidden" aria-hidden="true">
            {`'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                            
                                                
                                                Add an admin-only interface so I can update the Class Time schedule and swap in the real Exam Time dataset.

Implement deep links so I can open the Time Schedule page directly to a specific day and route with the correct tab selected.

Add a notification preferences panel so I can choose push notifications or SMS reminders and control how far in advance I get alerted.`}
          </div>
        </div>
      </main>
    </div>
  );
}