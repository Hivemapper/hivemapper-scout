import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "@components/shadcn/Dialog";
import Close from "@components/icons/Close";
import * as cn from "./classNames";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  hideCloseButton?: boolean;
  children: any;
}

const Modal: React.FC<Props> = ({
  showModal,
  setShowModal,
  hideCloseButton = false,
  children,
}) => {
  return (
    <Dialog open={showModal}>
      <DialogContent>
        <div className={cn.modalWrapper()}>
          {!hideCloseButton && (
            <div
              onClick={() => {
                setShowModal(false);
              }}
              className={cn.modalCloseButton()}
            >
              <Close />
            </div>
          )}
          <div className={cn.modalSection()}>{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
