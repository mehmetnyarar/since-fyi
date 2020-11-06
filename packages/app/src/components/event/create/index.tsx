import { nanoid } from 'nanoid/async/index.native'
import React, { useCallback, useContext, useState } from 'react'
import { EventManagerContext, getEvent } from '~/hooks/event-manager'
import { Title } from '../title'

/**
 * <EventCreate /> props.
 */
interface Props {
  onCreate: (id: string) => void | Promise<void>
}

/**
 * Allows user to create a new event.
 * @param props Props.
 * @returns <EventCreate />.
 */
export const EventCreate: React.FC<Props> = ({ onCreate }) => {
  const { create, loading } = useContext(EventManagerContext)

  const [title, setTitle] = useState('')
  const handleChange = useCallback((value: string) => setTitle(value), [])
  const handleCancel = useCallback(() => setTitle(''), [])
  const handleAction = useCallback(async () => {
    const id = await nanoid(6)
    const event = getEvent({ id, title })
    console.debug('EventCreate/handleAction', { event })

    await create(event)
    onCreate(id)
  }, [title, create, onCreate])

  return (
    <Title
      action='create'
      onAction={handleAction}
      onCancel={handleCancel}
      loading={loading}
      value={title}
      onChange={handleChange}
    />
  )
}
