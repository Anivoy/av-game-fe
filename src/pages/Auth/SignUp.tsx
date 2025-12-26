import { useState } from "react";
import { Link } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { HeroBackground } from "@/components/common/HeroBackground";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";

import { signUpSchema, type SignUpFormData } from "@/schemas/authSchema";
import { useSignUp } from "@/hooks/useAuthApi";

export default function SignUp() {
  const [visible, setVisible] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const handleVisible = (key: "password" | "confirmPassword") => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { mutateAsync, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    await mutateAsync(data);
  };

  return (
    <section className="relative responsive-container min-h-screen w-full overflow-x-hidden overflow-y-auto">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <HeroBackground
          leftImage="/images/background/a-jumbotron.png"
          rightImage="/images/background/b-jumbotron.webp"
        />
      </motion.div>

      {/* Foreground */}
      <div className="relative z-40 flex min-h-screen w-full items-center justify-center py-4">
        <Card
          as="form"
          noPadding
          parentClassName="w-full max-w-sm"
          className="px-6 py-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row justify-center">
            <h2 className="font-heading font-semibold text-2xl">Sing Up</h2>
          </div>

          <Field
            label={
              <>
                Display Name<span className="text-primary"> *</span>
              </>
            }
            error={!!errors.displayName}
            hint={errors.displayName?.message || ""}
          >
            <InputGroup className="w-full">
              <Input
                type="text"
                id="displayName"
                {...register("displayName")}
                required
                disabled={isPending}
                placeholder="Enter your display name"
              />
            </InputGroup>
          </Field>

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

          <Field
            label={
              <>
                Password<span className="text-primary"> *</span>
              </>
            }
            error={!!errors.password}
            hint={errors.password?.message || ""}
          >
            <InputGroup
              end={
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => handleVisible("password")}
                  className="text-white/40 hover:text-white transition cursor-pointer"
                >
                  {visible.password ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              }
            >
              <Input
                type={visible.password ? "text" : "password"}
                id="password"
                {...register("password")}
                required
                disabled={isPending}
                placeholder="Enter your password"
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

          <div className="pt-4">
            <Button
              size="md"
              color="primary"
              type="submit"
              loading={isPending}
              fullWidth
            >
              Sign Up
            </Button>
            <p className="text-sm text-white/80 mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="mt-2 underline cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </p>
            <p className="text-sm text-white/80 mt-2 text-center">
              Or{" "}
              <Link
                to="/"
                className="mt-2 underline cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                Go Home
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
