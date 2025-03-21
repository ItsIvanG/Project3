import Image from "next/image";
import Link from "next/link";

const CourseCard = ({
  imageSrc = "",
  title = "",
  description = "",
  id = "",
}) => {
  return (
    <div className="">
      <Link
        href={{ pathname: "/instructor/panel", query: { id } }}
        className="block"
      >
        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition">
          {/* Image container to maintain aspect ratio */}
          <div className="relative overflow-hidden rounded-md">
            <Image
              src={imageSrc}
              alt={title}
              width={150}
              height={100}
              className="object-cover rounded-md" // Maintain aspect ratio
              // fill={true}
            />
          </div>

          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <h3 className="text-gray-600">{description}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
