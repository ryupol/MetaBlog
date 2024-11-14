import { useParams } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { PencilIcon as PencilIconSolid } from "@heroicons/react/24/solid";

function EditBlogButton() {
  const { id } = useParams();

  return (
    <a
      className="group hover:cursor-pointer"
      href={`/blog/update/${id}`}
      data-testid="edit-button"
    >
      <PencilIcon className="h-4 w-4 text-theme-subtext3 group-hover:hidden" />
      <PencilIconSolid className="hidden h-4 w-4 text-primary group-hover:block" />
    </a>
  );
}

export default EditBlogButton;
