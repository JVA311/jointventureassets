export const RequestItem = ({ name, id, status }: { name: string; id: string; status: 'pending' | 'approved' | 'rejected' }) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">Request #{id}</p>
      </div>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};