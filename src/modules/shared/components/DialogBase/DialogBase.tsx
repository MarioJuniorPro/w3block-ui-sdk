import { ReactNode } from 'react';
import { useLockBodyScroll } from 'react-use';

import classNames from 'classnames';

import { ModalBase } from '../ModalBase';
import { PixwayButton } from '../PixwayButton';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  confirmButtonText: string;
  cancelButtonText: string;
  classes?: {
    backdrop?: string;
    container?: string;
    cancelButton?: string;
    dialogCard?: string;
    confirmButton?: string;
    actionContainer?: string;
    closeButton?: string;
  };
  children: ReactNode;
  isConfirmButtonDisabled?: boolean;
  isCancelButtonDIsabled?: boolean;
}

export const DialogBase = ({
  isOpen,
  onCancel,
  onConfirm,
  classes = {},
  children,
  cancelButtonText,
  onClose,
  confirmButtonText,
  isCancelButtonDIsabled = false,
  isConfirmButtonDisabled = false,
}: Props) => {
  useLockBodyScroll(isOpen);
  return isOpen ? (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      classes={{
        dialogCard: classNames(
          'pw-bg-white pw-rounded-2xl pw-pl-8 pw-pr-[101px] pw-pt-10 pw-pb-12 pw-max-w-[656px] pw-w-full',
          classes.dialogCard ?? ''
        ),
        closeButton: classes.closeButton ?? '',
      }}
    >
      {children}
      <div
        className={classNames(
          'pw-flex pw-justify-end pw-gap-x-15',
          classes.actionContainer ?? ''
        )}
      >
        <PixwayButton
          type="button"
          variant="outlined"
          className={classNames(
            '!pw-text-[14px] pw-leading-4 pw-max-w-[200px]',
            classes.cancelButton ?? ''
          )}
          onClick={onCancel}
          fullWidth
          disabled={isCancelButtonDIsabled}
        >
          {cancelButtonText}
        </PixwayButton>
        <PixwayButton
          type="button"
          className={classNames(
            '!pw-text-[14px] pw-leading-4 pw-max-w-[200px] !pw-bg-[#5682C3]',
            classes.confirmButton ?? ''
          )}
          onClick={onConfirm}
          fullWidth
          disabled={isConfirmButtonDisabled}
        >
          {confirmButtonText}
        </PixwayButton>
      </div>
    </ModalBase>
  ) : null;
};
