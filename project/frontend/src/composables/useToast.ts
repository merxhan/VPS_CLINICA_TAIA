import { reactive, readonly } from 'vue';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error';
}

const state = reactive<ToastState>({
  isVisible: false,
  message: '',
  type: 'success',
});

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function show(message: string, type: 'success' | 'error' = 'success', durationMs = 3500): void {
  if (hideTimeout) clearTimeout(hideTimeout);
  state.message = message;
  state.type = type;
  state.isVisible = true;
  hideTimeout = setTimeout(() => {
    state.isVisible = false;
  }, durationMs);
}

function hide(): void {
  if (hideTimeout) clearTimeout(hideTimeout);
  state.isVisible = false;
}

export function useToast() {
  return {
    state: readonly(state),
    show,
    hide,
  };
}
