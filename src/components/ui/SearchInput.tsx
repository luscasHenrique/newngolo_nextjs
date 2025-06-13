import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xs">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </span>
      <Input
        type="text"
        placeholder="Buscar por..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
            pl-10 pr-3 py-2
            border border-gray-300  
            rounded-xl
            shadow-sm
            focus:border-gray-400
            focus:ring-1 focus:ring-gray-300
            outline-none
            transition-all duration-200
            bg-white
            placeholder:text-gray-400
        "
      />
    </div>
  );
}
