const themeConfig = {
  colors: {
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      dark: 'hsl(var(--primary-dark))',
      light: 'hsl(var(--primary-light))'
    },
    accent: {
      yellow: 'hsl(45, 93%, 47%)',
      blue: 'hsl(206, 100%, 50%)',
      red: 'hsl(0, 84%, 60%)'
    },
    status: {
      pending: 'hsl(45, 93%, 47%)',
      processing: 'hsl(206, 100%, 50%)',
      completed: 'hsl(145, 63%, 42%)',
      cancelled: 'hsl(0, 84%, 60%)'
    },
    background: {
      card: 'hsl(var(--card-bg))',
      sidebar: 'hsl(var(--sidebar-bg))',
      overlay: 'hsl(var(--overlay-bg))'
    }
  },
  animation: {
    transition: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      medium: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
}

export default themeConfig; 