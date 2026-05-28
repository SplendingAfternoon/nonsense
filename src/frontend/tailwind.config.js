import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                /* High-Tech Oppressive Luxury Color Palette */
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))', /* #0b090a Rich Black */
                foreground: 'oklch(var(--foreground))', /* #FFFFFF White */
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)', /* #a4161a Blood Red */
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)', /* #161a1d Dark Grey/Blue */
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                /* Brand Colors */
                'background': '#0a0a0a',
                'surface': '#111111',
                'text-primary': '#e8e4de',
                'text-muted': '#7a7570',
                'accent': '#9e1a1a',
                'accent-hover': '#c42020',
                'blood-red': '#9e1a1a',
                'dark-red': '#660708',
                'rich-black': '#0a0a0a',
                'dark-surface': '#111111',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'luxury': '0 20px 60px -15px rgba(164, 22, 26, 0.3)',
                'luxury-sm': '0 10px 30px -10px rgba(164, 22, 26, 0.2)',
                'evil': '0 25px 80px -20px rgba(164, 22, 26, 0.5), 0 0 40px rgba(164, 22, 26, 0.2)',
            },
            fontFamily: {
                /* Cinzel for headings and navigation, Tenor Sans for body */
                sans: ['Tenor Sans', 'system-ui', 'sans-serif'],
                heading: ['Cinzel', 'serif'],
            },
            /* Font sizes reduced by 10% globally */
            fontSize: {
                xs: ['0.675rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
                sm: ['0.7875rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
                base: ['0.9rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
                lg: ['1.0125rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
                xl: ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
                '2xl': ['1.35rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '3xl': ['1.6875rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '4xl': ['2.025rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '5xl': ['2.7rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '6xl': ['3.375rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '7xl': ['4.05rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '8xl': ['5.4rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
                '9xl': ['7.2rem', { lineHeight: '1.6', letterSpacing: '0.1em' }],
            },
            /* Letter spacing: 0.1em for headings, 0.05em for body */
            letterSpacing: {
                tighter: '0.025em',
                tight: '0.04em',
                normal: '0.05em',
                wide: '0.08em',
                wider: '0.1em',
                widest: '0.15em',
            },
            /* Global line height: 1.6 */
            lineHeight: {
                none: '1',
                tight: '1.4',
                snug: '1.5',
                normal: '1.6',
                relaxed: '1.8',
                loose: '2',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
            },
            /* Global transition duration: 600ms */
            transitionDuration: {
                DEFAULT: '600ms',
                75: '75ms',
                100: '100ms',
                150: '150ms',
                200: '200ms',
                300: '300ms',
                500: '500ms',
                600: '600ms',
                700: '700ms',
                800: '800ms',
                1000: '1000ms',
            },
            /* Global easing: cubic-bezier(0.4, 0.0, 0.2, 1) - mechanical, no bounce */
            transitionTimingFunction: {
                DEFAULT: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                linear: 'linear',
                in: 'cubic-bezier(0.4, 0.0, 1, 1)',
                out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
                'in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                mechanical: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'slide-in': {
                    from: { transform: 'translateX(-100%)', opacity: '0.8' },
                    to: { transform: 'translateX(0)', opacity: '1' }
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                'scale-in': {
                    from: { transform: 'scale(0.96)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' }
                },
                'scale-in-subtle': {
                    from: { transform: 'scale(0.98)', opacity: '0.7' },
                    to: { transform: 'scale(1)', opacity: '1' }
                },
                'flicker-in': {
                    '0%': { opacity: '0' },
                    '10%': { opacity: '0.3' },
                    '20%': { opacity: '0.1' },
                    '30%': { opacity: '0.5' },
                    '40%': { opacity: '0.2' },
                    '50%': { opacity: '0.7' },
                    '60%': { opacity: '0.4' },
                    '70%': { opacity: '0.9' },
                    '100%': { opacity: '1' }
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        opacity: '1',
                        filter: 'drop-shadow(0 0 12px rgba(164, 22, 26, 0.5))'
                    },
                    '50%': { 
                        opacity: '0.6',
                        filter: 'drop-shadow(0 0 20px rgba(164, 22, 26, 0.7))'
                    }
                },
                'rotate-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                }
            },
            animation: {
                /* All animations use 600ms with mechanical easing */
                'accordion-down': 'accordion-down 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'accordion-up': 'accordion-up 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'slide-in': 'slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'fade-in': 'fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'scale-in': 'scale-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'scale-in-subtle': 'scale-in-subtle 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'flicker-in': 'flicker-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'rotate-slow': 'rotate-slow 300s linear infinite',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
