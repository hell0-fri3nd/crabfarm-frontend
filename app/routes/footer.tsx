import { Bot } from "lucide-react"
import { Separator } from "../components/ui/separator"

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground">
      <Separator className="bg-border" />

      {/* <div className="mx-auto grid max-w-8xl grid-cols-3 items-center px-2 sm:px-6 py-6"> */}
        <div className="grid auto-rows-min gap-1 grid-cols-1 sm:gap-4 sm:grid-cols-3 px-2 sm:px-6 py-3">

        {/* LEFT side (empty to balance layout) */}
        <div></div>

        {/* CENTER section */}
        <div className="flex items-center justify-center gap-2 justify-center">

          <Bot className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm whitespace-nowrap">
            © 2025 <span className="text-foreground">Hello Friend</span>
          </p>

        </div>

        {/* RIGHT side */}
        <div className="flex items-center justify-center sm:justify-end">
          <p className="text-sm text-muted-foreground text-right">
            v0.2.0
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
