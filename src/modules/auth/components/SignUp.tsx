import { toast } from "sonner";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, UserPen } from "lucide-react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

import { SignupFormData, signupSchema } from "../AuthSchima";
import { signUp } from "@/lib/auth-client";

export function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignupSubmit = async (data: SignupFormData) => {
    const res = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (res.data?.user.id) {
      toast.success("Signup successful");
      router.push("/");
    } else if (res.error) {
      toast.error(res.error.message);
    }
  };

  return (
    <TabsContent value="signup">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-center text-foreground">
          Create Account
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Fill in your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={signupForm.handleSubmit(onSignupSubmit)}
          className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              name
            </Label>
            <div className="relative">
              <UserPen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="name"
                className="pl-10 bg-background border-muted focus:border-primary"
                {...signupForm.register("name")}
              />
            </div>
            {signupForm.formState.errors.name && (
              <p className="text-sm text-destructive">
                {signupForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="signup-email"
              className="text-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-email"
                type="email"
                placeholder="john.doe@example.com"
                className="pl-10 bg-background border-muted focus:border-primary"
                {...signupForm.register("email")}
              />
            </div>
            {signupForm.formState.errors.email && (
              <p className="text-sm text-destructive">
                {signupForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="signup-password"
              className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="pl-10 pr-10 bg-background border-muted focus:border-primary"
                {...signupForm.register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {signupForm.formState.errors.password && (
              <p className="text-sm text-destructive">
                {signupForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-foreground font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10 pr-10 bg-background border-muted focus:border-primary"
                {...signupForm.register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {signupForm.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {signupForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-primary-foreground font-medium py-2.5"
            disabled={signupForm.formState.isSubmitting}>
            {signupForm.formState.isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </TabsContent>
  );
}
