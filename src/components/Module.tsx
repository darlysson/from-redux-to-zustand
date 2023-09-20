import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { play } from '../store/slices/player';
import Lesson from './Lesson';

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export function Module({ amountOfLessons, moduleIndex, title }: ModuleProps) {
  const dispatch = useAppDispatch()
  const lessons = useAppSelector(state => state.player.course?.modules[moduleIndex].lessons)

  const { currentLessonIndex, currentModuleIndex } = useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    return { currentLessonIndex, currentModuleIndex }
  })

  return (
    <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <span className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
          {moduleIndex + 1}
        </span>

        <div className="flex flex-col gap-1 text-left">
          <strong className='text-sm'>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className='h-5 w-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform' />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons && lessons.map(({ id, duration, title }, lessonIndex) => {
            const isActive = lessonIndex === currentLessonIndex && moduleIndex === currentModuleIndex

            return (
              <Lesson
                key={id}
                title={title}
                duration={duration}
                isActive={isActive}
                onPlay={() => dispatch(play({ moduleIndex, lessonIndex }))}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
