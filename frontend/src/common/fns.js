import toast from "react-hot-toast";
import {toastStyle} from "./variables";

export function toastDecorated(msg){
    toast(msg, toastStyle);
}

export function toastDecoratedPromise(handler, messageObject){
    return toast.promise(handler, messageObject, toastStyle);
}