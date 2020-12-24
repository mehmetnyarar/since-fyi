import React, { useCallback, useContext, useState } from 'react'
import { EventManagerContext } from '~/hooks/event-manager'
import { Event } from '~/models'
import { EventTitle } from './title'

/**
 * &lt;EventCreate /> props.
 */
interface Props {
  onSuccess: (event: Partial<Event>) => void
}

/**
 * Allows user to create a new event.
 * @param props Props.
 * @returns &lt;EventCreate />.
 */
export const EventCreate: React.FC<Props> = props => {
  const { onSuccess } = props

  const { loading } = useContext(EventManagerContext)

  const [title, setTitle] = useState('')

  const handleAction = useCallback(async () => {
    setTitle('')
    onSuccess({ title })
  }, [title, onSuccess])

  const handleCancel = useCallback(() => setTitle(''), [])

  return (
    <EventTitle
      action='create'
      onAction={handleAction}
      onCancel={handleCancel}
      loading={loading}
      value={title}
      onChange={setTitle}
    />
  )
}
