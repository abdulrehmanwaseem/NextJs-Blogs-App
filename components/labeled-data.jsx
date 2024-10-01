import { Badge } from "./ui/badge";

export const LabeledData = ({ label, value, isBadge }) => (
  <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
    <p className="text-sm font-medium">{label}</p>
    {isBadge ? (
      <Badge>{value}</Badge>
    ) : (
      <p className="truncate text-xs max-w-[180px] font-mono">{value}</p>
    )}
  </div>
);
