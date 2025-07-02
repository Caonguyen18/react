const DetailsCourse = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <p key={part.id}>
          s{part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

export default DetailsCourse;
