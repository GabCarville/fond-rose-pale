import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Rose pâle le jour, rose poudré profond la nuit.
const { theme } = makeColors({
  label: 'Rose pâle',
  roles: { accent: '#c2457a', danger: '#b8322f', success: '#3f7d4e', warning: '#a8661a', pro: '#7a4f9a' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#f8e4ea',
        'surface-1': '#fbedf1',
        'surface-2': '#fdf5f7',
        'text-primary': '#2e1a22',
        'text-secondary': '#57404a',
        'text-muted': '#6e5560',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#241a1e',
        'surface-1': '#2d2126',
        'surface-2': '#36282e',
        'surface-3': '#3d2e34',
        'text-primary': '#f8e8ee',
        'text-secondary': '#d8c4cc',
        'text-muted': '#b6a0aa',
      },
    },
  },
})


const LOOK: ThemeSetArgs = { colors: theme }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })
}
