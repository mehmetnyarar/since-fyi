import React, { ReactElement } from 'react'
import { ModalProps } from 'react-native'
import { styled, useTheme } from '~/theme'
import { VBox } from '../box'
import { Pressable } from '../button'
import { Divider } from '../divider'
import { Heading } from '../typography'

const Container = styled.Modal``

/**
 * <Dialog /> props.
 */
export interface DialogProps extends ModalProps {
  title?: string
  trigger?: ReactElement
  confirmLabel?: string
  onConfirm?: () => void
  cancelLabel?: string
  onCancel: () => void
}

/**
 * Dialog.
 * @param props Props.
 * @returns <Dialog />
 */
export const Dialog: React.FC<DialogProps> = props => {
  const {
    trigger,
    title,
    confirmLabel = 'Confirm',
    onConfirm,
    cancelLabel = 'Cancel',
    onCancel,
    children,
    ...modalProps
  } = props
  const { colors } = useTheme()

  return (
    <>
      {trigger}
      <Container
        {...modalProps}
        transparent
        animationType='none'
        accessible
        accessibilityViewIsModal
        accessibilityLabel={title}
      >
        <VBox
          flex={1}
          justifyContent='flex-end'
          backgroundColor={colors.backdrop}
        >
          <VBox
            marginHorizontal={16}
            marginBottom={8}
            borderRadius={8}
            borderColor={colors.border}
            backgroundColor={colors.card}
          >
            {title && (
              <>
                <Heading level={2} textAlign='center' marginVertical={16}>
                  {title}
                </Heading>
                <Divider />
              </>
            )}
            {children}
            {onConfirm && (
              <>
                <Divider />
                <Pressable
                  text={confirmLabel}
                  variant='basic'
                  appearance='transparent'
                  borderRadius={0}
                  borderBottomLeftRadius={8}
                  borderBottomRightRadius={8}
                  onPress={onConfirm}
                  accessible
                  accessibilityRole='button'
                  accessibilityLabel={confirmLabel}
                />
              </>
            )}
          </VBox>
          <VBox
            marginTop={4}
            marginBottom={30}
            marginHorizontal={16}
            borderRadius={8}
            borderColor={colors.border}
            backgroundColor={colors.background}
          >
            <Pressable
              text={cancelLabel}
              variant='basic'
              appearance='transparent'
              borderRadius={8}
              onPress={onCancel}
              accessible
              accessibilityRole='button'
              accessibilityLabel={cancelLabel}
            />
          </VBox>
        </VBox>
      </Container>
    </>
  )
}
