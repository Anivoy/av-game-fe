import { toast } from "sonner";
import Alert from "./Alert";


export interface AlertProps {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
}

export function toastAlert({
  variant,
  title,
  message,
  showLink,
  linkHref,
  linkText,
}: AlertProps) {
  toast.custom(() => (
    <Alert
      variant={variant}
      title={title}
      message={message}
      showLink={showLink}
      linkHref={linkHref}
      linkText={linkText}
      className="min-w-64"
    />
  ));
}
