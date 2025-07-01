"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";

export default function AuthView() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome</h1>
          <p className="text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-card backdrop-blur-sm p-4">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as "login" | "signup")}
            defaultValue="login"
            className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2 bg-muted">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="sync">
              {tab === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}>
                  <SignIn />
                </motion.div>
              )}

              {tab === "signup" && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}>
                  <SignUp />
                </motion.div>
              )}
            </AnimatePresence>

            {/* <SignIn />
            <SignUp /> */}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
