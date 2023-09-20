import { describe, expect, it } from 'vitest'
import { next, play, playerSlice, player as reducer } from './player'

describe('player slice', () => {
  it('should be able to play', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(
      initialState,
      play({ lessonIndex: 1, moduleIndex: 2 })
    )

    expect(state.currentLessonIndex).toEqual(1)
    expect(state.currentModuleIndex).toEqual(2)
  })

  it('should be able to play video automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next video automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
