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
import { useCallback } from "react";
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
import { ImageIcon, Loader2 } from "lucide-react";
import { DottedSeparator } from "../shared/dotted-separator";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";

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

  const { mutate: createWorkspace, isPending, error } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<TWorkspaceForm> = useCallback(
    (data: TWorkspaceForm) => {
      const finalValues = {
        ...data,
        image: data.image instanceof File ? data.image : "",
      };
      createWorkspace(
        { form: finalValues },
        {
          onSuccess: () => {
            form.reset();
            //redirect to workspace
          },
        }
      );
    },
    [createWorkspace, form]
  );

  const { errors } = form.formState;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="relative size-[72px] overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="workspace--image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[37px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max 1mb
                        </p>
                      </div>
                    </div>
                    <Input
                      type="file"
                      accept="image/jpeg, image/png, image/svg+xml"
                      ref={inputRef}
                      className="hidden"
                      disabled={isPending}
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      className="w-fit mt-2"
                      size={"sm"}
                      variant="outline"
                      onClick={() => inputRef.current?.click()}
                      disabled={isPending}
                    >
                      Upload
                    </Button>
                  </div>
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
