import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { bannerUploadSchema } from "@/schemas/bannerUpload.schema";
import { z } from "zod";

type BannerUploadForm = z.infer<typeof bannerUploadSchema>;

export function BannerUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BannerUploadForm>({
    resolver: zodResolver(bannerUploadSchema)
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setValue("image", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false
  });

  async function onSubmit(data: BannerUploadForm) {
    const formData = new FormData();
    formData.append("image", data.image);
    if (data.title) formData.append("title", data.title);
    if (data.linkUrl) formData.append("linkUrl", data.linkUrl);

    await api.post("/banners", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    reset();
    setPreview(null);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-10 w-full space-y-4 rounded-xl max-h-[500px] border bg-white p-6 shadow"
    >
      <h2 className="text-xl font-semibold">Upload de Banner</h2>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`flex h-44 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition
          ${isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}
        `}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <p className="text-sm text-gray-500">
            Arraste a imagem ou clique para selecionar
          </p>
        )}
      </div>

      {errors.image && (
        <p className="text-sm text-red-500">{errors.image.message}</p>
      )}

      {/* Title */}
      <input
        type="text"
        placeholder="Título (opcional)"
        {...register("title")}
        className="w-full rounded-md border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      {/* Link */}
      <input
        type="text"
        placeholder="Link do banner (opcional)"
        {...register("linkUrl")}
        className="w-full rounded-md border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />
      {errors.linkUrl && (
        <p className="text-sm text-red-500">{errors.linkUrl.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar Banner"}
      </button>
    </form>
  );
}
