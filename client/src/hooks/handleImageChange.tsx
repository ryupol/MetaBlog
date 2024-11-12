type HandleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>,
) => void;

const handleImageChange: HandleFileChange = (event, setState) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

export default handleImageChange;
