import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { EventManagerContext } from '~/hooks/event-manager'
import { Event } from '~/models'
import { Loading, ScrollBox, SwipeableList } from '~/ui'
import { EventCard } from './card'

interface Props {}

export const EventList: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { result, loading, update, remove } = useContext(EventManagerContext)

  const handleEdit = useCallback(
    (event: Event) => {
      return navigate('Event', { id: event.id })
    },
    [navigate]
  )

  const handleReset = useCallback(
    (event: Event) => {
      return update(
        Object.assign({}, event, {
          start: new Date(),
          isActive: true
        })
      )
    },
    [update]
  )

  const handleRemove = useCallback(
    (event: Event) => {
      return event.id ? remove(event.id) : undefined
    },
    [remove]
  )

  if (!result) return null
  if (loading) return <Loading />

  return (
    <ScrollBox flex={1}>
      <SwipeableList accessible accessibilityLabel={t('events')}>
        {result.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            onEdit={handleEdit}
            onReset={handleReset}
            onRemove={handleRemove}
          />
        ))}
      </SwipeableList>
    </ScrollBox>
  )
}
