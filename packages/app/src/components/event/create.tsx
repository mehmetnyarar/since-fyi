import React, { useCallback, useContext, useState } from 'react'
import { EventManagerContext, getEvent } from '~/hooks/event-manager'
import { Title } from './title'

/**
 * <EventCreate /> props.
 */
interface Props {
  onCreate: () => void
}

/**
 * Allows user to create a new event.
 * @param props Props.
 * @returns <EventCreate />.
 */
export const EventCreate: React.FC<Props> = ({ onCreate }) => {
  const { select, loading } = useContext(EventManagerContext)

  const [title, setTitle] = useState('')
  const handleChange = useCallback((value: string) => setTitle(value), [])
  const handleCancel = useCallback(() => setTitle(''), [])
  const handleAction = useCallback(async () => {
    const e = getEvent({ title })

    select(e)
    onCreate()
  }, [title, select, onCreate])

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
