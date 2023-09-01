import { Input } from "@/components/MaterialComponents/Material-Tailwind";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function SearchBar() {
  return (
    <div className="w-72">
      <Input
        color="amber"
        placeholder="Search..."
        icon={<MagnifyingGlassIcon />}
        className="rounded-full"
      />
    </div>
  );
}
