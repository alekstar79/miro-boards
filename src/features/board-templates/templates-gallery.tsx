import { cn } from '@/shared/lib/css'
import { TemplateCard, type Template } from './template-card'
import { useTemplatesModal } from './use-templates-modal'
import { useCreateBoard } from './use-create-board'

interface TemplatesGalleryProps {
  className?: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Пустая доска',
    description: 'Начните с чистого листа',
    thumbnail: 'https://placehold.co/150',
  },
  {
    id: '2',
    name: 'Шаблон для совещаний',
    description: 'Повестка, заметки и задачи встречи',
    thumbnail: 'https://placehold.co/150',
  },
  {
    id: '3',
    name: 'Диаграмма Ганта',
    description: 'Планирование проектов и сроков',
    thumbnail: 'https://placehold.co/150',
  },
  {
    id: '4',
    name: 'Карта пользовательского пути',
    description: 'Визуализация опыта пользователя',
    thumbnail: 'https://placehold.co/150',
  }
]

export function TemplatesGallery({ className }: TemplatesGalleryProps) {
  const { close } = useTemplatesModal()
  const { createBoard, isPending } = useCreateBoard()

  const handleSelect = (_template: Template) => {
    createBoard()
    close()
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-xl font-semibold">Шаблоны</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleSelect}
            disabled={isPending}
          />
        ))}
      </div>
    </div>
  )
}
