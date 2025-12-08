import { Bot } from "lucide-react"
import { Separator } from "../ui/separator"

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground">
      <Separator className="bg-border" />

      <div className="mx-auto grid max-w-8xl grid-cols-3 items-center px-2 sm:px-6 py-6">
        
        {/* LEFT side (empty to balance layout) */}
        <div></div>

        {/* CENTER section */}
        <div className="flex items-center justify-center gap-2">
          <Bot className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm">
            © 2025 <span className="text-foreground">Hello Friend</span>
          </p>
        </div>

        {/* RIGHT side */}
        <p className="text-sm text-muted-foreground text-right">
          v1.0.0
        </p>

      </div>
    </footer>
  )
}

export default Footer
