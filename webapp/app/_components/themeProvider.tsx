// ThemeContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// ① テーマの型
export type Theme = 'light' | 'dark' | 'system';

// ② Context の値の型
interface ThemeContextType {
    theme: Theme;
    changeTheme: (newTheme: Theme) => void;
}

// ③ Context 作成（初期値は undefined を許容する）
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ④ Provider コンポーネント
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system');

    useEffect(() => {
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
        applyTheme(savedTheme);
        setTheme(savedTheme);
    }, []);

    const applyTheme = (theme: Theme) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'light') {
            root.classList.add('light');
        } else if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
            } else {
                root.classList.add('light');
            }
        }
    };

    const changeTheme = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// ⑤ カスタムフック
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
