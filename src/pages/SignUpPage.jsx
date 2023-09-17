import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ColorRing } from "react-loader-spinner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleSignInButton from "@/components/google-button";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { registerSchema } from "../validators/auth";

const SignUpPage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    dispatch(register(values));
  }

  return (
    <div className="min-h-screen">
      <Card className="w-full max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader className="text-center">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Let's get started with your 30 days free trial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email..."
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button size="sm" className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          <div className="my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <GoogleSignInButton />
        </CardContent>
        <CardFooter className="mt-8 flex items-end">
          <CardDescription className="w-full flex items-center justify-center gap-x-2">
            <span>Already have an account? </span>
            <Link className="font-semibold" href={"/signin"}>
              Sign In
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignUpPage;
