import { HeroBackground } from "@/components/common/HeroBackground";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";
import { useResetPassword } from "@/hooks/useAuthApi";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function ResetPassword() {
  const { mutateAsync, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    await mutateAsync(data);
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
              Forgot Password
            </h2>
          </div>

          <Field
            label={
              <>
                Email Address<span className="text-primary"> *</span>
              </>
            }
            error={!!errors.email}
            hint={errors.email?.message || ""}
          >
            <InputGroup>
              <Input
                type="email"
                id="email"
                {...register("email")}
                required
                disabled={isPending}
                placeholder="Enter your email address"
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
              Request Password Reset
            </Button>
            <p className="text-sm text-white/80 mt-4 text-center">
              Or{" "}
              <Link
                to="/signin"
                className="mt-2 underline cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                Go Back
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
