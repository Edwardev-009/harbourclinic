export const fieldClass =
  "mt-2 block w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring aria-[invalid=true]:border-destructive";

export function Field({
  label, name, error, type = "text", autoComplete, className,
}: { label: string; name: string; error?: string | undefined; type?: string; autoComplete?: string; className?: string | undefined }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className={fieldClass}
      />
      {error && <p id={`${name}-err`} className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export const PHONE_RE = /^[+\d][\d\s-]{6,}$/;
export const EMAIL_RE = /^\S+@\S+\.\S+$/;
