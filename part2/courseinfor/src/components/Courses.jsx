import DetailsCourse from "./DetailsCourse.jsx";

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          <DetailsCourse key={course.id} course={course}></DetailsCourse>
          <p style={style}>
            total of{" "}
            {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
            exercises
          </p>
        </div>
      ))}
    </div>
  );
};
const style = {
  fontWeight: "bold",
};

export default Courses;
