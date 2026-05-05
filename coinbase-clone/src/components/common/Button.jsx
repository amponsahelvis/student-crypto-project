import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-cb-blue text-white hover:bg-blue-700 border border-transparent',
  outline: 'bg-white text-cb-dark border border-cb-gray-300 hover:bg-cb-gray-50',
  ghost: 'bg-transparent text-cb-dark hover:bg-cb-gray-100 border border-transparent',
  white: 'bg-white text-cb-blue hover:bg-blue-50 border border-transparent',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = ({ children, variant = 'primary', size = 'md', to, href, onClick, type = 'button', disabled = false, className = '' }) => {
  const base = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cb-blue focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return <Link to={to} className={base}>{children}</Link>
  if (href) return <a href={href} className={base}>{children}</a>
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}

export default Button
