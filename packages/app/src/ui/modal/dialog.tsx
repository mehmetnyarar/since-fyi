import React from 'react'
import { ModalProps } from 'react-native'
import { styled, useTheme } from '~/theme'
import { VBox } from '../box'
import { Pressable } from '../button'
import { Divider } from '../divider'
import { Heading } from '../typography'

const Modal = styled.Modal``

/**
 * &lt;Dialog /> props.
 */
export interface DialogProps extends ModalProps {
  title?: string
  confirmLabel?: string
  onConfirm?: () => void
  cancelLabel?: string
  onCancel: () => void
}

/**
 * Dialog.
 * @param props Props.
 * @returns &lt;Dialog />
 */
export const Dialog: React.FC<DialogProps> = props => {
  const {
    title,
    confirmLabel = '[Confirm]',
    onConfirm,
    cancelLabel = '[Cancel]',
    onCancel,
    children,
    ...modalProps
  } = props
  const { colors } = useTheme()

  return (
    <Modal
      {...modalProps}
      transparent
      animationType='none'
      accessibilityViewIsModal
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
        {onCancel && (
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
        )}
      </VBox>
    </Modal>
  )
}
