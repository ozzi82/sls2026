interface SpecsTableProps {
  specs: { label: string; value: string }[];
  modelNumber?: string;
}

export default function SpecsTable({ specs, modelNumber }: SpecsTableProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      {modelNumber && (
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <span className="inline-flex items-center bg-brand-gold/10 border border-brand-gold/30 rounded-full px-3 py-1">
            <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
              EdgeLuxe {modelNumber}
            </span>
          </span>
        </div>
      )}
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={`flex justify-between items-start px-6 py-4 ${
            index < specs.length - 1 ? "border-b border-white/5" : ""
          }`}
        >
          <span className="text-sm text-text-light/50 font-heading">
            {spec.label}
          </span>
          <span className="text-sm text-text-light font-medium text-right ml-4">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}
