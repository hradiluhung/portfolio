import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface ButtonToggleThemeProps {
  className?: string
}

export default function ButtonToggleTheme(props: ButtonToggleThemeProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(props.className, 'rounded-full dark:hover:bg-white/10 hover:bg-black/10')}
    >
      <span
        key={isDark ? 'sun' : 'moon'}
        className="flex items-center justify-center animate-spin-once"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
    </Button>
  )
}
