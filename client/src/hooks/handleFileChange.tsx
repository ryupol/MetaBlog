type HandleFileChangeProps = {
  onFileLoad: (result: string | ArrayBuffer | null) => void;
};

const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  { onFileLoad }: HandleFileChangeProps,
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      onFileLoad(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

export default handleFileChange;
