import twConfig from '#root/tailwind.config'

export const twColor = (color: keyof typeof twConfig.theme.colors) => twConfig.theme.colors[color]
