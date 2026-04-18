import { TemplateCard } from './template-card'

const templates = [
  {
    id: '1',
    name: 'Пустая доска',
    thumbnail: 'https://placehold.co/150',
  },
  {
    id: '2',
    name: 'Шаблон для совещаний',
    thumbnail: 'https://placehold.co/150',
  },
  {
    id: '3',
    name: 'Диаграмма Ганта',
    thumbnail: 'https://placehold.co/150',
  },
  {
    id: '4',
    name: 'Карта пользовательского пути',
    thumbnail: 'https://placehold.co/150',
  }
]

export function TemplatesGallery() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-semibold'>Шаблоны</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}
