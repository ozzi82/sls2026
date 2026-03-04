interface PlaceholderImageProps {
  label: string;
  className?: string;
  aspectRatio?: string;
}

export default function PlaceholderImage({
  label,
  className = "",
  aspectRatio = "aspect-video",
}: PlaceholderImageProps) {
  return (
    <div
      className={`placeholder-image rounded-lg ${aspectRatio} ${className}`}
    >
      <span className="font-heading text-xs uppercase tracking-wider">[PLACEHOLDER: {label}]</span>
    </div>
  );
}
