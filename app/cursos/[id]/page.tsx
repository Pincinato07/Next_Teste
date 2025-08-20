import { notFound } from "next/navigation";

type CursosPageProps = {
	params: { id: string };
};

export default function Cursos({ params }: CursosPageProps) {
	const cursos = ["Java", "Css", "Python", "React"];

	const selectedCourse = cursos.find(
		(item) => item.toLowerCase() === params.id.toLowerCase()
	);

	if (!selectedCourse) {
		notFound();
	}

	return <div>Curso de {selectedCourse}</div>;
}