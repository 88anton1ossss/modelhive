import { Compass } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center space-y-6">
                <div className="text-7xl font-black indigo-gradient">404</div>
                <h1 className="text-2xl font-bold">Page not found</h1>
                <p className="text-white/40 text-sm">The page you're looking for doesn't exist or was moved.</p>
                <Link href="/marketplace" className="accent-button text-sm inline-flex items-center gap-2">
                    <Compass className="w-4 h-4" /> Go to Marketplace
                </Link>
            </div>
        </div>
    )
}
