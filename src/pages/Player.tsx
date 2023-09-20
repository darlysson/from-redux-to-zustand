import { MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Module } from '../components/Module'
import { Video as VideoPlayer } from '../components/Video'
import { useAppDispatch, useAppSelector } from '../store'
import { loadCourse, useVideo } from '../store/slices/player'

export function Player() {
  const dispatch = useAppDispatch()
  const modules = useAppSelector(state => state.player.course?.modules)
  const { currentLesson } = useVideo()

  useEffect(() => {
    document.title = `You're watching: ${currentLesson?.title}`
  }, [currentLesson])

  useEffect(() => {
    dispatch(loadCourse())
  }, [dispatch])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1110px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className='flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600'>
            <MessageCircle className='h-4 w-4' />
            Deixar feedback
          </button>
        </div>

        <main className='relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80'>
          <div className="flex-1">
            <VideoPlayer />
          </div>

          <aside className="absolute top-0 right-0 bottom-0 w-80 divide-y-2 divide-zinc-900 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll">
            {modules && modules.map(({ id, title, lessons }, index) => {
              return (
                <Module
                  key={id}
                  moduleIndex={index}
                  title={title}
                  amountOfLessons={lessons.length}
                />
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  )
}
