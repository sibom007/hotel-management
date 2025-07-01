import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

import { signIn } from "@/lib/auth-client";

import SocialLogin from "./SocialLogin";
import { LoginFormData, loginSchema } from "../AuthSchima";

export function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const res = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.data?.user.id) {
        toast.success("Login successful");
        router.push("/");
        loginForm.reset();
      } else if (res.error) {
        toast.error(res.error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <TabsContent value="login">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-center text-foreground">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="login-email"
              className="text-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-background border-muted focus:border-primary"
                {...loginForm.register("email")}
              />
            </div>
            {loginForm.formState.errors.email && (
              <p className="text-sm text-destructive">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="login-password"
              className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-background border-muted focus:border-primary"
                {...loginForm.register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-sm text-destructive">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="link"
              className="px-0 text-primary hover:text-secondary">
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-primary-foreground font-medium py-2.5"
            disabled={loginForm.formState.isSubmitting}>
            {loginForm.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <SocialLogin />
      </CardContent>
    </TabsContent>
  );
}
