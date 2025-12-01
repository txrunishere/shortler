import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { urlSchema } from "../_schema/url.schema";
import { Error } from "@/components/common";
import { useFetch } from "@/hooks/use-fetch";
import { createUrl } from "@/api/url.api";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useUser } from "@/app/providers/user-provider";
import { BeatLoader } from "react-spinners";

export const CreateUrlModel = ({ fetchUrls }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      custom_url: "",
      title: "",
      url: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [search, setSearch] = useSearchParams();
  const longUrl = search.get("createNew");
  const { user } = useUser();

  useEffect(() => {
    if (longUrl) {
      setValue("url", longUrl);
      setIsModelOpen(true);
    } else {
      setValue("url", "");
    }
  }, [search, longUrl]);

  const { fn: fnCreateUrl, error: createUrlError } = useFetch(createUrl);

  const onSubmit = async (data) => {
    await fnCreateUrl({
      title: data.title,
      longUrl: data.url,
      customUrl: data.custom_url,
      user_id: user?.id,
    });
    reset();
    setIsModelOpen(false);
    await fetchUrls({ user_id: user?.id });
  };

  return (
    <Dialog
      open={isModelOpen}
      onOpenChange={(v) => {
        if (!v) {
          setSearch({});
          setIsModelOpen(false);
        }
      }}
    >
      <DialogTrigger
        onClick={() => setIsModelOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-lato rounded-lg px-2 py-1"
      >
        Create Link
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle>Create New</DialogTitle>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-3">
              <Label htmlFor="title">Title</Label>
              <Input
                type={"text"}
                id="title"
                {...register("title")}
                placeholder="Enter a title for URL"
              />
              {errors.title && <Error message={errors.title.message} />}
            </div>

            {/* URL */}
            <div className="space-y-3">
              <Label htmlFor="url">URL</Label>
              <Input
                type={"url"}
                id="url"
                {...register("url")}
                placeholder="https://example.com"
              />
              {errors.url && <Error message={errors.url.message} />}
            </div>

            {/* Custom URL */}
            <div className="space-y-3">
              <Label htmlFor="custom_url">Custom URL (optional)</Label>
              <Input
                type={"text"}
                id="custom_url"
                {...register("custom_url")}
                placeholder="custom-slug"
              />
              {errors.custom_url && (
                <p className="text-sm text-red-500">
                  {errors.custom_url.message}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        {createUrlError && <Error message={createUrlError.message} />}

        <DialogFooter className="sm:justify-start">
          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? <BeatLoader /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
