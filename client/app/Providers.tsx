'use client'
import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = (props: ProvidersProps) => {
  return <ThemeProvider attribute="class">{props.children}</ThemeProvider>
}

export default Providers
