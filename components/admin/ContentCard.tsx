export const ContentCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-lg border p-6 shadow-sm h-full">
    <h3 className="text-lg font-medium mb-4">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);