import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { useEventForm } from '~/hooks/event-form'
import { getSchedule } from '~/hooks/event-manager'
import { styled, useTheme } from '~/theme'
import {
  DateTimeInput,
  Divider,
  HBox,
  Label,
  PickerInput,
  Pressable,
  Switch,
  TextInput,
  VBox
} from '~/ui'
import { ArrayUtils, getTime, setTime } from '~/utility'
import { Title } from './title'

export const Container = styled.ScrollView``

/**
 * <EventUpdate /> props.
 */
interface Props {
  onFinish: () => void | Promise<void>
}

/**
 * Allows user to update an existing event.
 * @param props Props.
 * @returns <EventUpdate />.
 */
export const EventUpdate: React.FC<Props> = ({ onFinish }) => {
  const { colors } = useTheme()

  const {
    TypedController,
    values,
    onSubmit,
    loading,
    presetOptions,
    handlePresetChange,
    frequencyOptions,
    isAtVisible,
    isOnVisible,
    onOptions
  } = useEventForm({
    onSuccess: onFinish
  })

  const { active, notification } = values

  return (
    <Container>
      <TypedController
        name='title'
        render={({ value, onChange }) => {
          return (
            <Title
              action='update'
              onAction={onSubmit}
              onCancel={onFinish}
              loading={loading}
              value={value}
              onChange={onChange}
            />
          )
        }}
      />
      <TypedController
        name='active'
        render={({ value, onChange }) => (
          <HBox
            padding={16}
            backgroundColor={colors.card}
            justifyContent='space-between'
          >
            <Label>Active</Label>
            <Switch
              value={value}
              onValueChange={onChange}
              accessible
              accessibilityRole='switch'
              accessibilityLabel='Pause or activate event'
            />
          </HBox>
        )}
      />
      <Divider />
      <VBox hidden={!active} testID='event-settings'>
        <TypedController
          name='start'
          defaultValue={new Date()}
          render={({ value, onChange }) => (
            <HBox
              padding={16}
              backgroundColor={colors.card}
              justifyContent='space-between'
            >
              <Label>Date</Label>
              <DateTimeInput
                mode='datetime'
                value={value}
                onChange={onChange}
                accessibilityLabel='Change the start date'
                dialogProps={{ title: 'Start Date' }}
              />
            </HBox>
          )}
        />
        <Divider />
        <TypedController
          name={['notification', 'active']}
          render={({ value, onChange }) => {
            return (
              <HBox
                padding={16}
                backgroundColor={colors.card}
                justifyContent='space-between'
              >
                <Label>Remind me</Label>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  accessible
                  accessibilityRole='switch'
                  accessibilityLabel='Enable or disable notifications'
                />
              </HBox>
            )
          }}
        />
        <Divider />
        <VBox hidden={!notification.active} testID='notification-settings'>
          <HBox
            padding={16}
            backgroundColor={colors.card}
            justifyContent='space-between'
          >
            <Label>Every</Label>
            <VBox>
              <TypedController
                name={['notification', 'preset']}
                render={({ value, onChange }) => (
                  <PickerInput
                    options={presetOptions}
                    value={value}
                    onChange={preset => {
                      onChange(preset)
                      handlePresetChange(String(preset))
                    }}
                    accessibilityLabel='Preset for notification frequency'
                  />
                )}
              />
              <HBox marginTop={16} hidden>
                <TypedController
                  name={['notification', 'every']}
                  render={({ value, onChange }) => (
                    <TextInput
                      variant='basic'
                      width={96}
                      height={48}
                      textAlign='right'
                      value={String(value)}
                      onChangeText={onChange}
                      placeholder='Nth'
                      placeholderTextColor={colors.hint}
                      keyboardType='number-pad'
                      accessible
                      accessibilityLabel='Notification every'
                    />
                  )}
                />
                <TypedController
                  name={['notification', 'frequency']}
                  render={({ value, onChange }) => (
                    <PickerInput
                      width={96}
                      height={48}
                      marginLeft={8}
                      paddingHorizontal={8}
                      options={frequencyOptions}
                      value={value}
                      onChange={onChange}
                      accessibilityLabel='Notification frequency'
                    />
                  )}
                />
              </HBox>
            </VBox>
          </HBox>
          <Divider />
          <VBox hidden={!isAtVisible} testID='schedule-settings'>
            <TypedController
              name={['notification', 'at']}
              render={({ value: schedules, onChange }) => {
                return (
                  <VBox padding={16} backgroundColor={colors.card}>
                    <HBox justifyContent='space-between'>
                      <Label>At</Label>
                      <Pressable
                        variant='basic'
                        appearance='transparent'
                        onPress={() => {
                          onChange(
                            schedules.concat(
                              getSchedule(notification.frequency)
                            )
                          )
                        }}
                        accessibilityLabel='Add new schedule'
                      >
                        <MaterialCommunityIcons
                          name='plus'
                          size={24}
                          color={colors.text}
                        />
                      </Pressable>
                    </HBox>
                    {schedules.map((schedule, index) => {
                      return (
                        <HBox key={index} justifyContent='space-between'>
                          {isOnVisible && (
                            <PickerInput
                              width={96}
                              options={onOptions}
                              value={schedule.on}
                              onChange={value =>
                                onChange(
                                  ArrayUtils.replace(
                                    schedules,
                                    index,
                                    Object.assign({}, schedule, {
                                      on: value
                                    })
                                  )
                                )}
                              accessibilityLabel='Schedule on'
                            />
                          )}
                          <DateTimeInput
                            alignSelf='flex-end'
                            mode='time'
                            value={setTime(schedule.time)}
                            onChange={date => {
                              onChange(
                                ArrayUtils.replace(
                                  schedules,
                                  index,
                                  Object.assign({}, schedule, {
                                    time: getTime(date)
                                  })
                                )
                              )
                            }}
                            accessibilityLabel='Schedule at'
                            dialogProps={{ title: 'Schedule At' }}
                          />
                        </HBox>
                      )
                    })}
                  </VBox>
                )
              }}
            />
          </VBox>
        </VBox>
      </VBox>
    </Container>
  )
}
