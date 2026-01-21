import { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerEditSchema } from "@/schemas/bannerEdit.schema";
import { z } from "zod";
import { useDropzone } from "react-dropzone";

type Banner = {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
};

type BannerEditForm = z.infer<typeof bannerEditSchema>;

export function BannerList() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function loadBanners() {
    const { data } = await api.get("/banners?isActive=true");
    setBanners(data);
  }

  useEffect(() => {
    loadBanners();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Deseja remover este banner?")) return;

    await api.delete(`/banners/${id}`);
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<BannerEditForm>({
    resolver: zodResolver(bannerEditSchema)
  });

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;

    setValue("image", file);
    setPreview(URL.createObjectURL(file));
  }, [setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false
  });

  async function onSubmit(data: BannerEditForm) {
    if (!editingBanner) return;

    const formData = new FormData();
    if (data.linkUrl) formData.append("linkUrl", data.linkUrl);
    if (data.image) formData.append("image", data.image);

    await api.put(`/banners/${editingBanner.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setEditingBanner(null);
    setPreview(null);
    reset();
    loadBanners();
  }

  return (
    <div className="m-10 space-y-6">
      <h2 className="text-2xl font-semibold">Banners</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex-1 w-[300px] rounded-lg border bg-white p-4 shadow"
          >
            <p className="font-bold text-xl mb-10">{banner.title}</p>
            <img
              src={banner.imageUrl}
              alt="Banner"
              className="h-32 w-full rounded object-cover"
            />

            <p className="mt-2 truncate text-sm text-gray-600">
              {banner.linkUrl || "Sem link"}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  setEditingBanner(banner);
                  setValue("linkUrl", banner.linkUrl || "");
                  setPreview(null);
                }}
                className="flex-1 rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(banner.id)}
                className="flex-1 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4 rounded-lg bg-white p-6"
          >
            <h3 className="text-lg font-semibold">Editar Banner</h3>

            <div
              {...getRootProps()}
              className="flex h-40 cursor-pointer items-center justify-center rounded border-2 border-dashed"
            >
              <input {...getInputProps()} />
              {preview ? (
                <img
                  src={preview}
                  className="max-h-full object-contain"
                />
              ) : (
                <p className="text-sm text-gray-500">
                  Clique para trocar a imagem
                </p>
              )}
            </div>

            <input
              {...register("linkUrl")}
              placeholder="Link do banner"
              className="w-full rounded border px-3 py-2"
            />
            {errors.linkUrl && (
              <p className="text-sm text-red-500">
                {errors.linkUrl.message}
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingBanner(null);
                  reset();
                }}
                className="flex-1 rounded border py-2"
              >
                Cancelar
              </button>

              <button
                disabled={isSubmitting}
                className="flex-1 rounded bg-indigo-600 py-2 text-white"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
