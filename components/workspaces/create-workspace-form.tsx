"use client";

import { TWorkspaceForm, workspaceSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { Input } from "../ui/input";
import { useCreateWorkspace } from "@/hooks/workspaces/use-create-workspace";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IsError } from "../shared/isError";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { DottedSeparator } from "../shared/dotted-separator";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const form = useForm<TWorkspaceForm>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  const {
    mutate: createWorkspace,
    isPending,
    error,
    isSuccess,
  } = useCreateWorkspace();

  const onSubmit: SubmitHandler<TWorkspaceForm> = useCallback(
    (data: TWorkspaceForm) => {
      createWorkspace({ json: data });
    },
    [createWorkspace]
  );

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  const { errors } = form.formState;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text--xl font-bold">
          Create a new Workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <IsError error={error} />

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="name"
                        disabled={isPending}
                        className={
                          errors.name
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DottedSeparator className="py-7" />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size={"lg"}
                  variant={"default"}
                  disabled={isPending}
                >
                  {isPending
                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> +
                      "Creating..."
                    : "Create Workspace"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
