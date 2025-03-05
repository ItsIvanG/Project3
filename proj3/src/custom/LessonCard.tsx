import Image from "next/image";
import Link from "next/link";

const LessonCard = ({
  lessonNo = "",
  lessonTitle = "",
  id = "",
  lessonId = "",
}) => {
  return (
    <div className="my-4">
      <Link
        href={{ pathname: "/instructor/settings", query: { id, lessonId } }}
        className="block"
      >
        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition">
          {/* <div>
            <Image src={imageSrc} width={150} height={50} alt={lessonTitle} />
          </div> */}
          <div>
            <h2 className="text-2xl font-semibold">
              Lesson {lessonNo}: {lessonTitle}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;
