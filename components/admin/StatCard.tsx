export const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ComponentType<{ className?: string }> }) => {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="rounded-full bg-yellow-50 p-3">
          <Icon className="h-6 w-6 text-yellow-600" />
        </div>
      </div>
    </div>
  )
}