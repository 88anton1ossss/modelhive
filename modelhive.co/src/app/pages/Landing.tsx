import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  ArrowRight, Sparkles, TrendingUp, Download, Users, Zap, 
  Shield, Star, Eye, Heart, Play, CheckCircle, Rocket,
  DollarSign, BarChart, Globe, Code
} from "lucide-react";
import { motion } from "motion/react";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Landing() {
  const featuredProjects = [
    { 
      title: "CyberPunk Portrait LoRA", 
      author: "Sarah Chen", 
      views: "24.5k", 
      likes: "3.2k",
      price: "$29",
      image: "https://images.unsplash.com/photo-1729375874763-45ddfc9feec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNDM0NjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "LoRA",
      tagColor: "pink"
    },
    { 
      title: "Futuristic Sci-Fi Model", 
      author: "Mike Rodriguez", 
      views: "18.3k", 
      likes: "2.7k",
      price: "$49",
      image: "https://images.unsplash.com/photo-1771515220905-ba0784fb7522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGFydHxlbnwxfHx8fDE3NzI0NTIwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Model",
      tagColor: "purple"
    },
    { 
      title: "Abstract Art Dataset", 
      author: "Emma Liu", 
      views: "32.1k", 
      likes: "4.8k",
      price: "$19",
      image: "https://images.unsplash.com/photo-1639493115941-b269818abfcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzcyNDc0MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Dataset",
      tagColor: "cyan"
    },
    { 
      title: "Urban Architecture Pack", 
      author: "David Kim", 
      views: "15.7k", 
      likes: "1.9k",
      price: "$39",
      image: "https://images.unsplash.com/photo-1761414500824-e280de5a1b37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjQ3NzAzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "LoRA",
      tagColor: "blue"
    },
  ];

  const trendingToday = [
    { name: "Neon Nights XL", creator: "Alex Turner", sales: 142, badge: "🔥" },
    { name: "Portrait Master v2", creator: "Jessica Wang", sales: 98, badge: "✨" },
    { name: "Fashion Dataset Pro", creator: "Carlos Mendez", sales: 76, badge: "⚡" },
    { name: "Anime Style LoRA", creator: "Yuki Tanaka", sales: 54, badge: "💫" },
  ];

  const stats = [
    { label: "Creators", value: "12.5k+", icon: Users },
    { label: "Models Sold", value: "48k+", icon: Download },
    { label: "Total Earnings", value: "$2.4M+", icon: DollarSign },
    { label: "Avg. Revenue Share", value: "95%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--scheme-primary)]/5 via-background to-[var(--scheme-secondary)]/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--scheme-primary)_0%,_transparent_50%)] opacity-10 pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--scheme-primary)] to-[var(--scheme-secondary)] flex items-center justify-center shadow-lg shadow-[var(--scheme-primary)]/20">
                <span className="text-white font-bold text-sm">MH</span>
              </div>
              <span className="font-semibold text-xl hidden sm:block">ModelHive</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/marketplace" className="text-sm hover:text-foreground transition text-muted-foreground">
                Marketplace
              </Link>
              <Link to="/feed" className="text-sm hover:text-foreground transition text-muted-foreground">
                Feed
              </Link>
              <a href="#pricing" className="text-sm hover:text-foreground transition text-muted-foreground">
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign In</Button>
              <Button size="sm" className="bg-gradient-to-r from-[var(--scheme-primary)] to-[var(--scheme-secondary)] hover:opacity-90 shadow-lg shadow-[var(--scheme-primary)]/20">
                Start Selling
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Viral Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--scheme-primary)]/10 to-[var(--scheme-secondary)]/10 border border-[var(--scheme-primary)]/20 mb-8"
          >
            <Rocket className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
            <span className="text-sm font-medium">The creator-first AI marketplace</span>
            <Badge className="ml-1 bg-[var(--scheme-primary)] text-white border-0">New</Badge>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[var(--scheme-primary)] via-[var(--scheme-secondary)] to-[var(--scheme-primary)] bg-clip-text text-transparent">
              Sell AI Models.
            </span>
            <br />
            <span className="text-foreground">Keep 95% Revenue.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The minimal, elegant marketplace for AI models, LoRAs, and datasets. 
            <span className="text-foreground font-medium"> Built by creators, for creators.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" className="bg-gradient-to-r from-[var(--scheme-primary)] to-[var(--scheme-secondary)] hover:opacity-90 shadow-xl shadow-[var(--scheme-primary)]/30 text-lg px-8 py-6 w-full sm:w-auto">
              Start Selling Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-2 border-[var(--scheme-primary)]/30 hover:bg-[var(--scheme-primary)]/5 text-lg px-8 py-6">
                <Play className="mr-2 w-5 h-5" />
                Explore Marketplace
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
              <span>No fees to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
              <span>Instant payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-accent rounded border">⌘K</kbd>
              <span>to search</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 text-center hover:border-[var(--scheme-primary)]/30 transition">
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--scheme-primary)" }} />
              <p className="text-3xl font-bold mb-1" style={{ color: "var(--scheme-primary)" }}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Featured Projects - Large Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <Link to="/marketplace" className="text-sm hover:underline flex items-center gap-1" style={{ color: "var(--scheme-primary)" }}>
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-[var(--scheme-primary)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--scheme-primary)]/20">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Tag */}
                    <Badge className={`absolute top-4 left-4 ${
                      project.tagColor === 'pink' ? 'bg-pink-500' :
                      project.tagColor === 'purple' ? 'bg-purple-500' :
                      project.tagColor === 'cyan' ? 'bg-cyan-500' :
                      'bg-blue-500'
                    } text-white border-0 shadow-lg`}>
                      {project.tag}
                    </Badge>

                    {/* Price */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                      <span className="text-white font-bold">{project.price}</span>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                        <p className="text-white/80 text-sm">by {project.author}</p>
                      </div>
                      <div className="flex items-center gap-3 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{project.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout - Trending + Why ModelHive */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Trending Today */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:border-[var(--scheme-primary)]/30 transition"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--scheme-primary)]/20 to-[var(--scheme-secondary)]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" style={{ color: "var(--scheme-primary)" }} />
              </div>
              <h3 className="text-xl font-bold">Trending Today</h3>
            </div>
            
            <div className="space-y-3">
              {trendingToday.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition cursor-pointer group">
                  <span className="text-2xl">{item.badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate group-hover:text-[var(--scheme-primary)] transition">{item.name}</p>
                    <p className="text-sm text-muted-foreground">by {item.creator}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: "var(--scheme-primary)" }}>{item.sales}</p>
                    <p className="text-xs text-muted-foreground">sales</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why ModelHive */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-[var(--scheme-primary)]/10 to-[var(--scheme-secondary)]/10 backdrop-blur border border-[var(--scheme-primary)]/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--scheme-primary)] to-[var(--scheme-secondary)] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Why ModelHive?</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "var(--scheme-primary)", opacity: 0.2 }}>
                  <CheckCircle className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
                </div>
                <div>
                  <p className="font-medium mb-1">Best Revenue Share</p>
                  <p className="text-sm text-muted-foreground">Keep 95% vs 80% on other platforms</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "var(--scheme-primary)", opacity: 0.2 }}>
                  <Zap className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
                </div>
                <div>
                  <p className="font-medium mb-1">Instant Payouts</p>
                  <p className="text-sm text-muted-foreground">Get paid immediately with Stripe</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "var(--scheme-primary)", opacity: 0.2 }}>
                  <Download className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
                </div>
                <div>
                  <p className="font-medium mb-1">One-Click Import</p>
                  <p className="text-sm text-muted-foreground">Import your Civitai models instantly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "var(--scheme-primary)", opacity: 0.2 }}>
                  <BarChart className="w-4 h-4" style={{ color: "var(--scheme-primary)" }} />
                </div>
                <div>
                  <p className="font-medium mb-1">Creator Dashboard</p>
                  <p className="text-sm text-muted-foreground">Beautiful analytics and insights</p>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-[var(--scheme-primary)] to-[var(--scheme-secondary)] hover:opacity-90 shadow-lg">
              Start Selling Today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:border-cyan-500/30 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">For Photographers</h3>
            <p className="text-muted-foreground mb-4">
              Turn your photo library into passive income. Sell datasets to AI trainers worldwide.
            </p>
            <Button variant="outline" size="sm" className="border-cyan-500/30 hover:bg-cyan-500/5">
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:border-purple-500/30 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">For AI Artists</h3>
            <p className="text-muted-foreground mb-4">
              Monetize your LoRAs and custom models. Join thousands of successful creators.
            </p>
            <Button variant="outline" size="sm" className="border-purple-500/30 hover:bg-purple-500/5">
              Start Creating
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:border-green-500/30 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Global Community</h3>
            <p className="text-muted-foreground mb-4">
              Connect with creators worldwide. Share, learn, and grow together.
            </p>
            <Button variant="outline" size="sm" className="border-green-500/30 hover:bg-green-500/5">
              Join Community
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to start earning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 12,500+ creators who are already making money with ModelHive
            </p>
            <Button size="lg" className="bg-gradient-to-r from-[var(--scheme-primary)] to-[var(--scheme-secondary)] hover:opacity-90 shadow-xl shadow-[var(--scheme-primary)]/30 text-lg px-10 py-6">
              Start Selling Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/marketplace" className="hover:text-foreground transition">Marketplace</Link></li>
                <li><Link to="/feed" className="hover:text-foreground transition">Feed</Link></li>
                <li><a href="#pricing" className="hover:text-foreground transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--scheme-primary)] to-[var(--scheme-secondary)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">MH</span>
                </div>
                <span className="text-sm text-muted-foreground">© 2026 ModelHive. Built for creators.</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition">Twitter</a>
                <a href="#" className="hover:text-foreground transition">Discord</a>
                <a href="#" className="hover:text-foreground transition">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}