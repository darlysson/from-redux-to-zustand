import { Loader } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector } from '../store'
import { next, useVideo } from '../store/slices/player'

export function Video() {
  const dispatch = useAppDispatch()
  const { currentLesson } = useVideo()
  const isLoading = useAppSelector(state => state.player.isLoading)

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className='w-11 h-11 text-zinc-400 animate-spin' />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={() => dispatch(next())}
        />
      )}
    </div>
  )
}
