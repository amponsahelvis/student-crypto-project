const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-cb-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
)

export default Card
