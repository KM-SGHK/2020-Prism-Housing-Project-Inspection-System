import { IImagePreviewState } from "./states";


export function imagePreviewSwitch(status: boolean) {
    return {
        type: "@@imagePreview/PREVIEW_SWITCH" as "@@imagePreview/PREVIEW_SWITCH",
        status
    }
}

type ImagePreviewActionCreators = typeof imagePreviewSwitch

export type IImagePreviewActions = ReturnType<ImagePreviewActionCreators>