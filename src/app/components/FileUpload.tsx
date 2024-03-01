"use client";
import { Inbox, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";

const s3RootDir = process.env.NEXT_PUBLIC_S3_ROOT_DIR;

const FileUpload = ({ userId }: { userId: string }) => {
  const [isLoading, setLoading] = useState(false);

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
        setLoading(true);
        const fileName = file.name;
        const chatId = uuidv4();
        const fileKey = `${s3RootDir}/${userId}/${chatId}/${fileName}`;
        const formData = new FormData();
        formData.append("file_key", fileKey);
        formData.append("chat_id", chatId);
        formData.append("file", file, {
          knownLength: file.size,
          contentType: "application/pdf",
        });

        await axios.post("api/create-chat", formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Uploaded file successfully");
      } catch (error) {
        toast.error("Error creating chat");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <>
      <div className="p-2 bg-white rounded-xl">
        <div
          {...getRootProps({
            className:
              " border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex flex-col",
          })}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <>
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <p> Spilling Tea to GPT...</p>
            </>
          ) : (
            <>
              <Inbox className="w-10 h-10 text-blue-500" />
              <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
