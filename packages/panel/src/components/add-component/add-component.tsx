import React, { useEffect, useRef, useState } from "react";
import { PropsEditor, getDefaultProps } from "../props-editor";
import {
  RemoteComponent,
  loadComponent,
  Props as RemoteComponentProps,
} from "../remote-component";
import styles from "./add-component.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (remoteComponentProps: RemoteComponentProps<any>) => void;
}

export function AddComponent(props: Props) {
  const { open, onClose, onCreated } = props;
  const dialogElement = useRef<HTMLDialogElement>(null);

  const [remoteComponentData, setRemoteComponentData] = useState(
    getDefaultProps(RemoteComponent.propTypes)
  );

  const toggle = () => {
    if (!dialogElement.current) return;

    const isOpenNow = dialogElement.current.open;

    if (open && !isOpenNow) {
      dialogElement.current.showModal();
    }

    if (!open) {
      dialogElement.current.close();
    }
  };

  const doneHandler = async () => {
    const Component = await loadComponent(remoteComponentData);
    const componentProps = getDefaultProps(Component.propTypes);

    onCreated({ ...remoteComponentData, componentProps });
    onClose();
  };

  useEffect(() => {
    toggle();
  }, [toggle]);

  return (
    <dialog ref={dialogElement} className={styles.dialog}>
      <button className={styles.close} onClick={onClose} type="button">
        x
      </button>
      <h2>Add component</h2>
      <PropsEditor
        Component={RemoteComponent}
        componentProps={remoteComponentData}
        omit={["componentProps"]}
        onChange={setRemoteComponentData}
      />
      <button type="button" onClick={doneHandler}>
        Done
      </button>
    </dialog>
  );
}
