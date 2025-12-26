import { HeroBackground } from "@/components/common/HeroBackground";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";
import { useChangePassword } from "@/hooks/useAuthApi";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const [visible, setVisible] = useState<{
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    newPassword: false,
    confirmPassword: false,
  });

  const { mutateAsync, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    await mutateAsync(data);
  };

  const handleVisible = (key: "newPassword" | "confirmPassword") => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative responsive-container min-h-screen overflow-x-hidden overflow-y-auto">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <HeroBackground
          leftImage="/images/background/a-jumbotron.png"
          rightImage="/images/background/b-jumbotron.webp"
        />
      </motion.div>

      <div className="relative z-40 flex min-h-screen w-full items-center justify-center py-4">
        <Card
          as="form"
          noPadding
          parentClassName="w-full max-w-sm"
          className="px-6 py-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row justify-center">
            <h2 className="font-heading font-semibold text-2xl">
              Change Password
            </h2>
          </div>

          <Field
            label={
              <>
                New Password<span className="text-primary"> *</span>
              </>
            }
            error={!!errors.newPassword}
            hint={errors.newPassword?.message || ""}
          >
            <InputGroup
              end={
                <button
                  type="button"
                  onClick={() => handleVisible("newPassword")}
                  className="text-white/40 hover:text-white transition"
                >
                  {visible.newPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              }
            >
              <Input
                id="newPassword"
                {...register("newPassword")}
                type={visible.newPassword ? "text" : "password"}
                required
                disabled={isPending}
                placeholder="Enter your new password"
              />
            </InputGroup>
          </Field>

          <Field
            label={
              <>
                Confirm Password<span className="text-primary"> *</span>
              </>
            }
            error={!!errors.confirmPassword}
            hint={errors.confirmPassword?.message || ""}
          >
            <InputGroup
              end={
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => handleVisible("confirmPassword")}
                  className="text-white/40 hover:text-white transition cursor-pointer"
                >
                  {visible.confirmPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              }
            >
              <Input
                type={visible.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                required
                disabled={isPending}
                placeholder="Confirm your password"
              />
            </InputGroup>
          </Field>

          <div className="pt-2">
            <Button
              size="md"
              color="primary"
              type="submit"
              loading={isPending}
              fullWidth
            >
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
