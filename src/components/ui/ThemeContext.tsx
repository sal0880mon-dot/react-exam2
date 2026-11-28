import { createContext, useState, type ReactNode } from 'react'

type ThemeContextType = {
    theme: string
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState('light')

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}