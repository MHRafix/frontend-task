export default function useImageUploader() {
  // avatar uploaded to cloudinary cloud service
  const imgUpload: (thumbnail: any) => Promise<string | undefined> = async (
    thumbnail: any
  ): Promise<string | undefined> => {
    if (thumbnail) {
      const data = new FormData();

      data.append("file", thumbnail);
      data.append("upload_preset", "gridproducts");
      data.append("cloud_name", "CoderXone");
      const uploadReq = await fetch(
        "https://api.cloudinary.com/v1_1/CoderXone/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imgUploaded = await uploadReq.json();
      return imgUploaded?.url;
    } else {
      return;
    }
  };

  return { imgUpload };
}
