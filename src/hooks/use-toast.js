import { useEffect, useState } from "react";

/* ---------------- CONFIG ---------------- */

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 4000;

/* ---------------- STATE ---------------- */

let toastId = 0;
let listeners = [];
let memoryState = { toasts: [] };

const genId = () => (++toastId).toString();

/* ---------------- REDUCER ---------------- */

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };

        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t
                ),
            };

        case "DISMISS_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    action.toastId && t.id !== action.toastId
                        ? t
                        : { ...t, open: false }
                ),
            };

        case "REMOVE_TOAST":
            return {
                ...state,
                toasts: action.toastId
                    ? state.toasts.filter((t) => t.id !== action.toastId)
                    : [],
            };

        default:
            return state;
    }
}

/* ---------------- DISPATCH ---------------- */

function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((l) => l(memoryState));
}

/* ---------------- TOAST API ---------------- */

function toast(props) {
    const id = genId();

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
        },
    });

    setTimeout(() => {
        dispatch({ type: "REMOVE_TOAST", toastId: id });
    }, TOAST_REMOVE_DELAY);

    return {
        id,
        dismiss: () => dispatch({ type: "REMOVE_TOAST", toastId: id }),
        update: (data) =>
            dispatch({ type: "UPDATE_TOAST", toast: { ...data, id } }),
    };
}

/* ---------------- HOOK ---------------- */

export function useToast() {
    const [state, setState] = useState(memoryState);

    useEffect(() => {
        listeners.push(setState);
        return () => {
            listeners = listeners.filter((l) => l !== setState);
        };
    }, []);

    return {
        toasts: state.toasts,
        toast,
        dismiss: (id) => dispatch({ type: "REMOVE_TOAST", toastId: id }),
    };
}

export { toast };
