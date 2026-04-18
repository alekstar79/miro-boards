import { Button } from "@/shared/ui/kit/button"
import { PlusIcon } from "lucide-react"
import { cn } from "@/shared/lib/css"

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  className?: string;
  disabled?: boolean;
}

export function TemplateCard({
  template,
  onSelect,
  className,
  disabled = false,
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border p-4 hover:border-primary transition-colors",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
      onClick={() => !disabled && onSelect(template)}
    >
      <div className="aspect-video rounded-md bg-gray-100 mb-4 overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium mb-1">{template.name}</h3>
      <p className="text-sm text-gray-500">{template.description}</p>
      <Button
        size="sm"
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        disabled={disabled}
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Использовать
      </Button>
    </div>
  )
}
