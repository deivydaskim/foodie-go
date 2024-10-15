import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-bg': 'linear-gradient(to bottom, #FFFFFF, #CFD8DC)',
      },
      colors: {
        gray: {
          100: '#F8F8F8',
          200: '#D9D9D9',
          300: '#9E9E9E',
          400: '#676767',
        },
        blueGray: {
          100: '#E3E8EB',
          200: '#C8D0D4',
        },
        green: '#0FA958',
        darkGreen: '#388E3C',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.header1': {
          fontSize: '1.75rem', // 28px
          fontWeight: '600', // SemiBold
        },
        '.header2': {
          fontSize: '1.375rem', // 22px
          fontWeight: '700', // Bold
        },
        '.header3': {
          fontSize: '1.125rem', // 18px
          fontWeight: '600',
        },
        '.header4': {
          fontSize: '1.125rem', // 18px
          fontWeight: '700',
        },
        '.button': {
          fontSize: '0.875rem', // 14px
          fontWeight: '500', // Medium
        },
        '.caption': {
          fontSize: '0.75rem', // 12px
          fontWeight: '500',
        },
        '.subtitle1': {
          fontSize: '0.875rem', // 14px
          fontWeight: '400', // Regular
        },
        '.subtitle2': {
          fontSize: '0.875rem', // 14px
          fontWeight: '300', // Light
        },
        '.body1': {
          fontSize: '1rem', // 16px
          fontWeight: '700',
        },
        '.body2': {
          fontSize: '1rem', // 16px
          fontWeight: '600',
        },
      });
    }),
  ],
};
export default config;
