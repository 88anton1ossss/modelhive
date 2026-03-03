import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Plus, TrendingUp, Users, Package, MoreVertical, Eye, Edit, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export function Studio() {
  const [activeTab, setActiveTab] = useState("models");

  // Mock data
  const stats = [
    { label: "Total Earnings", value: "$12,450", icon: TrendingUp, change: "+12%" },
    { label: "Total Models", value: "23", icon: Package, change: "+2" },
    { label: "Followers", value: "1,234", icon: Users, change: "+45" },
    { label: "Total Downloads", value: "8,920", icon: Package, change: "+234" },
  ];

  const models = [
    {
      id: "1",
      title: "Cinematic Portrait Pro",
      status: "active",
      price: 24.99,
      downloads: 1240,
      revenue: "$4,200",
      lastUpdated: "2 days ago",
    },
    {
      id: "2",
      title: "Architectural Render LoRA",
      status: "active",
      price: 19.99,
      downloads: 890,
      revenue: "$3,100",
      lastUpdated: "1 week ago",
    },
    {
      id: "3",
      title: "Fantasy Landscape Dataset",
      status: "draft",
      price: 34.99,
      downloads: 0,
      revenue: "$0",
      lastUpdated: "3 days ago",
    },
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">My Studio</h1>
          <p className="text-muted-foreground">
            Manage your models, datasets, and earnings
          </p>
        </div>
        <Button className="bg-violet-500 hover:bg-violet-600">
          <Plus className="mr-2 w-4 h-4" />
          Create New Model
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-6 hover:border-violet-500/50 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-violet-500" />
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell className="font-medium">{model.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={model.status === "active" ? "default" : "secondary"}
                        className={
                          model.status === "active"
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            : ""
                        }
                      >
                        {model.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${model.price}</TableCell>
                    <TableCell>{model.downloads.toLocaleString()}</TableCell>
                    <TableCell className="text-violet-400 font-semibold">
                      {model.revenue}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {model.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 w-4 h-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 w-4 h-4" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="datasets">
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No datasets yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your first dataset to get started
            </p>
            <Button variant="outline">Upload Dataset</Button>
          </div>
        </TabsContent>

        <TabsContent value="earnings">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[
                { product: "Cinematic Portrait Pro", amount: "$24.99", date: "2 hours ago" },
                { product: "Architectural Render LoRA", amount: "$19.99", date: "5 hours ago" },
                { product: "Cinematic Portrait Pro", amount: "$24.99", date: "1 day ago" },
              ].map((transaction, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition"
                >
                  <div>
                    <p className="font-medium">{transaction.product}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <span className="text-violet-400 font-semibold">
                    +{transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="followers">
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">1,234 Followers</h3>
            <p className="text-sm text-muted-foreground">
              People who follow your work
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
