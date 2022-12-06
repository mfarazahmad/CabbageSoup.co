import { MouseEventHandler } from "react";

export type PopupAlert = {
    show: boolean,
    type: "success" | "error" | "info" | "warning" | undefined,
    message: string,
    description: string
}

export type PopupAlertHandler = {
    show: boolean,
    type: "success" | "error" | "info" | "warning" | undefined,
    message: string,
    description: string,
    closeAlert: () => void
}