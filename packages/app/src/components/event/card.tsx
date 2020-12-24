import { isFuture } from 'date-fns'
import isEqual from 'lodash/isEqual'
import truncate from 'lodash/truncate'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInterval } from '~/hooks'
import { Event } from '~/models'
import { useTheme } from '~/theme'
import {
  HBox,
  Heading,
  Icon,
  P,
  Pressable,
  Swipeable,
  SwipeableProps,
  VBox
} from '~/ui'
import { getTimeSpan, getTimeSpanFns, TimeSpan, TimeSpanUnit } from '~/utility'

/**
 * Update frequency.
 */
const UPDATE_FREQUENCY = 1000 * 5

interface Time {
  value: number
  unit: TimeSpanUnit
}

interface Status {
  message?: string
  times?: Time[]
}

const getTimes = (span: TimeSpan) => {
  const units = Object.keys(span) as TimeSpanUnit[]

  return units.reduce<Time[]>((result, unit) => {
    const value = span[unit]
    return value && result.length < 2 ? result.concat({ value, unit }) : result
  }, [])
}

const getStatus = (start?: Date, active?: boolean): Status => {
  if (!active) return { message: 'event.na.active' }
  if (!start) return { message: 'event.na.start' }

  const span1 = getTimeSpanFns(start)
  const span2 = getTimeSpan(start)
  console.debug({
    span1,
    span2,
    eq: isEqual(span1, span2)
  })

  return { times: getTimes(span1) }
}

const getFuture = (date?: Date) => {
  return date ? isFuture(date) : false
}

interface Props extends SwipeableProps {
  event: Event
  onEdit?: (event: Event) => void
  onReset?: (event: Event) => void
  onRemove?: (event: Event) => void
}

export const EventCard: React.FC<Props> = props => {
  const { event, onReset, onEdit, onRemove, ...swipeableProps } = props

  const { t } = useTranslation()
  const { colors } = useTheme()

  const { start, isActive } = event
  const [, setFuture] = useState(false)
  const [status, setStatus] = useState<Status>({})

  useEffect(() => {
    const futureValue = getFuture(start)
    setFuture(futureValue)

    const statusValue = getStatus(start, isActive)
    setStatus(statusValue)
  }, [start, isActive])

  useInterval(
    () => {
      const futureValue = getFuture(start)
      setFuture(futureValue)

      const statusValue = getStatus(start, isActive)
      setStatus(statusValue)
    },
    isActive ? UPDATE_FREQUENCY : undefined
  )

  const rightActions = useMemo(() => {
    const actions: ReactElement<SwipeableProps>[] = []

    if (onReset) {
      actions.push(
        <Pressable
          width={64}
          height={64}
          variant='warning'
          appearance='filled'
          borderTopLeftRadius={32}
          borderBottomLeftRadius={32}
          onPress={() => onReset(event)}
          accessibilityHint={t('reset.hint')}
          accessibilityLabel={t('reset')}
        >
          <Icon name='reload' size={32} color={colors.alt.text} />
        </Pressable>
      )
    }

    if (onEdit) {
      actions.push(
        <Pressable
          width={64}
          height={64}
          variant='info'
          appearance='filled'
          onPress={() => onEdit(event)}
          accessibilityHint={t('edit.hint')}
          accessibilityLabel={t('edit')}
        >
          <Icon name='pencil-outline' size={32} color={colors.alt.text} />
        </Pressable>
      )
    }

    if (onRemove) {
      actions.push(
        <Pressable
          width={64}
          height={64}
          variant='danger'
          appearance='filled'
          onPress={() => onRemove(event)}
          accessibilityHint={t('delete.hint')}
          accessibilityLabel={t('delete')}
        >
          <Icon name='trash-can-outline' size={32} color={colors.alt.text} />
        </Pressable>
      )
    }

    return actions.length ? actions : undefined
  }, [t, colors, event, onEdit, onReset, onRemove])

  const { message, times } = status
  console.debug('EventCard', { event })

  return (
    <Swipeable rightActions={rightActions} {...swipeableProps}>
      <VBox height={64} paddingHorizontal={16} justifyContent='center'>
        <HBox
          state={isActive ? 'default' : 'disabled'}
          variant={isActive ? 'success' : 'danger'}
          appearance='underlined'
          backgroundColor={colors.background}
          padding={8}
          borderRadius={4}
          borderBottomWidth={4}
          justifyContent='space-between'
        >
          <HBox flex={1}>
            <Heading level={3} nativeID='EventHeading'>
              {truncate(event.title, { length: 21, omission: '...' })}
            </Heading>
          </HBox>
          <HBox>
            {message && <P>{t(message)}</P>}
            {times && (
              <>
                {times.map((time, index) => (
                  <HBox key={index} marginLeft={8}>
                    <P fontSize={20}>{time.value}</P>
                    <P fontSize={16}>{t(`timespan.${time.unit}`)}</P>
                  </HBox>
                ))}
              </>
            )}
          </HBox>
        </HBox>
      </VBox>
    </Swipeable>
  )
}
