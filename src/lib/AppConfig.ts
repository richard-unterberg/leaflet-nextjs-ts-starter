import { LatLngExpression } from 'leaflet'
import colors from 'tailwindcss/colors'

// FIXME: naming and structure
export const MapConfig = {
  minZoom: 13,
  maxZoom: 18, // max zoom level of CARTO: 18
  ui: {
    topBarHeight: 80,
    bigIconSize: 48,
    mapIconSize: 28,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  baseCenter: [52.02022592597971, 8.530780645829076] as LatLngExpression, // bielefeld lol
}

export enum NavMenuVariant {
  INTRO = 'vertical',
  TOPNAV = 'horizontal',
}

export const AppColor = {
  primary: {
    hex: colors.sky[700],
    tw: {
      text: 'text-sky-700',
      bg: 'bg-sky-700',
    },
  },
  secondary: {
    hex: colors.slate[600],
    tw: {
      text: 'text-slate-600',
      bg: 'bg-slate-600',
    },
  },
  dark: {
    hex: colors.slate[900],
    tw: {
      text: 'text-slate-900',
      bg: 'bg-slate-900',
    },
  },
  light: {
    hex: colors.slate[200],
    tw: {
      text: 'text-slate-300',
      bg: 'bg-slate-300',
    },
  },
  white: {
    hex: colors.slate[50],
    tw: {
      text: 'text-slate-50',
      bg: 'bg-slate-50',
    },
  },
}
