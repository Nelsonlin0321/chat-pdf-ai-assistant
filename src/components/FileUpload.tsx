"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const FileUpload = () => {
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("api/create-chat", {
        file_name,
        file_key,
      });
      console.log(response.data);
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large");
        return;
      }
      try {
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.success("Failed to upload file");
          return;
        }

        mutate(data, {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (err) => {
            console.log(err);
          },
        });
      } catch (error) {
        toast.error("Error creating chat");
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            " border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
      <Toaster />
    </div>
  );
};

export default FileUpload;
