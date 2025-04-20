import  { ReactNode } from 'react'
interface InfoCardProps {
  title: string
  value: string
  icon: ReactNode
  gradient: string
}
export function InfoCard({ title, value, icon, gradient }: InfoCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-lg shadow-md p-6 text-white transform transition-all duration-200 hover:scale-105`}
    >
      <div className="flex items-center mb-3">
        <div className="text-white/90">{icon}</div>
        <h3 className="text-lg font-semibold text-white/90 ml-2">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
