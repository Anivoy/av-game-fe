import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";

import { HeroBackground } from "@/components/common/HeroBackground";
import { toastAlert } from "@/components/ui/alert/ToastAlert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";

import { useSignIn } from "@/hooks/useAuthApi";
import { signInSchema, type SignInFormData } from "@/schemas/authSchema";
import { useAuthStore } from "@/stores/auth.store";

export default function SignIn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const logoutReason = useAuthStore((s) => s.logoutReason);
  const setLogoutReason = useAuthStore((s) => s.setLogoutReason);

  const { mutateAsync, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (logoutReason === "MANUAL") {
      toastAlert({
        variant: "success",
        title: "Sign Out Success",
        message: "You've been signed out successfully.",
      });
    } else if (logoutReason === "UNAUTHORIZED") {
      toastAlert({
        variant: "error",
        title: "UNAUTHORIZED",
        message: "Session expired, please sign in again.",
      });
    }

    if (logoutReason) setLogoutReason(null);
  }, [logoutReason]);

  useEffect(() => {
    const keysToClear = ["utm_source", "ref", "token", "email"];
    const newParams = new URLSearchParams(searchParams);
    let changed = false;

    for (const key of keysToClear) {
      if (newParams.has(key)) {
        newParams.delete(key);
        changed = true;
      }
    }

    if (changed) {
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams]);

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
            <h2 className="font-heading font-semibold text-2xl">Sign In</h2>
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

          <div>
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
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/40 hover:text-white transition cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                }
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  required
                  disabled={isPending}
                  placeholder="Enter your password"
                />
              </InputGroup>
            </Field>
            <div className="w-full flex justify-end mt-2">
              <Link
                to="/reset-password"
                className="text-end text-sm underline cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Button
              size="md"
              color="primary"
              type="submit"
              loading={isPending}
              fullWidth
            >
              Sign In
            </Button>
            <p className="text-sm text-white/80 mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="mt-2 underline cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                Sign Up
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
