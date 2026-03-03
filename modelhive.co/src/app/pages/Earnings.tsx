import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { TrendingUp, DollarSign, Download, Calendar } from "lucide-react";
import { GumroadCard } from "../components/GumroadCard";
import { GradientGrid } from "../components/GradientGrid";

export function Earnings() {
  const stats = [
    { label: "Total Earnings", value: "$12,450.00", change: "+12.5%", gradient: "pink-purple" as const },
    { label: "This Month", value: "$3,240.00", change: "+8.2%", gradient: "purple-blue" as const },
    { label: "Available", value: "$1,890.00", change: "", gradient: "cyan-green" as const },
    { label: "Pending", value: "$450.00", change: "", gradient: "yellow-orange" as const },
  ];

  const recentSales = [
    {
      product: "Cinematic Portrait Pro",
      buyer: "john_doe",
      amount: "$24.99",
      net: "$23.74",
      date: "Mar 2, 2026",
      status: "completed",
    },
    {
      product: "Architectural Render LoRA",
      buyer: "jane_smith",
      amount: "$19.99",
      net: "$18.99",
      date: "Mar 2, 2026",
      status: "completed",
    },
    {
      product: "Cinematic Portrait Pro",
      buyer: "alex_turner",
      amount: "$24.99",
      net: "$23.74",
      date: "Mar 1, 2026",
      status: "pending",
    },
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full relative">
      <GradientGrid />
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between relative z-10">
        <div>
          <h1 className="mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Earnings
          </h1>
          <p className="text-muted-foreground">
            Track your sales and manage payouts
          </p>
        </div>
        <Button className="bg-violet-500 hover:bg-violet-600">
          Request Payout
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-6 hover:border-violet-500/50 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              {stat.change && (
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              )}
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-semibold mb-4">Revenue Overview</h3>
        <div className="h-64 flex items-center justify-center bg-accent/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Chart visualization would go here
          </p>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">Recent Sales</h3>
        </div>

        <div className="divide-y divide-border">
          {recentSales.map((sale, index) => (
            <div key={index} className="p-6 hover:bg-accent/50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{sale.product}</h4>
                    <Badge
                      variant={sale.status === "completed" ? "default" : "secondary"}
                      className={
                        sale.status === "completed"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : ""
                      }
                    >
                      {sale.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Buyer: {sale.buyer}</span>
                    <span>•</span>
                    <span>{sale.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-violet-400">{sale.amount}</p>
                  <p className="text-sm text-muted-foreground">Net: {sale.net}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 text-center border-t border-border">
          <button className="text-sm text-muted-foreground hover:text-foreground transition">
            View all transactions
          </button>
        </div>
      </div>

      {/* Payout Info */}
      <div className="mt-8 p-6 bg-accent/50 border border-border rounded-xl">
        <div className="flex items-start gap-4">
          <DollarSign className="w-5 h-5 text-violet-500 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-2">Payout Schedule</h4>
            <p className="text-sm text-muted-foreground">
              Earnings are available for payout 7 days after the sale. We process
              payouts via Stripe within 1-2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}