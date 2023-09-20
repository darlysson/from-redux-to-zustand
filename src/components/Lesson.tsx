import { PlayCircle, Video } from 'lucide-react'

interface LessonProps {
  title: string
  duration: string
  isActive?: boolean
  onPlay: () => void
}

export default function Lesson({ title, duration, onPlay, isActive = false }: LessonProps) {
  return (
    <button
      data-active={isActive}
      onClick={onPlay}
      className="flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-100 data-[active=true]:text-purple-400"
    >
      {isActive ? (
        <PlayCircle className='h-4 w-4 text-purple-400' />
      ) : (
        <Video className='h-4 w-4 text-zinc-500' />
      )}

      <span>{title}</span>
      <span className='ml-auto font-mono text-xs text-zinc-500'>{duration}</span>
    </button>
  )
}
