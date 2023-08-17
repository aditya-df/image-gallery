import Swal from "sweetalert2";

export const ToastSuccess = Swal.mixin({
  toast: true,
  position: "bottom-right",
  showConfirmButton: false,
  timer: 3250,
  timerProgressBar: true,
});

export const ToastFailed = Swal.mixin({
  toast: true,
  position: "bottom-right",
  showConfirmButton: false,
  timer: 3250,
  timerProgressBar: true,
});
